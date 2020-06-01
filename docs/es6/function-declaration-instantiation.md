---
id: function-declaration-instantiation
title: '函数声明实例化'
---

调用函数时，在执行函数 body 之前，会执行函数声明实例化过程。在此过程中，首先建立建立新的运行上下文(excution context)，建立一个新的环境记录(environment record)并且在此记录中实例化形式参数绑定，以及函数体内所有的声明。如果形式参数中不存在默认参数函数(default value initializers)，那么函数体内的声明会和形式参数存在于同一个环境记录中；反之，函数体内的声明会存在于一个新建的环境记录中。

所以下列代码的输出不一致。

```javascript
(function (x, f = () => x) {
  var x = 2; // var x 和形式参数中的x存在于不同的环境记录中，是隔离的。改变var x，不会影响形参的x。
  console.log(f());
})(1); // 1

(function (x, f = () => x) {
  x = 2; // 没有用var声明，要找到x, 要到形式参数的环境记录里找，然后给它复制，改变了形参的x。
  console.log(f());
})(); // 2
```

```javascript
function functionDeclarationInstantiation(func, argumentsList) {
  let calleeContext = {
    lexicalEnvironment: {
      environmentRecord: {
        // 如果没有默认函数参数，prarameters和 variables都在这里绑定，否则，只在这里绑定parameters
        // parameters, variables
        // const, let 声明绑定
      }
    },
    // 只有存在默认函数参数，才会额外创建variableEnvironment。
    variableEnvironment: {
      environmentRecord: {
        // 只包含var声明的变量绑定
        // variables
      }
    }
  }; // 'running execution context'
  let env = calleeContext.lexicalEnvironment;
  let envRecord = env.environmentRecord;
  let { code, strict, formals } = func;
  let { parameterNames, simpleParameterList, hasParameterExpressions } = formals;
  let hasDuplicates = doYouHaveDuplicates(parameterNames);
  let { varNames, varDeclarations, lexicalNames } = code;
  let functionNames = [];
  let functionsToInitialize = [];

  for (let d of varDeclarations.reverse()) {
    if (d is not VariableDeclaration or ForBinding) {
      if (d is FunctionDeclaration or GeneratorDeclaration) {
        let fn = d.boundName;
        if (fn not in functionNames) {
          functionNames.unshift(fn);
          functionsToInitialize.unshift(d);
        }
      }
    }
  }

  let argumentsObjectNeeded = true;
  if (func.thisMode == 'lexical') {
    // arrow function never have an arguments objects.
    argumentsObjectNeeded = false;
  } else if ('arguments' in parameterNames) {
    argumentsObjectNeeded = false;
  } else if (hasParameterExpressions == false) {
    if ('arguments' in functionNames || 'arguments' in lexicalNames) {
      argumentsObjectNeeded = false;
    }
  }

  for (let parameterName of parameterNames) {
    let alreadyDeclared = envRecord.hasBinding(paramName);
    if (alreadyDeclared == false) {
      let status = envRecord.createMutableBinding(parameterName);
      if (hasDuplicates == true) {
        status = envRecord.initializeBinding(parameterName);
      }
    }
  }

  if (argumentsObjectNeeded == true) {
    let ao;
    if (strict == true || simpleParameterList == false) {
      ao = createUnmappedArgumentsObject(argumentsList);
    } else {
      ao = createMappedArgumentsObject(func, formals, argumentsList, env);
    }

    let status;
    if (strict == true) {
      status = envRecord.createImmutableBinding('arguments');
    } else {
      status = envRecord.createMutableBinding('arguments');
    }
    assert status is not an abrupt completion

    envRecord.initializeBinding('arguments', ao);
    parameterNames.push('arguments');
  }

  let iteratorRecord = createListIterator(argumentslist)
  let formalStatus;
  if (hasDuplicates == true) {
    formalStatus = IteratorBindingInitialization(formals, iteratorRecord, undefined);
  } else {
    formalStatus = IteratorBindingInitialization(formals, iteratorRecord, env);
  }
  returnIfAbrupt(formalStatus);

  if (hasParameterExpressions == false) {
    let instantiatedVarNames = [...parameterNames];
    for (let n of varNames) {
      if (n not in instantiatedVarNames) {
        instantiatedVarNames.push(n);
        let status = envRecord.createMutableBinding(n);
        assert status is never an abrupt completion;
        envRecord.initializeBinding(n, undefined);
      }
    }
    let varEnv = env;
    let varEnvRecord = envRecord;
  } else {
    let varEnv = newDeclarativeEnvironment(env);
    let varEnvRecord = varEnv.environmentRecord;
    calleeContext.variableEnvironment = varEnv;
    let instantiatedVarNames = [];
    for (let n of varNames) {
      if (n not in instantiatedVarNames) {
        instantiatedVarNames.push(n);
        let status = varEnvRecord.createMutableBinding(n);
        assert status is never an abrupt completion;
        let initialValue;
        if (n not in parameterNames || n is in functionNames) {
          initialValue = undefined;
        } else {
          initialValue = envRecord.getBindingValue(n, false);
        }
        varEnvRecord.initializeBinding(n, initialValue);
      }
    }
  }

  let lexicalEnv;
  if (strict == false) {
    lexicalEnv = newDeclarativeEnvironment(varEnv);
  } else {
    lexicalEnv = varEnv;
  }

  let lexicalEnvRecord = lexicalEnv.environmentRecord;
  calleeContext.lexicalEnvironment = lexicalEnv;
  let lexicalDeclarations = code.lexicallyScopedDeclarations;
  for (let d of lexicalDeclarations) {
    for (let dn of d.boundNames) {
      let status;
      if (d.isConstantDeclaratioin) {
        status = lexicalEnvRecord.createImmutableBinding(dn, true);
      } else {
        status = lexicalEnvRecord.createMutableBinding(dn, false);
      }
    }
  }

  for (let f of functionsToInitialize) {
    let fn = f.boundName;
    let fo = InstantiateFunctionObject(f, lexicalEnv);
    let status = varEnvRecord.setMutableBinding(fn, fo, false);
    assert status is never an abrupt completion;
  }

}
```

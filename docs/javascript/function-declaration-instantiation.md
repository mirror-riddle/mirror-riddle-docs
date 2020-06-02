---
id: function-declaration-instantiation
title: '函数声明实例化'
---

以下两个函数输出结果不同

```javascript
(function (x, f = () => x) {
  var x = 2;
  console.log(f());
})(1); // 1

(function (x, f = () => x) {
  x = 2;
  console.log(f());
})(1); // 2
```

### 原理

调用函数时，需要先评估(evaluate)函数，在它的作用域内绑定形式参数和函数体内的声明，此过程称为函数声明实例化。

- 调用函数时，当前运行的执行上下文叫做 calleeContext。calleeContext 中存在 env(lexical environment), env 中存在 envRec(environment record)，envRec 对象用于实例化形式参数绑定和函数体内的声明。

- 如果形式参数中不存在默认值初始化函数(default value initializers)，那么函数体内的声明会和形式参数都绑定在上述 envRec 中。

- 反之，会新建一个 varEnv(variable environment), 在对应的 varEnvRec 中实例化函数体内的 var 声明和函数声明。如果 var 声明的变量和形参同名，那么该变量的初始值和形参值相同。**这个机制可以保证形参表达式中闭包无法访问函数体内声明的变量。**

因此，由于示例中的两个函数形式参数都存在默认值初始化函数，于是第一个函数内用 var 声明的变量 x 和它的形式参数 x 处于隔离状态，`f = () => x`不能访问函数内的变量 x，调用它总是返回形参 x。第二个函数内的 x 就是形参 x，改变它自然会改变`f = () => x`的输出。

### ECMAScript 标准中函数声明实例化过程

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

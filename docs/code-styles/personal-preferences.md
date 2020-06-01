# Personal code preference

[personal preference](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/#personal-preferences)

## Explicit over implicit

> I don’t like having code with secrets. What something does, what something should be called, etc.,should always be made explicit whenever possible.

代码要清楚明晰，变量、函数、类命名要能准确说明其作用。

## Names should be consistent throughout all files

> If something is an Apple in one file, I shouldn’t call it Orange in another file. An Apple should always be an Apple.

在不同的文件里，相同的对象应该有固定的名字。

## Throw errors early and often

> If it’s possible for something to be missing then it’s best to check as early as possible and, in the best case, throw an error that alerts me to the problem. I don’t want to wait until the code has finished executing to discover that it didn’t work correctly and then hunt for the problem.

如果代码可能出错，尽早抛出错误，以免后续追踪 bug 困难重重。

## Fewer decisions mean faster development

> A lot of the preferences I have are for eliminating decisions during coding. Every decision you make slows you down, which is why things like coding conventions lead to faster development. I want to decide things up front and then just go.

在做决定时犹豫不决，会浪费时间，影响编程效率。所以最好是遵从约定俗成的代码惯例，少折腾细枝末节。

## Side trips slow down development

> Whenever you have to stop and look something up in the middle of coding, I call that a side trip. Side trips are sometimes necessary but there are a lot of unnecessary side trips that can slow things down. I try to write code that eliminates the need for side trips.

写代码途中停下来找资料会降低编程效率，所以应该尽量用自己熟悉的方案，减少中途的停顿，边写边想不可取。

## Cognitive overhead slows down development

> Put simply: the more detail you need to remember to be productive when writing code, the slower your development will be.

写代码时脑子里想的东西越复杂，编程效率越低。因此，应该化大为小，一次解决一个小问题。

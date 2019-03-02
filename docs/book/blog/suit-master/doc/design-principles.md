# SUIT CSS 设计准则

SUIT CSS是一种专注于改善CSS组件开发者体验的方法。

基于组件的系统允许实现和组合松散耦合的独立单元到明确定义的复合对象中。组件是封装的，但能够通过接口/事件进行互操作。

1. [模块化](#modularity)
2. [聚合](#cohesion)
3. [可组合和可配置](#composition)
4. [松耦合](#coupling)
5. [软封装](#encapsulation)
6. [文档](#documentation)

<a name="modularity"></a>
## 模块化

每个组件应该只有一个焦点，并包含实现UI特定部分所必须具备的。 组件可能包含HTML，
CSS，JavaScript，而不对其外部元素进行渲染。

<a name="cohesion"></a>
## 聚合

组件定义的功能和表现形式必须是语义上相关的。 组件彼此之间没有直接影响。

<a name="composition"></a>
## 可组合和可配置

可组合性与组件的相互关系有关。
可组合系统具有可以各种组装的组件，根据需要组合。

配置是通过组件提供或使用的接口完成。

<a name="coupling"></a>
## 松耦合

组件不应直接修改其依赖组件的表示形式或行为习惯。依赖于组件间的接口和事件通信来实现松耦合。


试图在组件间复用大量的代码会导致耦合性增加。代码隔离比避免写重复代码重要得多

<a name="encapsulation"></a>
## 软封装

组件的实现不应暴露给其他组件。

例如：A组件的样式代码不应该对其他组件造成影响; A组件的HTML不应该直接包含
另一个组件的HTM。

复杂性是大型自适应应用程序的重大问题。组件间的相互耦合程序决定了你了解你系统的难易成都

<a name="documentation"></a>
## 文档

编写小型，独立的组件，这些组件都有详细记录，以描述如应该使用组件，以及为什么需要特定的CSS属性
实施。 不要以为CSS只是为自己服务的。

## 相关阅读

* [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)
* [Cohesion](http://en.wikipedia.org/wiki/Cohesion_(computer_science))
* [Component-based software engineering](http://en.wikipedia.org/wiki/Component-based_software_engineering)
* [Encapsulation](http://en.wikipedia.org/wiki/Encapsulation_(object-oriented_programming))
* [Functional programming](http://en.wikipedia.org/wiki/Functional_programming)
* [Single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle)
* [SOLID CSS](http://blog.millermedeiros.com/solid-css/)

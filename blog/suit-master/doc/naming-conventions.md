# SUIT CSS 命名规范

SUIT CSS依赖于结构化类名和有意义的连字符（即，不仅仅使用连字符来分隔单词)。这有助于解决当前将CSS应用于DOM的限制（即缺少样式封装），以及更好地传达类之间的关系。

主要设计分隔是在[实例](utilities.md)和[组件](components.md)之间。

**目录**

* [u-工具名](#u-utilityName)
* [组件名](naming-conventions.md#ComponentName)
* [组件名--修饰名](naming-conventions.md#ComponentName--modifierName)
* [组件名--子节点名](naming-conventions.md#ComponentName-descendentName)
* [组件名--状态名](naming-conventions.md#is-stateOfComponent)
* [变量名](naming-conventions.md#variables)

<a name="u-utilityName"></a>
## [工具](utilities.md)

低级的结构和位置特征。 工具类可以直接应用于组件中的任何元素。
类似于：`u-[sm-|md-|lg-]<utilityName>`

(原文：Low-level structural and positional traits. Utilities can be applied directly
to any element within a component.)

Syntax: `u-[sm-|md-|lg-]<utilityName>`

### u-工具名称  (原：u-utilityName)

工具类命名规则必须使用驼峰命名。 以下是如何在组件中创建简单结构的示例。

原文：Utilities must use a camel case name. What follows is an example of how various
utilities can be used to create a simple structure within a component.

```html
<div class="u-cf">
  <a class="u-floatLeft" href="{{url}}">
    <img class="u-block" src="{{src}}" alt="">
  </a>
  <p class="u-sizeFill u-textBreak">
    …
  </p>
</div>
```

### 响应式工具类 (原：Responsive utilities)

某些工具使用响应变体方式：对于小型设备、中型设备和大型设备的判断界限一般用`u-sm-<name>`,
`u-md-<name>` 和 `u-lg-<name>`

原文：Certain utilities have responsive variants using the patterns: `u-sm-<name>`,
`u-md-<name>`, and `u-lg-<name>` for small, medium, and large Media Query
breakpoints.


## [组件](components.md)

CSS使用组件--特类样式规范，如：`[<namespace>-]<ComponentName>[-descendentName][--modifierName]`

这样在读写HTML和CSS时有一下几点好处：
* 它有助于区分组件根节点类名，子节点元素类名和可修改的类名
* 它有助于保持选择器的特异性低，即更容易进行后期维护修改。
* 它有助于将表示语义与文档语义分离.

```css
.twt-Button { /* … */ }
.twt-Tabs { /* … */ }
```

（原文：The CSS responsible for component-specific styling.

Syntax: `[<namespace>-]<ComponentName>[-descendentName][--modifierName]`

This has several benefits when reading and writing HTML and CSS:

* It helps to distinguish between the classes for the root of the component,
  descendent elements, and modifications.
* It keeps the specificity of selectors low.
* It helps to decouple presentation semantics from document semantics.

### 命名空间（可选） namespace (optional)
如有必要，组件可以使用命名空间作为前缀。 例如，你可以通过为所有组件添加命名空间前缀来避免库与您的自定义组件之间发生冲突。

原文：If necessary, components can be prefixed with a namespace. For example, you may
wish to avoid the potential for collisions between libraries and your custom
components by prefixing all your components with a namespace.

```css
.twt-Button { /* … */ }
.twt-Tabs { /* … */ }
```
这清楚地表明，在阅读HTML时，哪些组件是您项目的一部分。

原文：This makes it clear, when reading the HTML, which components are part of your
library.

### 组件名 （ComponentName）

组件的名称在HTML/CSS中必须以大驼峰编写。

原文：The component's name must be written in pascal case. Nothing else in the
HTML/CSS uses pascal case.

```css
.MyComponent { /* … */ }
```

```html
<article class="MyComponent">
  …
</article>
```

<a name="ComponentName--modifierName"></a>
### 组件名--修饰名 （ComponentName--modifierName）

组件修饰符是以某种形式修饰的类（例如，对于组件的某个配置）。修饰符名称必须以驼峰形式写入，并且通过两个连字符与组件名称分开。 该类应包含在基本组件类的HTML中。

原文：A component modifier is a class that modifies the presentation of the base
component in some form (e.g., for a certain configuration of the component).
Modifier names must be written in camel case and be separated from the
component name by two hyphens. The class should be included in the HTML _in
addition_ to the base component class.

```css
/* Core button */
.Button { /* … */ }
/* Default button style */
.Button--default { /* … */ }
```

```html
<button class="Button Button--default" type="button">…</button>
```

<a name="ComponentName-descendentName"></a>
### 组件名-子孙名 （ComponentName-descendentName）

组件后代是附加到组件的后代节点的类。 它是用来表示后代节点和某个特点节点关系。 后代名称必须以驼峰形式书写。

原文：A component descendent is a class that is attached to a descendent node of a
component. It's responsible for applying presentation directly to the
descendent on behalf of a particular component. Descendent names must be
written in camel case.

```html
<article class="Tweet">
  <header class="Tweet-header">
    <img class="Tweet-avatar" src="{{src}}" alt="{{alt}}">
    …
  </header>
  <div class="Tweet-bodyText">
    …
  </div>
</article>
```

<a name="is-stateOfComponent"></a>
### 组件名.is-组件状态（ComponentName.is-stateOfComponent）

使用`is-stateName`来反映组件状态的变化。 状态名必须是驼峰格式。永远不要直接使用状态类；状态类应该总是和一个类相邻出现。

这意味着可以在多个上下文中使用相同的状态名称，但是每个组件都必须为状态定义自己的样式（因为它们的范围是组件）。


原文（Use `is-stateName` to reflect changes to a component's state. The state name
must be camel case. **Never style these classes directly; they should always be
used as an adjoining class.**

This means that the same state names can be used in multiple contexts, but
every component must define its own styles for the state (as they are scoped to
the component.)

```css
.Tweet { /* … */ }
.Tweet.is-expanded { /* … */ }
```

```html
<article class="Tweet is-expanded">
  …
</article>
```

## 变量 （Variables）

Syntax: `--ComponentName[-descendant|--modifier][-onState]-(cssProperty|variableName)`

### 组件变量 （Component Variables）

自定义属性是全局的。 组件不应暴露内部结构。 组件中使用的变量在其命名空间后应具有扁平结构避免不必要的级联。

原文：Custom properties are global. Components should not expose the internal structure. Variables used in components should have a flat structure after their namespace.

```css
:root {
  --ComponentName-backgroundColor
  --ComponentName-descendant-backgroundColor
  --ComponentName--modifier-backgroundColor
  --ComponentName-onHover-backgroundColor
  --ComponentName-descendant-onHover-backgroundColor
}
```

### 主题变量 （Theme Variables）
非组件变量必须以驼峰形式编写。 对于共享使用，它们应该写在[a `theme.css`](https://github.com/suitcss/theme/blob/master/lib/theme.css)文件中

原文：Non-component variables must be written in camel case. For shared use, they should be authored in [a `theme.css`](https://github.com/suitcss/theme/blob/master/lib/theme.css) file.

```css
:root {
  --fontSize: 16px;
  --fontFamily: sans-serif;
  --lineHeight: 1.4;

  --spaceSmall: 10px;
  --spaceMedium: 15px;
  --spaceLarge: 20px;
}
```

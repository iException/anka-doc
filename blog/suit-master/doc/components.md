# SUIT CSS 组件 （SUIT CSS components）

SUIT CSS专为样式化可重用，可组合的组件而设计。 在将组件视为应用程序构建模块的系统中，这些好处最为明显。

将组件视为包含特定语义，样式和行为的自定义元素。 例如，这个`Photo`组件和配置：

原文：（SUIT CSS is designed for styling reusable, composable components. The benefits
are most apparent in a system that considers components to be the building
blocks of your application.

Think of components as custom elements that enclose specific semantics,
styling, and behaviour. For example, this `Photo` component and configuration:）

```html
<Photo src="photo.jpg" size="large" crop="circle">
  A photo of <a href="/barackobama">Barack Obama</a> in the Whitehouse.
</Photo>
```
上面代码可以产生下面的HTML代码：

原文：could yield the following HTML:

```html
<article class="Photo Photo--sizeLarge">
  <a class="Photo-crop Photo-crop--circle" href="photo.jpg">
    <span class="Photo-icon">
      <span class="Icon Icon--zoom"></span>
    </span>
    <img class="Photo-img u-block" src="photo.jpg" alt="">
  </a>
  <div class="Photo-caption u-textBreak">
    A photo of <a href="/barackobama">Barack Obama</a> in the Whitehouse.
  </div>
</article>
```

SUIT CSS有助于隔离`Photo`组件实现中使用的CSS。 这样做，通过减少组件之间的样式纠缠，使样式更简单，并防止样式泄漏到组件外部。

(阅读 SUIT CSS的 [命名规则](naming-conventions.md).)

原文：SUIT CSS helps to partially isolate the CSS used in the `Photo` component's
implementation. In doing so, it makes styling simpler by reducing the amount of
styling entanglement between components, and prevents styles from leaking
outside the component.

(Read about SUIT CSS's [naming conventions](naming-conventions.md).)

## 组件领域（Component scope）

组件的核心类名（例如，`ComponentName`）保留只能由该组件使用的命名空间。 在您的构建过程中可以使用工具强制执行（例如[suitcss-preprocessor](https://github.com/suitcss/preprocessor)或
[postcss-bem-linter](https://github.com/postcss/postcss-bem-linter)）。

**组件文件中的所有选择器必须以组件的命名空间开头**. 例如，名为“MyComponent”的组件可以具有以下CSS，其中每个选择器都以字符串“MyComponent”开头。

原文：The component's core class name (e.g., `ComponentName`) reserves a namespace
that can only be used by that component. This can be enforced using with tools
(e.g. [suitcss-preprocessor](https://github.com/suitcss/preprocessor) or
[postcss-bem-linter](https://github.com/postcss/postcss-bem-linter))
in your build process.

**All selectors in a component file must start with the component's
namespace**. For example, a component called `MyComponent` could have the
following CSS, where every selector starts with the string `MyComponent`.

```css
/** @define MyComponent */

.MyComponent { /* ... */ }
.MyComponent--large { /* ... */ }
.MyComponent-title { /* ... */ }
.MyComponent-image { /* ... */ }
.MyComponent-text { /* ... */ }
.MyComponent-time { /* ... */ }
```

每个类都提供一个钩子来命名定义在HTML中的特定元素。

原文：Each class provides a hook to style specific elements within the HTML definition.

```html
<article class="MyComponent u-cf">
  <h1 class="MyComponent-title">{{title}}</h1>
  <img class="MyComponent-image" src="{{src}}" alt="">
  <p class="MyComponent-text">
    <span class="MyComponent-time">{{time}}</span>
    {{text}}
  </p>
</div>
```

与类一样，变量也必须通过包含组件名称的变量名来限定其组件的范围：

Like classes, variables must also be scoped to their component by including the
component name in the variable name:

```css
/** @define MyComponent */

:root {
  --MyComponent-border-width: 5px;
}

.MyComponent {
  border-width: var(--MyComponent-border-width);
  /* ... */
}
```

如果需要，应该可以使某个主题覆盖默认主题。

避免组件直接的耦合和嵌套，即使这意味着代码不像您认为的那样干燥。 隔离可防止可避免的复杂性，并使代码健壮可复用。

This allows a theme to override the defaults if desired.

Avoid coupling or entangling components, even if that means the code is not as
DRY as you think it should be. Isolation prevents avoidable complexity and is
an important part of robust reuse.

## 一种模式，一个组件 （One pattern, one component）

**每个组件都应实现UI的单个部分**. 不要试图去做太多.

**每个组件都应该有一个专用的CSS文件**. 理想情况下，你的组件文件在专用目录中被组合在一起.

原文：

**Each component should implement a single part of the UI**. Don't try to do
too much.

**Each component should have a dedicated CSS file**. Ideally your component's
files are grouped together in a dedicated directory.

## 记录实施细节 （Documenting implementation details）

组件必须记录其实现。 组件的CSS注释应该寻求回答以下问题：

* 目的是什么？
* 修饰符和状态是什么？
* 特定的，不透明的属性值的原因是什么。
* 已知的限制是什么？

原文：

Components must document their implementation. The CSS comments for a component
should seek to answer the following questions:

* What is the intended presentation?
* What are the modifiers and states?
* What are the reasons for specific, opaque property values.
* What are the known limitations?

## 自适应父元素的应用环境 （Adapting to ancestral context）

**大多数组件不应设置自己的宽度，边距和位置。** 通过将组件宽度设为100%或者写成内联样式，可以更好地适应父元素的样式变化。

原文：
**Most components should not set their own width, margin, and positioning.** By
authoring a component to be full-width or inline, it can better adapt to the
dimensions of an ancestral context.

## 样式依赖项 （Styling dependencies）

**组件不应该知道其依赖项的实现**。 必须使用它们提供的接口配置依赖项的表现样式。

控制组件的尺寸，边距，位置和可继承的样式可以间接实现。 向其根元素添加一个类，或将其包装在另一个元素中。

原文：
**A component should not know about the implementation of its dependencies**.
The appearance of dependencies must be configured using the interface they provide.

Controlling dimensions, margins, position, and inheritable styles of a
component can be done _indirectly_. Add a class to its root element, or wrap
it in another element.

```css
/* Excerpt */

.Excerpt {
  /* ... */
}

/* Attaches to a nested component */

.Excerpt-button {
  display: inline-block;
  margin-top: 20px;
}

/* Wraps a nested component */

.Excerpt-wrapButton {
  display: inline-block;
  margin-top: 20px;
}
```

```html
<article class="Excerpt u-cf">
  {{! other implementation details }}

  <read-button class="Excerpt-button">Read more</read-button>

  <div class="Excerpt-wrapButton">
    <read-button>Read more</read-button>
  </div>
</article>
```

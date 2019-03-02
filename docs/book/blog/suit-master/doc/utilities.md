# SUIT CSS 工具类 （SUIT CSS utilities）

工具类映射到固定，低级，结构和位置特征。这些类可以在组件的HTML中使用。 因为工具类优先级较高，他们通常会使用`！important`来确保他们的风格永远应用。
(阅读 SUIT CSS 的[命名规则](naming-conventions.md).)

原文：Utility classes map to fixed, low-level, structural and positional traits.
These classes can be used in a component's HTML. Because utilities are so
focused, they will generally use `!important` to ensure their styles are always
applied.

(Read about SUIT CSS's [naming conventions](naming-conventions.md).)

## 为什么使用工具类 （Why to use utilities）

某些CSS属性和模式经常被使用。 例如：浮点，包含浮点数，垂直对齐，文本截断。 依靠工具可以帮助减少重复并提供一致的实现。

原文：Certain CSS properties and patterns are used frequently. For example: floats,
containing floats, vertical alignment, text truncation. Relying on utilities
can help to reduce repetition and provide consistent implementations.

```html
<div class="u-cf">
  <p class="u-textTruncate">{{text}}</p>
  <img class="u-floatLeft" src="{{src}}" alt="">
  <img class="u-floatLeft" src="{{src}}" alt="">
  <img class="u-floatLeft" src="{{src}}" alt="">
</div>
```

有些工具只应用一个声明，为什么不使用内联样式？即使在这里，也优选小工具，因为它们的值可以被预处理（例如，生成RTL样式表）或被调整为视口尺寸。 可以严格定义组件中未包含的样式范围，并且代码更容易阅读。

原文：Some utilities apply only a single declaration, so why not use inline styles?
Even here, small utilities are preferred because their values can be
preprocessed (e.g., generating RTL style sheets) or adjusted to viewport
dimensions. The scope of styles not contained in components can be tightly
defined, and code is a little easier to read.

## 如何使用工具类 (How to use utilities)

工具类可以添加到任何元素; 多个工具类可以一起使用;工具类可以与组件类一起使用。

原文：Utilities can be added to any element; multiple utilities can be used together;
and utilities can be used alongside component classes.

```html
<div class="Tweet u-cf">
  <a class="u-sizeFit" href="{{url}}">
    <img class="u-block" src="{{src}}" alt="">
  </a>
  <p class="Tweet-text u-sizeFill u-textBreak">
    …
  </p>
</div>
```

工具类按类型分组。 具有类似问题的工具类的名称通常以一个公共字符串开头，例如`u-textCenter`，`u-textTruncate`;
`u-linkClean`，`u-linkBlock`。

任何具有简洁名称的类，例如`u-cf`和`u-nbfc`，都是特别抽象的或非常常用的工具类名，否则需要较长的类名来解释类名的意思。 例如，`u-cf`工具类用于“包含浮动”而不会削减任何溢出; `u-nbfc`工具类用于创建“新格式化上下文模块”。

请务必阅读工具类的CSS文件中的文档。 它将包含有关工具类及其实现的信息。

原文：Utilities are grouped by type. The names of utilities with similar concerns
usually start with a common string, e.g., `u-textCenter`, `u-textTruncate`;
`u-linkClean`, `u-linkBlock`.

Any classes with terse names, e.g., `u-cf` and `u-nbfc`, are either
particularly abstract or very commonly used utilities with otherwise
excessively long names. For example, the `u-cf` utility is used to "contain
floats" without clipping any overflow; the `u-nbfc` utility is used to create a
"new block formatting context".

Make sure to read the documentation within the CSS files of utilities. It will
contain information about utility classes and their implementations.

## 修改工具类 （Modifiying utilities）

在使用时不应修改工具类，除非是要修复错误。在整个应用程序中对工具类进行修改应该非常小心。

原文：Utilities should not be edited while in use, unless it is to fix a bug.
Modifications to utilities cascade throughout the application and should be
made with extreme care.

# HTML/CSS代码风格 （HTML/CSS code style）

## 目录 （Table of contents）

1. [一般原则](#general-principles)
2. [缩进](#whitespace)
3. [HTML](#html)
  * [格式](#html-format)
  * [属性 排序](#html-attrs)
  * [命名](#html-naming)
  * [实例](#html-example)
4. [CSS](#css)
  * [注释](#css-comments)
  * [格式](#css-format)
  * [实例](#css-example)


<a name="general-principles"></a>
## 1. 一般原则 （General principles）


>"一个成功项目管理人员需要意识到为自己编写代码是一个坏主意™。 如果成千上万的人正在使用您的代码，那么请保证您编写的代码清晰易读，而不应该写些难以理解的代码来展示你的机智。“ -  Idan Gazit

* 不要试图过早地优化您的代码; 保持可读性和可理解性。
* 您的CSS格式应该与项目中其他CSS的格式相同。

原文：

> "Part of being a good steward to a successful project is realizing that
> writing code for yourself is a Bad Idea™. If thousands of people are using
> your code, then write your code for maximum clarity, not your personal
> preference of how to get clever within the spec." - Idan Gazit

* Don't try to prematurely optimize your code; keep it readable and
  understandable.
* Your CSS should look the same as the rest of the CSS in the project.


<a name="whitespace"></a>
## 2. 缩进（Whitespace）

* 使用缩进来提升可阅读性.
* 使用两个空格来缩进.
* 不要使用多个空行作为分隔符。
* 删除所有行尾和文件结束空白。

原文：
* Use whitespace to improve readability.
* Use 2 spaces for indentation.
* Don't use more than one blank line as a separator.
* Strip all end-of-line and end-of-file whitespace.


<a name="html"></a>
## 3. HTML

<a name="html-format"></a>
### 3.1. 格式

* 始终使用小写标签和属性名称。
* 每行写一个离散的块级元素。
* 为每个嵌套的块级元素使用一个额外级别的缩进。
* 使用无价值的布尔属性（例如`checked`而不是`checked="checked"`）。
* 始终使用双引号引用属性值。
* 省略`link`样式表，`style`和`script`中的`type`属性元素。
* 始终包括结束标签。

保持单行代码长度不超过某个最大值，例如80列

原文：
* Always use lowercase tag and attribute names.
* Write one discrete, block-level element per line.
* Use one additional level of indentation for each nested block-level element.
* Use valueless boolean attributes (e.g. `checked` rather than
  `checked="checked"`).
* Always use double quotes to quote attribute values.
* Omit the `type` attributes from `link` stylesheet, `style` and `script`
  elements.
* Always include closing tags.

(Keep line-length to a sensible maximum, e.g., 80 columns.)

Example:

```html
<div class="Tweet">
  <a href="{{url}}">
    <img src="{{avatar}}" alt="">
  </a>
  <p>{{text}}</p>
  <button disabled>Reply</button>
</div>
```

#### 特殊情况 （Exceptions and slight deviations）

具有多个属性的元素可以具有跨多行排列的属性，以提高可读性。

Elements with multiple attributes can have attributes arranged across multiple
lines in an effort to improve readability and produce more useful diffs.

Example:

```html
<a class="{{class}}"
 data-action="{{action}}"
 data-id="{{id}}"
 href="{{url}}">
  <span>{{text}}</span>
</a>
```


<a name="html-attrs"></a>
### 3.2. HTML 属性排序

HTML属性应按字母顺序列出。

原文：HTML attributes should be listed in alphabetical order.

Example:

```html
<a class="{{class}}" data-name="{{name}}" href="{{url}}" id="{{id}}">{{text}}</a>
```


<a name="html-naming"></a>
### 3.3. 命名 （Naming）

命名很难，但非常重要。 它是开发可维护代码库中最关键的部分。不要害怕重命名组件。

* 为HTML类使用清晰，周到和适当的名称。名称应该在HTML和CSS文件中能提供必要信息。
* 避免使用缩写的类名。不要让事情难以理解。

Naming is hard, but very important. It's a crucial part of the process of
developing a maintainable code base. Don't be afraid to rename components.

* Use clear, thoughtful, and appropriate names for HTML classes. The names
  should be informative both within HTML and CSS files.
* Avoid _systematic_ use of abbreviated class names. Don't make things
  difficult to understand.

Example with "bad" names:

```html
<div class="cb s-scr"></div>
```

```css
.cb {
  background: #000;
}

.cb.s-scr {
  overflow: auto;
}
```

Example with better names:

```html
<div class="ColumnBody is-scrollable"></div>
```

```css
.ColumnBody {
  background: #000;
}

.ColumnBody.is-scrollable {
  overflow: auto;
}
```


<a name="html-example"></a>
### 3.4. HTML 实例 （HTML practical example）

An example of various conventions.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Document</title>
    <link rel="stylesheet" href="main.css">
    <script src="main.js"></script>
  </head>
  <body>
    <article class="Post" id="1234">
      <time class="Post-timestamp">{{date}}</time>
      <a data-analytics-action="{{action}}"
       data-analytics-category="{{category}}"
       data-id="1234"
       href="{{url}}">{{text}}</a>
      <ul>
        <li>
          <a href="{{url}}">{{text}}</a>
          <img src="{{src}}" alt="">
        </li>
        <li>
          <a href="{{url}}">{{text}}</a>
        </li>
      </ul>

      <a class="u-linkComplex" href="{{url}}">
        <span class="u-linkComplex-target">{{text}}</span>
        {{text}}
      </a>

      <input value="text" readonly>
    </article>
  </body>
</html>
```


<a name="css"></a>
## 4. CSS

<a name="css-comments"></a>
### 4.1. 注释 （Comments）

注释良好的代码非常重要。 花时间描述组件，它们如何工作，它们的局限性以及它们的构造方式。 不要让团队中的其他人来猜测你代码的作用。

注释格式应该在单个代码库中简单且一致。

* 将注释放置在内容上方。
* 每行注释长度不超过某个值，例如80列。
* 自由使用注释将CSS代码分解为不连续的部分。
* 使用“句子形式”评论和一致的文本缩进。
* 使用数字行尾注释来引用单个声明的文档。

提示：配置您的IDE，使得在您写注释时更容易满足上述格式。

原文：

Well commented code is extremely important. Take time to describe components,
how they work, their limitations, and the way they are constructed. Don't leave
others in the team guessing as to the purpose of uncommon or non-obvious
code.

Comment style should be simple and consistent within a single code base.

* Place comments on a new line above their subject.
* Keep line-length to a sensible maximum, e.g., 80 columns.
* Make liberal use of comments to break CSS code into discrete sections.
* Use "sentence case" comments and consistent text indentation.
* Use numeric end-of-line comments to reference documentation for individual declarations.

Tip: configure your editor to provide you with shortcuts to output agreed-upon
comment patterns.

Example:

```css
/**
 * Short description using Doxygen-style comment format
 *
 * The first sentence of the long description starts here and continues on this
 * line for a while finally concluding here at the end of this paragraph.
 *
 * The long description is ideal for more detailed explanations and
 * documentation. It can include example HTML, URLs, or any other information
 * that is deemed necessary or useful.
 *
 * TODO: This is a todo statement that describes an atomic task to be completed
 *   at a later date. It wraps after 80 characters and following lines are
 *   indented by 2 spaces.
 *
 * @tag This is a tag named 'tag'
 *
 * 1. A helpful description of a declaration's purpose.
 * 2. Another declaration or collection of declarations can reference this
 *    comment with an inline comment corresponding to the lists number.
 */

/* Thematic section comment block
   ========================================================================== */

/* Basic comment */
```

<a name="css-format"></a>
### 4.2. 格式 （Format）

选择的代码格式应确保代码：易于阅读; 清晰易读的注释; 最大限度地减少意外引入错误的可能性。

* 在多选择器情况下中每行只使用一个选择器。
* 在规则集的左括号之前包含一个空格。
* 每个css属性占一行。
* 每个css属性使用一级缩进。
* 每个css属性冒号后面包含一个空格。
* 使用小写和简写十六进制值，例如`#aaa`。
* 始终使用单引号或双引号。 首选双引号，例如，`content：“”`。
* 引用选择器中的属性值，例如`input [type =“checkbox”]`。
* 允许但是应避免指定零值的单位，例如`margin：0`。
* 在逗号分隔的属性或函数中的每个逗号后面加一个空格值。
* 在声明中最后一个声明的末尾加一个分号块。
* 将规则集的右括号放在与第一列相同的位置。
* 用空行分隔每个规则集。

原文：

The chosen code format ensures that code is: easy to read; easy to clearly
comment; minimizes the chance of accidentally introducing errors; and results
in useful diffs and blames.

* Use one discrete selector per line in multi-selector rulesets.
* Include a single space before the opening brace of a ruleset.
* Include one declaration per line in a declaration block.
* Use one level of indentation for each declaration.
* Include a single space after the colon of a declaration.
* Use lowercase and shorthand hex values, e.g., `#aaa`.
* Use single or double quotes consistently. Preference is for double quotes,
  e.g., `content: ""`.
* Quote attribute values in selectors, e.g., `input[type="checkbox"]`.
* _Where allowed_, avoid specifying units for zero-values, e.g., `margin: 0`.
* Include a space after each comma in comma-separated property or function
  values.
* Include a semi-colon at the end of the last declaration in a declaration
  block.
* Place the closing brace of a ruleset in the same column as the first
  character of the ruleset.
* Separate each ruleset by a blank line.

```css
.selector-1,
.selector-2,
.selector-3[type="text"] {
  background: #fff;
  background: linear-gradient(#fff, rgba(0, 0, 0, 0.8));
  box-sizing: border-box;
  color: #333;
  display: block;
  font-family: helvetica, arial, sans-serif;
}

.selector-a,
.selector-b {
  padding: 10px;
}
```

#### 申明顺序 （Declaration order）

css属性应遵循字母排序，除非有级联的要求。

原文：

Use alphabetical ordering of declarations unless the cascade absolutely
requires otherwise.

```css
.selector {
  background: #000;
  border: 10px solid #333;
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  font-family: sans-serif;
  font-size: 16px;
  text-align: right;
  width: 100%;
}
```

#### 例外 （Exceptions and slight deviations）

单个css属性的规则集可以使用略有不同的单行格式。 在这种情况下，在左花括号之后和由花括号之前都应该包括一个空格。

原文：
Large blocks of single declarations can use a slightly different, single-line
format. In this case, a space should be included after the opening brace and
before the closing brace.

```css
.selector-1 { width: 10%; }
.selector-2 { width: 20%; }
.selector-3 { width: 30%; }
```
长，逗号分隔的属性值（例如阴影集合）或函数参数（例如渐变的属性）可以跨多行排列，以提高可读性。

Long, comma-separated property values - such as collections of shadows - or
function arguments - such as those for gradients - can be arranged across
multiple lines in an effort to improve readability and produce more useful diffs.

```css
.selector {
  background-image:
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 25px,
      rgba(255, 255, 255, 1) 25px,
      rgba(255, 255, 255, 1) 50px
    );
  box-shadow:
    1px 1px 1px #000,
    2px 2px 1px 1px #ccc inset;
}
```

<a name="example"></a>
### 4.3. 实例 （Practical example）

An example of various conventions.

```css
/** @define Grid; use strict */

/**
 * Column layout with horizontal scroll.
 *
 * This creates a single row of full-height, non-wrapping columns that can
 * be browsed horizontally within their parent.
 *
 * Example HTML:
 *
 * <div class="Grid">
 *   <div class="Grid-cell Grid-cell--3"></div>
 *   <div class="Grid-cell Grid-cell--3"></div>
 *   <div class="Grid-cell Grid-cell--3"></div>
 * </div>
 */

/**
 * Grid container
 *
 * Must only contain `.Grid-cell` children.
 *
 * 1. Remove inter-cell whitespace
 * 2. Prevent inline-block cells wrapping
 */

.Grid {
  font-size: 0; /* 1 */
  height: 100%;
  white-space: nowrap; /* 2 */
}

/**
 * Grid cells
 *
 * No explicit width by default. Extend with `.Grid-cell--n` classes.
 *
 * 1. Reset font-size inherited from `.Grid`
 * 2. Set the inter-cell spacing
 * 3. Reset white-space inherited from `.Grid`
 */

.Grid-cell {
  border: 2px solid #333;
  box-sizing: border-box;
  display: inline-block;
  font-size: 1rem; /* 1 */
  height: 100%;
  overflow: hidden;
  padding: 0 10px; /* 2 */
  position: relative;
  vertical-align: top;
  white-space: normal; /* 3 */
}

/* Cell states */

.Grid-cell.is-animating {
  background-color: #fffdec;
}

/* Cell dimension modifiers
   ========================================================================== */

.Grid-cell--1 { width: 10%; }
.Grid-cell--2 { width: 20%; }
.Grid-cell--3 { width: 30%; }
.Grid-cell--4 { width: 40%; }
.Grid-cell--5 { width: 50%; }

/* Cell modifiers
   ========================================================================== */

.Grid-cell--detail,
.Grid-cell--important {
  border-width: 4px;
}
```


Based on work at
[github.com/necolas/idiomatic-html](https://github.com/necolas/idiomatic-html)
and
[github.com/necolas/idiomatic-css](https://github.com/necolas/idiomatic-css).

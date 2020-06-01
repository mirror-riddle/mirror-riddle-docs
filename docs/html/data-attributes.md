---
id: data-attributes
title: Data Attributes
---

[A Complete Guide to Data Attributes](https://css-tricks.com/a-complete-guide-to-data-attributes/)

## 语法

格式为`data-*`，名称用`-`分隔

## CSS

```css
[data-size='large'] {
  padding: 10px;
}

button[data-type='download'] {
}

.card[data-pad='extra'] {
}

/* Selects if the attribute is present at all */
[data-size] {
}

/* Selects if the attribute has a particular value */
[data-state='open'],
[aria-expanded='true'] {
}

/* "Starts with" selector, meaning this would match "3" or anything starting with 3, like "3.14" */
[data-version^='3'] {
}

/* "Contains" meaning if the value has the string anywhere inside it */
[data-company*='google'] {
}

/* case-insensitive */
[data-state='open' i] {
}

/* use data attributes visually */
/* <div data-emoji="✅"> */
[data-emoji]::before {
  content: attr(data-emoji); /* Returns '✅' */
  margin-right: 5px;
}
```

## Javascript

```javascript
/* getAttribute() and setAttribute() */
let value = ele.getAttribute("data-state");
ele.setAttribute("data-state", "collapsed");

/* dataset */
ele.dataset.state = "collapsed";

/* access to inline dataset */
<img src="spaceship.png"
  data-ship-id="324" data-shields="72%"
  onclick="pewpew(this.dataset.shipId)">
</img>

/* JSON data inside data atrributes */
<ul>
  <li data-person='
    {
      "name": "Chris Coyier",
      "job": "Web Person"
    }
  '></li>
</ul>

const el = document.querySelector("li");

let json = el.dataset.person;
let data = JSON.parse(json);

console.log(data.name); // Chris Coyier
console.log(data.job); // Web Person
```

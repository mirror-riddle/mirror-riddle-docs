---
id: regexp
title: RegExp
---

[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

[Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

## RegExp instance methods

`reg.exec(str)` executes a search for a match in a specified string. Returns a result array, or null.

`reg.test(str)` executes a search for a match between a regular expression and a specified string. Returns true or false.

## Create regular expression

regexp literal: 加载时编译正则表达式，如果需要不变化的正则表达式，用这种方法可以提高性能

constructor function: 运行时编译正则表达式，适用于参数可变的情况

```javascript
const re = /ab+c/;

const re2 = new RegExp("ab+c");
```

## Write RegExp pattern

### Assertions

`x(?=y)` Lookahead assertion: Matches x only if x is followed by y

`x(?!y)` Negative lookahead assertion: Matches x only if x is not followed by y

`(?<=y)x` Lookbehind assertion: Matches x only if x is preceded by y

`(?<!y)x` Negative lookbehind assertion: Matches x only if x is not preceded by y

### Boundaries

`^` Matches beginning of input

`$` Matches end of input

`\b` Matches a word boundary, `/\bm/` matches the 'm' in "moon"

`\B` Matches a non-word boundary, `/\Bon/` matches "on" in "at noon", and `/ye\B/` matches "ye" in "possibly yesterday".

### Character Classes

`.` Matches any single character except line terminators: \n, \r, \u2028 or \u2029. Inside a character set, the dot loses its special meaning and matches a literal dot.

`\d` Matches any digit (Arabic numeral). Equivalent to [0-9]

`\D` Matches any character that is not a digit (Arabic numeral). Equivalent to [^0-9]

`\w` Matches any alphanumeric character from the basic Latin alphabet, including the underscore. Equivalent to [A-Za-z0-9_]

`\W` Matches any character that is not a word character from the basic Latin alphabet. Equivalent to [^a-za-z0-9_]

`\s` Matches a single white space character, including space, tab, form feed, line feed and other Unicode spaces. Equivalent to [ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]

`\S` Matches a single character other than white space. Equivalent to [^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]

`\t` Matches a horizontal tab.

`\r` Matches a carriage return.

`\n` Matches a linefeed.

`\v` Matches a vertical tab.

`\f` Matches a form-feed.

`[\b]` Matches a backspace.

`\0` Matches a NUL character. Do not follow this with another digit.

`\` Indicates that the following character should be treated specially, or "escaped". For characters that are usually treated literally, indicates that the next character is special and not to be interpreted literally. For characters that are usually treated specially, indicates that the next character is not special and should be interpreted literally.

### Groups and Ranges

`x|y` Matches either x or y. For example, /green|red/ matches "green" in "green apple" and "red" in "red apple".

`[xyz]` A character set. Matches any one of the enclosed characters.

`[^xyz]` A negated or complemented character set.

`(x)` Capturing group: Matches x and remembers the match. For example, /(foo)/ matches and remembers "foo" in "foo bar".Matches are accessed using the index of the the result's elements ([1], ..., [n]) or from the predefined RegExp object's properties ($1, ..., $9).

`\n` Where n is a positive integer. A back reference to the last substring matching the n parenthetical in the regular expression (counting left parentheses). For example, /apple(,)\sorange\1/ matches "apple, orange," in "apple, orange, cherry, peach".

`(?<name>x)` Named capturing group: Matches x and stores it on the groups property of the returned matches under the name specified by `<Name>`. The angle brackets ('<' and '>') are required for group name.

`(?:x)` Non-capturing group: Matches x but does not remember the match. The matched substring cannot be recalled from the resulting array's elements ([1], ..., [n]) or from the predefined RegExp object's properties ($1, ..., $9).

### Quantifiers

`x*` Matches the preceding item x 0 or more times. For example, `/bo\*/` matches "boooo" in "A ghost booooed" and "b" in "A bird warbled", but nothing in "A goat grunted".

`x+` Matches the preceding item x 1 or more times. Equivalent to {1,}. For example, /a+/ matches the "a" in "candy" and all the "a"'s in "caaaaaaandy".

`x?` Matches the preceding item x 0 or 1 time. For example, /e?le?/ matches the "el" in "angel" and the "le" in "angle." If used immediately after any of the quantifiers \*, +, ?, or {}, makes the quantifier non-greedy (matching the minimum number of times), as opposed to the default, which is greedy (matching the maximum number of times).

`x{n}` Where n is a positive integer. Matches exactly n occurrences of the preceding item x.

`x{n,}` Where n is a positive integer. Matches at least n occurrences of the preceding item x.

`x{n,m}` Where n is 0 or a positive integer, m is a positive integer, and m > n. Matches at least n and at most m occurrences of the preceding item x.

## Usage

`RegExp.exec()`

`RegExp.test()`

`String.match()`

`String.MatchAll()`

`String.search()`

`String.replace()`

`String.split()`

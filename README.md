# stringlist

Parses lists of strings into array.

[![Build Status](https://travis-ci.org/Janpot/stringlist.svg)](https://travis-ci.org/Janpot/stringlist)

## Usage

This module takes strings in a list form and parses them to an array of strings

```js
var stringlist = require('stringlist');
stringlist.parse('item, "another item", yet another item');
// [ 'item', 'another item', 'yet another item' ]
```

## API

### Parsing

```js
stringlist.parse(string, [options])
```

returns an array of strings parsed from the input. you can define your own `options.delimiter` if you don't want to use `,` as a delimiter.

## Format

The stringlist accepts two types of items

1. unquoted items are trimmed and returned as they were in the input string.

2. quoted items (either with `'` or `"`) are treated as if they were javascript strings.
They are not trimmed and all special characters must be escaped. Escaped characters are returned as they were

### example

```js
// unquoted strings are trimmed
stringlist.parse(' item 1, item 2 ,item 3 ');
// [ 'item 1', 'item 2', 'item 3' ]

// quoted strings are not trimmed
stringlist.parse('" item 1", " item 2 ", "item 3 "');
// [ ' item 1', ' item 2 ', 'item 3 ' ]

// unquoted strings are not unescaped
stringlist.parse(' \\" ');
// [ '\"' ]

// quoted strings are unescaped
stringlist.parse('" \\" "');
// [ ' " ' ]
```


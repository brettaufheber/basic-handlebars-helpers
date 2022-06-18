# basic-handlebars-helpers

This project is a basic set of 88 Handlebars helpers in 7 categories.

## Installation

Install basic-handlebars-helpers with npm:

```sh
npm install --save basic-handlebars-helpers
```

## Usage

Register the Handlebars helpers.

```js
require('basic-handlebars-helpers').helpers.register();
```

To use the "asciidoc" helper, the [Asciidoctor](https://www.npmjs.com/package/asciidoctor) dependency must be installed first. The Asciidoctor instance is used to set up this helper.

```js
const asciidoctor = require('asciidoctor')();

require('basic-handlebars-helpers').helpers.register();
require('basic-handlebars-helpers').utils.asciidoc.setupAsciidoctor(asciidoctor, {/* attributes here */});
```

## Categories


### Essential Operations

Helpers that make the Handlebars template engine usable.

[equals](#-equals-),
[not-equals](#-not-equals-),
[and](#-and-),
[or](#-or-),
[not](#-not-),
[xor](#-xor-),
[iif](#-iif-),
[type-of](#-type-of-),
[to-boolean](#-to-boolean-),
[to-number](#-to-number-),
[to-string](#-to-string-),
[to-json](#-to-json-),
[from-json](#-from-json-),
[to-yaml](#-to-yaml-),
[from-yaml](#-from-yaml-),
[array](#-array-),
[object](#-object-),
[range](#-range-),
[get-root](#-get-root-),
[get](#-get-),
[jsonpath](#-jsonpath-)


### Iterable Operations

Helpers for iterable types such as strings, arrays and objects.

[length](#-length-),
[empty](#-empty-),
[in](#-in-),
[any-in](#-any-in-),
[chunk](#-chunk-),
[slice](#-slice-),
[reverse](#-reverse-),
[shuffle](#-shuffle-),
[sort](#-sort-),
[first](#-first-),
[last](#-last-),
[at](#-at-),
[concat](#-concat-),
[flatten](#-flatten-),
[keys](#-keys-),
[values](#-values-)


### Number Operations

Helpers for working with numbers.

[is-nan](#-is-nan-),
[is-finite](#-is-finite-),
[lt](#-lt-),
[lte](#-lte-),
[gt](#-gt-),
[gte](#-gte-),
[even](#-even-),
[odd](#-odd-),
[nth](#-nth-),
[round](#-round-),
[floor](#-floor-),
[ceil](#-ceil-),
[inc](#-inc-),
[dec](#-dec-),
[abs](#-abs-),
[neg](#-neg-)


### Path Operations

Helpers for working with path strings.

[basename](#-basename-),
[dirname](#-dirname-),
[extname](#-extname-),
[is-absolute-path](#-is-absolute-path-),
[normalize-path](#-normalize-path-),
[relative-path](#-relative-path-),
[resolve-path](#-resolve-path-),
[join-path](#-join-path-)


### Set Operations

Helpers to apply set operations to arrays and objects.

[union](#-union-),
[intersection](#-intersection-),
[sym-difference](#-sym-difference-),
[difference](#-difference-)


### String Operations

Helpers for working with strings.

[asciidoc](#-asciidoc-),
[format](#-format-),
[lowercase](#-lowercase-),
[uppercase](#-uppercase-),
[capitalize](#-capitalize-),
[replace](#-replace-),
[match](#-match-),
[matches](#-matches-),
[blank](#-blank-),
[starts-with](#-starts-with-),
[ends-with](#-ends-with-),
[trim](#-trim-),
[trim-left](#-trim-left-),
[trim-right](#-trim-right-),
[split](#-split-),
[join](#-join-)


### URL Operations

Helpers for working with URL strings.

[parse-url](#-parse-url-),
[with-auth](#-with-auth-),
[with-hostname](#-with-hostname-),
[with-port](#-with-port-),
[with-pathname](#-with-pathname-),
[with-query](#-with-query-),
[with-fragment](#-with-fragment-)


## Helpers

The version 3.0.0 was used to generate this API documentation.


### Category: Essential Operations

Helpers that make the Handlebars template engine usable.


#### {{ equals }}

Checks whether the arguments are equal.

Parameters:



* The values to compare.

    * types: ...any (spread parameters) 
    * minimum: 2


Hash Parameters:


* ```deep``` This flag allows comparing data structures recursively.

    * types: implicit-boolean
    * default: false



#### {{ not-equals }}

Checks whether the arguments are not equal.

Parameters:



* The values to compare.

    * types: ...any (spread parameters) 
    * minimum: 2


Hash Parameters:


* ```deep``` This flag allows comparing data structures recursively.

    * types: implicit-boolean
    * default: false



#### {{ and }}

Applies the logical conjunction to multiple values.

Parameters:



* The values on which the AND operation is applied.

    * types: ...implicit-boolean (spread parameters) 
    * minimum: 0





#### {{ or }}

Applies the logical disjunction to multiple values.

Parameters:



* The values on which the OR operation is applied.

    * types: ...implicit-boolean (spread parameters) 
    * minimum: 0





#### {{ not }}

Applies the logical negation to multiple values.

Parameters:



* The values on which the NOT operation is applied.

    * types: ...implicit-boolean (spread parameters) 
    * minimum: 0





#### {{ xor }}

Applies the logical exclusive disjunction to multiple values.

Parameters:



* The values on which the XOR operation is applied.

    * types: ...implicit-boolean (spread parameters) 
    * minimum: 0





#### {{ iif }}

Applies if-then-else in one method (known as inline if or ternary if).

Parameters:


* The condition.

    * types: implicit-boolean
    * optional: false


* The value used if condition is true.

    * types: any
    * optional: false


* The value used if condition is false.

    * types: any
    * optional: false






#### {{ type-of }}

Gets the type of a value.

Parameters:


* The value for which the type is to be determined.

    * types: any
    * optional: false






#### {{ to-boolean }}

Converts a value to a boolean type.

Parameters:


* The value to be converted to boolean.

    * types: any
    * optional: false






#### {{ to-number }}

Converts a value to a number type.

Parameters:


* The value to be converted to number.

    * types: any
    * optional: false






#### {{ to-string }}

Converts a value to a string type.

Parameters:


* The value to be converted to string.

    * types: any
    * optional: false






#### {{ to-json }}

Converts a value to a JSON string.

Parameters:


* The value to be converted to a JSON string.

    * types: any
    * optional: false



Hash Parameters:


* ```indent``` The depth to indent. Zero means no indentation.

    * types: number
    * default: 0



#### {{ from-json }}

Parses a JSON string.

Parameters:


* The value to be parsed.

    * types: string
    * optional: false






#### {{ to-yaml }}

Converts a value to a YAML string.

Parameters:


* The value to be converted to a YAML string.

    * types: any
    * optional: false






#### {{ from-yaml }}

Parses a YAML string.

Parameters:


* The value to be parsed.

    * types: string
    * optional: false



Hash Parameters:


* ```multiple``` This flag allows parsing of multi-document sources.

    * types: implicit-boolean
    * default: false



#### {{ array }}

Creates an array from arguments.

Parameters:



* The elements of the new array.

    * types: ...any (spread parameters) 
    * minimum: 0





#### {{ object }}

Creates an object from hash arguments.







#### {{ range }}

Creates a range of numbers as an array.

Parameters:


* The inclusive number at which the range is started.

    * types: number
    * optional: false


* The inclusive number at which the range is stopped.

    * types: number
    * optional: true


* The increment step or decrement step if this number negative. The default is 1.

    * types: number
    * optional: true






#### {{ get-root }}

Gets the a value from the root object by a sequence of keys and indices.

Parameters:



* The keys or indices used to find a value in the data structure.

    * types: ...any (spread parameters) 
    * minimum: 0





#### {{ get }}

Gets a value from a data structure by a sequence of keys and indices.

Parameters:


* The data structure.

    * types: array, object
    * optional: false



* The keys or indices used to find a value in the data structure.

    * types: ...any (spread parameters) 
    * minimum: 0





#### {{ jsonpath }}

Gets a value from a data structure by a JSONPath expression.

Parameters:


* The data structure.

    * types: array, object
    * optional: false


* The query.

    * types: string
    * optional: false







### Category: Iterable Operations

Helpers for iterable types such as strings, arrays and objects.


#### {{ length }}

Gets the length of an iterable value.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false






#### {{ empty }}

Checks whether an iterable value is empty.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false






#### {{ in }}

Checks whether all of the given elements are included in an iterable value.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false



* The values to test.

    * types: ...any (spread parameters) 
    * minimum: 1





#### {{ any-in }}

Checks whether any of the given elements is included in an iterable value.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false



* The values to test.

    * types: ...any (spread parameters) 
    * minimum: 1





#### {{ chunk }}

Gets chunks of an iterable value with variable length.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false


* The size of the chunks.

    * types: number
    * optional: false






#### {{ slice }}

Gets a contiguous subsequence of an iterable value.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false


* The inclusive index at which the slice begins.

    * types: number
    * optional: false


* The exclusive index at which the slice ends.

    * types: number
    * optional: true






#### {{ reverse }}

Gets the elements of an iterable value in reverse order.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false






#### {{ shuffle }}

Shuffles the elements of an iterable value in random order.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false






#### {{ sort }}

Sorts the elements of an iterable value.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false



* The keys or indices used to find the values to compare.

    * types: ...any (spread parameters) 
    * minimum: 0


Hash Parameters:


* ```descending``` This flag switches from ascending to descending order.

    * types: implicit-boolean
    * default: false


* ```ignorecase``` This flag allows ignore-case comparison.

    * types: implicit-boolean
    * default: false



#### {{ first }}

Gets the first element of an iterable value.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false






#### {{ last }}

Gets the last element of an iterable value.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false






#### {{ at }}

Gets an element at a specific index of an iterable value.

Parameters:


* The given iterable value.

    * types: string, array, object
    * optional: false


* The index of the value to get.

    * types: any
    * optional: false






#### {{ concat }}

Concatenates two or more strings or arrays.

Parameters:



* The strings or arrays to concatenate.

    * types: ...string, ...array (spread parameters) (all should be of the same type)
    * minimum: 2





#### {{ flatten }}

Flattens an array with variable depth.

Parameters:


* The given array.

    * types: array
    * optional: false


* The depth to flatten. Zero means infinite depth. The default value is 1.

    * types: number
    * optional: true






#### {{ keys }}

Gets the keys of an object.

Parameters:


* The given object.

    * types: object
    * optional: false






#### {{ values }}

Gets the values of an object.

Parameters:


* The given object.

    * types: object
    * optional: false







### Category: Number Operations

Helpers for working with numbers.


#### {{ is-nan }}

Checks whether a number is NaN.

Parameters:


* The given number.

    * types: number
    * optional: false






#### {{ is-finite }}

Checks whether a number is finite.

Parameters:


* The given number.

    * types: number
    * optional: false






#### {{ lt }}

Checks strictly increasing order of multiple numbers.

Parameters:



* The given numbers to compare.

    * types: ...number (spread parameters) 
    * minimum: 2





#### {{ lte }}

Checks increasing order of multiple numbers.

Parameters:



* The given numbers to compare.

    * types: ...number (spread parameters) 
    * minimum: 2





#### {{ gt }}

Checks strictly decreasing order of multiple numbers.

Parameters:



* The given numbers to compare.

    * types: ...number (spread parameters) 
    * minimum: 2





#### {{ gte }}

Checks decreasing order of multiple numbers.

Parameters:



* The given numbers to compare.

    * types: ...number (spread parameters) 
    * minimum: 2





#### {{ even }}

Checks for even numbers.

Parameters:


* The given number.

    * types: number
    * optional: false






#### {{ odd }}

Checks for odd numbers.

Parameters:


* The given number.

    * types: number
    * optional: false






#### {{ nth }}

Checks for multiples of a number.

Parameters:


* The given number to check.

    * types: number
    * optional: false


* The factor.

    * types: number
    * optional: false






#### {{ round }}

Rounds a number to the nearest digit value at a specific decimal position.

Parameters:


* The given number.

    * types: number
    * optional: false


* The number of digits after the floating point to round. The default is zero.

    * types: number
    * optional: true






#### {{ floor }}

Rounds a number down at a specific decimal position.

Parameters:


* The given number.

    * types: number
    * optional: false


* The number of digits after the floating point to round. The default is zero.

    * types: number
    * optional: true






#### {{ ceil }}

Rounds a number up at a specific decimal position.

Parameters:


* The given number.

    * types: number
    * optional: false


* The number of digits after the floating point to round. The default is zero.

    * types: number
    * optional: true






#### {{ inc }}

Increases a number.

Parameters:


* The given number.

    * types: number
    * optional: false


* The increment step. The default value is 1.

    * types: number
    * optional: true






#### {{ dec }}

Decreases a number.

Parameters:


* The given number.

    * types: number
    * optional: false


* The decrement step. The default value is 1.

    * types: number
    * optional: true






#### {{ abs }}

Gets the absolute value of a number.

Parameters:


* The given number.

    * types: number
    * optional: false






#### {{ neg }}

Gets the negated value of a number.

Parameters:


* The given number.

    * types: number
    * optional: false







### Category: Path Operations

Helpers for working with path strings.


#### {{ basename }}

Gets the last part of a given path.

Parameters:


* The given path.

    * types: string
    * optional: false


* An optional file extension.

    * types: string
    * optional: true






#### {{ dirname }}

Gets the directory name of a given path.

Parameters:


* The given path.

    * types: string
    * optional: false






#### {{ extname }}

Gets the file extension of the given path.

Parameters:


* The given path.

    * types: string
    * optional: false






#### {{ is-absolute-path }}

Checks whether the given path is absolute.

Parameters:


* The given path.

    * types: string
    * optional: false






#### {{ normalize-path }}

Normalizes a given path.

Parameters:


* The given path.

    * types: string
    * optional: false






#### {{ relative-path }}

Gets a relative path.

Parameters:


* A path to relativize from this path to another path.

    * types: string
    * optional: false


* A path to relativize from the other path to this path.

    * types: string
    * optional: false






#### {{ resolve-path }}

Gets a resolved path from multiple paths.

Parameters:



* The given paths to resolve.

    * types: ...string (spread parameters) 
    * minimum: 1





#### {{ join-path }}

Joins all given paths together.

Parameters:



* The given paths to join.

    * types: ...string (spread parameters) 
    * minimum: 1






### Category: Set Operations

Helpers to apply set operations to arrays and objects.


#### {{ union }}

Creates the union of multiple arrays or objects

Parameters:



* The given arrays or objects.

    * types: ...array, ...object (spread parameters) (all should be of the same type)
    * minimum: 1


Hash Parameters:


* ```deep``` This flag allows merging data structures recursively.

    * types: implicit-boolean
    * default: false



#### {{ intersection }}

Creates the intersection of multiple arrays or objects

Parameters:



* The given arrays or objects.

    * types: ...array, ...object (spread parameters) (all should be of the same type)
    * minimum: 1





#### {{ sym-difference }}

Creates the symmetric difference of multiple arrays or objects

Parameters:



* The given arrays or objects.

    * types: ...array, ...object (spread parameters) (all should be of the same type)
    * minimum: 1





#### {{ difference }}

Creates the difference by applying the first one to all further arrays or objects

Parameters:



* The given arrays or objects.

    * types: ...array, ...object (spread parameters) (all should be of the same type)
    * minimum: 2






### Category: String Operations

Helpers for working with strings.


#### {{ asciidoc }}

Converts AsciiDoc to HTML.

Parameters:


* A string with AsciiDoc content.

    * types: string
    * optional: false



Hash Parameters:


* ```inline``` This flag switches the doctype between article and inline.

    * types: implicit-boolean
    * default: false



#### {{ format }}

Formats a string in the way of the sprintf method.

Parameters:


* The format string.

    * types: string
    * optional: false



* The arguments for the format string.

    * types: ...any (spread parameters) 
    * minimum: 0





#### {{ lowercase }}

Gets the lowercase string.

Parameters:


* The given string.

    * types: string
    * optional: false






#### {{ uppercase }}

Gets the uppercase string.

Parameters:


* The given string.

    * types: string
    * optional: false






#### {{ capitalize }}

Gets the capitalized string.

Parameters:


* The given string.

    * types: string
    * optional: false



Hash Parameters:


* ```global``` This flag allows to capitalize all words.

    * types: implicit-boolean
    * default: false



#### {{ replace }}

Replaces some parts of a string by a regular expression.

Parameters:


* The given string.

    * types: string
    * optional: false


* The pattern.

    * types: string
    * optional: false


* The replacement.

    * types: string
    * optional: false



Hash Parameters:


* ```global``` This flag allows replacing with any occurrence instead of just the first match.

    * types: implicit-boolean
    * default: false


* ```multiline``` This flag allows matching every line as a separate input.

    * types: implicit-boolean
    * default: false



#### {{ match }}

Extracts parts of a string by a regular expression.

Parameters:


* The given string.

    * types: string
    * optional: false


* The pattern.

    * types: string
    * optional: false



Hash Parameters:


* ```global``` This flag allows extracting all occurrences instead of just the first match.

    * types: implicit-boolean
    * default: false


* ```multiline``` This flag allows matching every line as a separate input.

    * types: implicit-boolean
    * default: false



#### {{ matches }}

Checks whether a string matches a regular expression.

Parameters:


* The given string.

    * types: string
    * optional: false


* The pattern.

    * types: string
    * optional: false



Hash Parameters:


* ```multiline``` This flag allows matching every line as a separate input.

    * types: implicit-boolean
    * default: false



#### {{ blank }}

Checks whether a string is empty or contains only spaces.

Parameters:


* The given string.

    * types: string
    * optional: false






#### {{ starts-with }}

Checks whether a string starts with another string.

Parameters:


* The given string.

    * types: string
    * optional: false


* The search string.

    * types: string
    * optional: false






#### {{ ends-with }}

Checks whether a string ends with another string.

Parameters:


* The given string.

    * types: string
    * optional: false


* The search string.

    * types: string
    * optional: false






#### {{ trim }}

Gets a string without leading or trailing spaces.

Parameters:


* The given string.

    * types: string
    * optional: false






#### {{ trim-left }}

Gets a string without leading spaces.

Parameters:


* The given string.

    * types: string
    * optional: false






#### {{ trim-right }}

Gets a string without trailing spaces.

Parameters:


* The given string.

    * types: string
    * optional: false






#### {{ split }}

Splits a string into an array by a separator.

Parameters:


* The given string.

    * types: string
    * optional: false


* The separator.

    * types: string
    * optional: false






#### {{ join }}

Joins an array of strings together to one string by a separator.

Parameters:


* The given array of strings.

    * types: array
    * optional: false


* The separator. The default value is an empty string.

    * types: string
    * optional: true







### Category: URL Operations

Helpers for working with URL strings.


#### {{ parse-url }}

Parses an URL string and returns an object with URL parts.

Parameters:


* The given URL string.

    * types: string
    * optional: false






#### {{ with-auth }}

Gets an URL with a specified username and password.

Parameters:


* The given URL string.

    * types: string
    * optional: false


* The username.

    * types: string, null
    * optional: false


* The password.

    * types: string, null
    * optional: true






#### {{ with-hostname }}

Gets an URL with a specified hostname.

Parameters:


* The given URL string.

    * types: string
    * optional: false


* The hostname.

    * types: string
    * optional: false






#### {{ with-port }}

Gets an URL with a specified port.

Parameters:


* The given URL string.

    * types: string
    * optional: false


* The port.

    * types: string, number, null
    * optional: false






#### {{ with-pathname }}

Gets an URL with a specified pathname.

Parameters:


* The given URL string.

    * types: string
    * optional: false


* The pathname.

    * types: string, null
    * optional: false






#### {{ with-query }}

Gets an URL with a specified query part.

Parameters:


* The given URL string.

    * types: string
    * optional: false


* The query part.

    * types: string, array, object, null
    * optional: false



Hash Parameters:


* ```append``` This flag allows to append to an existing query part.

    * types: implicit-boolean
    * default: false



#### {{ with-fragment }}

Gets an URL with a specified fragment.

Parameters:


* The given URL string.

    * types: string
    * optional: false


* The fragment.

    * types: string, null
    * optional: false







<br />

## MIT License

Copyright (c) 2022 Eric Löffler (brettaufheber)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


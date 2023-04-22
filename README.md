# Multitry

[![Documentation](https://img.shields.io/badge/Documentation-3178C6.svg?logo=typescript&logoColor=ffffff)][DOCS_URL]
[![NPM](https://img.shields.io/npm/v/multitry.svg?style=&labelColor=cb0000&color=000000&label=NPM&logo=npm)][NPM_URL]
[![CodePen](https://img.shields.io/badge/CodePen-000000.svg?style=&logo=CodePen)][CODEPEN_URL]

[DOCS_URL]: https://mineejo.github.io/multitry/

[NPM_URL]: https://npmjs.org/package/multitry

[CODEPEN_URL]: https://codepen.io/mineejo/pen/abRNQwo

Multitry is a wrapper with a different take on `try-catch-finally` construction.

If you've ever written try to catch, you've run into variable scope, nested try to catch, or just ignored catch - you
can use this wrapper to avoid them!

Install with `npm install multitry`.

## Usage and API

### Import

The package is written in TypeScript and compiled in JavaScript ESM, there is no support for CommonJS, keep that in
mind!

```jsx
// Normal import
import { multitry } from "multitry";
// Jsx / Tsx import
import { Multitry } from "multitry";
// Cdn import
import { multitry } from "https://www.unpkg.com/multitry/dist/lib/index.js";
```

### Error handling

One of the main differences of Multitry is that an error will never throw an exception without intervention, the
following are examples of how an error or undefined can return, this has positive features because you can handle the
error or override the default value immediately.

### Ignoring

The error is ignored and the return value can either be a value or undefined. It may be undefined because the error has
not been handled.

```js
const result = multitry({
  try: () => JSON.parse("Hello world!"),
});

console.log(result); // "Hello world!"
```

### Error ejection

The returned value can either be a value, an undefined value, or an error object. This happens because catch was
specified, but for some reason the error was not handled and returned. Note that the error will return, not throw an
exception.

```js
const result = multitry({
  try: () => JSON.parse("Hello world! {"),
  catch: () => undefined,
});

console.error(result); // SyntaxError: Unexpected token H in JSON at position 0...
```

You can interact with an error in the catch function. Handle the error or just output.

```js
const result = multitry({
  try: () => JSON.parse("Hello world! {"),
  catch: (e) => console.error(e),
}); // SyntaxError: Unexpected token H in JSON at position 0...
```

### Multi

Specifying several tries will return the first successful one. This way you can handle ignoring an error, which is not
recommended when you can use catch and is shown just for the example.

```javascript
const result = multitry({
    // Variable "something" does not exist, which will cause an exception.
    try: () => something
  },
  {
    try: () => "foo",
  }); // foo
```

### Other

JSX / TSX support when you want to render something in the DOM.

```jsx
<Multitry
  try={() => JSON.parse("Hello world! {")}
  catch={(e) => {
    console.error(e);
    return e.toString();
  }}
/> // SyntaxError: Unexpected token 'H', "Hello world! {" is not valid JSON
```

[Read more about API...][DOCS_URL]
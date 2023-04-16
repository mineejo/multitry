# Multitry

[![Documentation](https://img.shields.io/badge/Documentation-3178C6.svg?logo=typescript&logoColor=ffffff)][DOCS_URL]
[![NPM](https://img.shields.io/npm/v/multitry.svg?style=&labelColor=cb0000&color=000000&label=NPM&logo=npm)][NPM_URL]
[![CodePen](https://img.shields.io/badge/CodePen-000000.svg?style=&logo=CodePen)][CODEPEN_URL]

[DOCS_URL]: https://mineejo.github.io/multitry/

[NPM_URL]: https://npmjs.org/package/multitry

[CODEPEN_URL]: https://codepen.io/mineejo/pen/abRNQwo

Multitry is a wrapper with a different take on `try-catch-finally` construction.

## Install

Choose the way you like, if you don't understand what these commands are, use the first one with the npm.

```shell
npm install multitry 
```

```shell
yarn add multitry
```

```shell
pnpm add multitry
```

## Example

```jsx
// Normal import
import { multitry } from "multitry";
// Jsx / Tsx import
import { Multitry } from "multitry";
// Cdn import
import { multitry } from "https://www.unpkg.com/multitry/dist/lib/index.js";
```

An example where an error is ignored and the return value can either be a value or undefined.

```js
const result = multitry({
  try: () => JSON.parse("Hello world!"),
});

console.log(result); // "Hello world!"
```

An example where an error is ignored and the return value can either be a value, undefined, or an error object.

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

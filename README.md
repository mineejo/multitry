# Multitry

[![API](https://img.shields.io/badge/API-3178C6.svg)](https://mineejo.github.io/multitry/)
[![NPM](https://img.shields.io/npm/v/multitry.svg?style=&labelColor=cc3534&color=gray&label=NPM)](https://www.npmjs.com/package/multitry)

[APIURL]: https://mineejo.github.io/multitry/

[NPMURL]: https://npmjs.org/package/multitry

Multitry is a wrapper with a different take on `try-catch-finally` construction.

## Install

Choose the way you like, if you don't understand what these commands are, use the first one with the npm.

```shell
npm install @mineejo/multitry
```

```shell
yarn add @mineejo/multitry
```

```shell
pnpm add @mineejo/multitry
```

## Example

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
    catch: () => undefined
});

console.error(result); // SyntaxError: Unexpected token H in JSON at position 0...
```

You can interact with an error in the catch function. Handle the error or just output.

```js
const result = multitry({
    try: () => JSON.parse("Hello world! {"),
    catch: (e) => console.error(e)
}); // SyntaxError: Unexpected token H in JSON at position 0...
```

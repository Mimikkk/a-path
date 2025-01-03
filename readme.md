# @nimir/a-path - Typescript friendly object/tuple path resolve

<a href="https://www.npmjs.com/package/@nimir/a-path">
  <img alt="npm version" src="https://img.shields.io/npm/v/@nimir/a-path.svg?style=flat-square" />
</a>
<a href="https://www.npmjs.com/package/@nimir/a-path">
  <img alt="npm downloads" src="https://img.shields.io/npm/dm/@nimir/a-path.svg?style=flat-square" />
</a>

Full thanks to [gmarkov](https://github.com/g-makarov) and
his [dot-path-value](https://github.com/g-makarov/dot-path-value).

This is an extension of this library, with API changes and an addition of `At`, `Of` type utilities, and changes
to `get`/`set`.

## Install

```bash
pnpm install @nimir/a-path
```

```bash
npm install @nimir/a-path
```

```bash
yarn add @nimir/a-path
```

## Features

- `Path<T>` - Get all paths of T in dotted string format.
- `Path.At<T, Y>` - Get the type of value at path Y of T.
- `Path.Of<T, Y>` - Get all paths with type Y of T in dotted string format.
- `Path.get(item, path)` - Get value by path with type-safety.
- `Path.set(item, path, value)` - Set value by path with type-safety.
- Supports object, array, tuple and recursive types.

## Usage

### Usage of Path utilities

```ts
import type { Path } from '@nimir/a-path';
type Item = {
  a: { b: { c: string } };
  b: number;
  c: string;
};

Path<Item>;
//   ^? "a.b.c" | "b" | "a.b" | "a"

Path.Of<Item, string>;
//   ^? "a.b.c" | "c"

Path.Of<Item, number | string>;
//   ^? "a.b.c" | "b" | "c"

Path.Of<Item, { c: number }>;
//   ^? "a.b"

Path.At<Item, 'a.b.c'>;
//   ^? string

Path.At<Item, 'a.b'>;
//   ^? { c: string }

Path.At<Item, 'a.b.c.d'>;
//   ^? never

Path.At<Item, 'a.b.c' | 'a.b'>;
//   ^? string | { c: string }

type RecursiveItem = {
  a: RecursiveItem;
  b: number;
};

Path<RecursiveItem>;
//   ^? "a" | "b" // Does Not throw typescript lsp into an infinite loop
```

### Usage with an object

```ts
import { Path } from '@nimir/a-path';

type Item = {
  a: { b: { c: string } };
  b: number;
  c: string;
};

const item: Item = {
  a: { b: { c: 'hello' } },
  b: 0xbeef,
  c: 'world!',
};

Path.get(item, 'a.b.c');
// -> string
Path.get(item, 'a.b');
// -> number
Path.get(item, 'himom!');
// Throws!

Path.set(item, 'a.b.c', 'himom!');
// valid
Path.set(item, 'a.b.c', 0xbeef);
// invalid
Path.set(item, 'a.b', { c: 'himom!' });
// valid
```

### Usage with a tuple

```ts
import { Path } from '@nimir/a-path';

type Item = {
  a: { b: { c: string; } },
  b: number;
};

type Tuple = [string, [first: Item, second: Item]];

const tuple: Tuple = ['hello', [item, item]];

Path.get(tuple, '0');
// -> string
Path.get(tuple, '1.0.a.b.c');
// -> string
Path.get(tuple, '1');
// -> [first: Item, second: Item]
Path.get(tuple, 'himom!');
// Throws!

Path.set(tuple, '0', 'himom!');
// valid
Path.set(tuple, '1.0.a.b.c', 'himom!');
// valid
Path.set(tuple, '1.0.a.b.c', 0xbeef);
// invalid
Path.set(tuple, '1.0.a.b', { c: 'himom!' });
// valid
```

### Usage with an array

```ts
import { Path } from '@nimir/a-path';

type Item = {
  a: { b: { c: string } };
  b: number;
  c: string;
};

const items: Item[] = [item, item];

Path.get(items, '0');
// -> Item
Path.get(items, '1.a.b.c');
// -> string
Path.get(items, 'himom!');
// Throws!

Path.set(items, '0', { a: { b: { c: 'himom!' } }, b: 0xbeef });
// valid
Path.set(items, '1.a.b.c', 'himom!');
// valid
Path.set(items, '1.a.b.c', 0xbeef);
// invalid
Path.set(items, '1.a.b', { c: 'himom!' });
// valid
```

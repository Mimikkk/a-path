import { bench, BenchOptions, describe } from 'vitest';
import { Path } from './z-path.js';

namespace impl_1 {
  export const get = <typeof Path.get>((item, path) => {
    const segments = path.split('.');

    let result = item;
    for (let i = 0, it = segments.length; i < it; ++i) result = result[segments[i]];

    return result;
  });

  export const set = <typeof Path.set>((item, path, value) => {
    const segments = path.split('.');

    let target = item;
    for (let i = 0, it = segments.length - 1; i < it; ++i) {
      const key = segments[i];

      //@ts-expect-error
      if (!(key in target)) target[key] = {};
      target = target[key];
    }

    //@ts-expect-error
    target[segments[segments.length - 1]] = value;

    return item;
  });
}

namespace impl_2 {
  // optional get

  export const get = <typeof Path.get>((obj, path) => {
    try {
      const segments = path.split('.');

      let result = obj;
      for (let i = 0, it = segments.length; i < it; ++i) result = result[segments[i]];

      return result;
    } catch {
      return undefined;
    }
  });

  export const set = <typeof Path.set>((item, path, value) => {
    const segments = path.split('.');

    let target = item;
    for (let i = 0, it = segments.length - 1; i < it; ++i) {
      const key = segments[i];

      //@ts-expect-error
      if (!(key in target)) target[key] = {};
      target = target[key];
    }

    //@ts-expect-error
    target[segments[segments.length - 1]] = value;

    return item;
  });
}

describe('Path Bench', () => {
  const options: BenchOptions = {
    warmupIterations: 1000,
    iterations: 10000,
  };

  describe('Get', () => {
    const item = { a: { b: { c: 1 } } };

    bench('impl_1', () => {
      impl_1.get(item, 'a.b.c');
    }, options);

    bench('impl_2', () => {
      impl_2.get(item, 'a.b.c');
    }, options);
  });

  describe('Set', () => {
    const item = { a: { b: { c: 1 } } };

    bench('impl_1', () => {
      impl_1.set(item, 'a.b.c', Math.random());
    }, options);

    bench('impl_2', () => {
      impl_2.set(item, 'a.b.c', Math.random());
    }, options);
  });
});

import type { AtImpl, ListImpl, PathImpl } from './types.js';
/**
 * A type representing all paths in an object.
 *
 * @example
 * type T = { a: { b: { c: number } }, b: number };
 *
 * type P = Path<T>;
 * >> "a" | "a.b" | "a.b.c" | "b"
 * */
export type Path<T> = PathImpl<T>;
export declare namespace Path {
    /**
     * A type representing the typeof value at a given path in an object.
     *
     * @example
     * type T = [1, { a: number }];
     *
     * PathValue<T, '0'>;
     * >> 1
     * PathValue<T, '1.a'>;
     * >> number
     * */
    type At<T, P extends Path<T>> = AtImpl<T, P>;
    /**
     * A type representing all paths in an array form.
     *
     * @example
     * type T = [1, { a: number }];
     *
     * List<T>;
     * >> ["0", "1", "1.a"]
     *
     * @remark
     * This type is Very computationally expensive. Do not overuse it.
     * */
    type List<T> = ListImpl<Path<T>>;
    /**
     * A type representing all paths pointing to specific type in an array form.
     *
     * @example
     * type T = [1, { a: number }];
     *
     * ListOf<T, number>;
     * >> ["0", "1.a"]
     *
     * @remark
     * This type is Very computationally expensive. Do not overuse it.
     * */
    type ListOf<T, E> = ListImpl<Of<T, E>>;
    /**
     * Get the path of a value in an object.
     *
     * @example
     * type T = { a: { b: { c: number } }, b: number };
     *
     * Path.Of<T, number>;
     *
     * >> "a.b.c" | "b"
     */
    type Of<T, E> = {
        [K in Path<T>]: At<T, K> extends E ? K : never;
    }[Path<T>];
    /**
     * Get a value at a given path in an object.
     *
     * @param item The object to get the value from.
     * @param path The path to get the value at.
     *
     * @returns The value at the given path.
     *
     * @example
     * const item = { a: { b: { c: 1 } } };
     *
     * Path.get(item, 'a.b.c');
     * >> 1
     * */
    const get: <T extends Record<string, any>, P extends PathImpl<T, T>>(item: T, path: P) => At<T, P>;
    /**
     * Set a value at a given path in an object.
     *
     * @param item The object to set the value in.
     * @param path The path to set the value at.
     * @param value The value to set.
     *
     * @returns The object with the value set at the given path.
     *
     * @example
     * const item = { a: { b: { c: 1 } } };
     *
     * Path.set(item, 'a.b.c', 2);
     * >> { a: { b: { c: 2 } } }
     * */
    const set: <T extends Record<string, any>, P extends PathImpl<T, T>>(item: T, path: P, value: At<T, P>) => T;
}

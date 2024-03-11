type Primitive = null | undefined | string | number | boolean | symbol | bigint;
type IsTuple<T extends readonly any[]> = number extends T['length'] ? false : true;
type TupleKeys<T extends readonly any[]> = Exclude<keyof T, keyof any[]>;
type Join<A extends string | number, B> = B extends Primitive ? `${A}` : `${A}` | `${A}.${Path<B>}`;
type ArrayPathConcat<TKey extends string | number, TValue> = TValue extends Primitive ? never : TValue extends readonly (infer U)[] ? U extends Primitive ? never : `${TKey}` | `${TKey}.${ArrayPath<TValue>}` : `${TKey}.${ArrayPath<TValue>}`;
type ArrayPath<T> = T extends readonly (infer V)[] ? IsTuple<T> extends true ? {
    [K in TupleKeys<T>]-?: ArrayPathConcat<K & string, T[K]>;
}[TupleKeys<T>] : ArrayPathConcat<number, V> : {
    [K in keyof T]-?: ArrayPathConcat<K & string, T[K]>;
}[keyof T];
type UnionToIntersection<U> = (U extends never ? never : (arg: U) => never) extends (arg: infer I) => void ? I : never;
type UnionToTuple<T> = UnionToIntersection<T extends never ? never : (t: T) => T> extends (_: never) => infer W ? [...UnionToTuple<Exclude<T, W>>, W] : [];
/**
 * A type representing all paths in an object.
 *
 * @example
 * type T = { a: { b: { c: number } }, b: number };
 *
 * type P = Path<T>;
 * >> "a" | "a.b" | "a.b.c" | "b"
 * */
export type Path<T> = T extends readonly (infer V)[] ? IsTuple<T> extends true ? {
    [K in TupleKeys<T>]-?: Join<K & string, T[K]>;
}[TupleKeys<T>] : Join<number, V> : {
    [K in keyof T]-?: Join<K & string, T[K]>;
}[keyof T];
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
    type At<T, P extends Path<T> | ArrayPath<T>> = T extends any ? P extends `${infer K}.${infer R}` ? K extends keyof T ? R extends Path<T[K]> ? undefined extends T[K] ? At<T[K], R> | undefined : At<T[K], R> : never : K extends `${number}` ? T extends readonly (infer V)[] ? At<V, R & Path<V>> : never : never : P extends keyof T ? T[P] : P extends `${number}` ? T extends readonly (infer V)[] ? V : never : never : never;
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
    type List<T> = UnionToTuple<Path<T>>;
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
    type ListOf<T, R> = UnionToTuple<Of<T, R>>;
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
    type Of<T, R> = {
        [K in Path<T>]: At<T, K> extends R ? K : never;
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
    const get: <T extends Record<string, any>, P extends Path<T>>(item: T, path: P) => At<T, P>;
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
    const set: <T extends Record<string, any>, P extends Path<T>>(item: T, path: P, value: At<T, P>) => T;
}
export {};

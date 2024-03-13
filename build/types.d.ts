type Primitive = null | undefined | string | number | boolean | symbol | bigint;
type IsTuple<T extends readonly any[]> = number extends T['length'] ? false : true;
type TupleKey<T extends readonly any[]> = Exclude<keyof T, keyof any[]>;
type IsEqual<T1, T2> = T1 extends T2 ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2 ? true : false : false;
type AnyIsEqual<T1, T2> = T1 extends T2 ? IsEqual<T1, T2> extends true ? true : never : never;
type Join<K extends string | number, V, TraversedTypes> = V extends Primitive ? `${K}` : true extends AnyIsEqual<TraversedTypes, V> ? `${K}` : `${K}` | `${K}.${PathImpl<V, TraversedTypes | V>}`;
export type PathImpl<T, R = T> = T extends readonly (infer V)[] ? IsTuple<T> extends true ? {
    [K in TupleKey<T>]-?: Join<K & string, T[K], R>;
}[TupleKey<T>] : Join<number, V, R> : {
    [K in keyof T]-?: Join<K & string, T[K], R>;
}[keyof T];
export type AtImpl<T, P extends PathImpl<T>> = T extends any ? P extends `${infer K}.${infer R}` ? K extends keyof T ? R extends PathImpl<T[K]> ? undefined extends T[K] ? AtImpl<T[K], R> | undefined : AtImpl<T[K], R> : never : K extends `${number}` ? T extends readonly (infer V)[] ? AtImpl<V, R & PathImpl<V>> : never : never : P extends keyof T ? T[P] : P extends `${number}` ? T extends readonly (infer V)[] ? V : never : never : never;
type UnionToIntersection<U> = (U extends never ? never : (arg: U) => never) extends (arg: infer I) => void ? I : never;
export type ListImpl<T> = UnionToIntersection<T extends never ? never : (t: T) => T> extends (_: never) => infer W ? [...ListImpl<Exclude<T, W>>, W] : [];
export {};

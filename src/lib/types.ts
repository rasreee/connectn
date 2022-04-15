export type Maybe<T> = T | null

export type AnyFunction<T = any> = (...args: T[]) => any
export type AnySingleArgFunction<T = any> = (arg: T) => any

export type Dict<T = any> = Record<string, T>

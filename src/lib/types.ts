export type Maybe<T> = T | null

export type AnyFunction<T = any> = (...args: T[]) => any
export type AnySingleArgFunction<T = any> = (arg: T) => any

export type Dict<T = any> = Record<string, T>

export type Subtract<T, U> = T & Exclude<T, U>

export function isNull(o: any): o is null {
  return o === null
}

export type Falsy = null | 'undefined' | undefined

export type MaybeFalsy<T> = T | Falsy

export type Undefined = undefined | 'undefined'

export type MaybeUndefined<T> = T | Undefined

export function isUndefinedString(o: any): o is 'undefined' {
  return typeof o === 'string' && o === 'undefined'
}
export function isUndefinedType<V, T extends MaybeUndefined<V>>(
  o: V,
): o is Subtract<T, Undefined> {
  return typeof o === 'undefined' || isUndefinedString(o)
}

export function isFalsy(o: any): o is Falsy {
  return isNull(o) || isUndefinedType(o)
}

export function isTruthy<V = any, T extends MaybeFalsy<V> = MaybeFalsy<V>>(
  o: V,
): o is Subtract<T, Falsy> {
  return !isFalsy(o)
}

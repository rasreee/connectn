import { isTruthy } from './types'

export const maybeParse = (value: any) => {
  if (value === 'null') return null

  return typeof value === 'object' ? JSON.parse(value) : value
}

export const maybeStringify = (value: any) => {
  return typeof value === 'object' ? JSON.stringify(value) : value
}

export const getLocalStorageItem = <S>(key: string, defaultValue: S) => {
  const stickyValue = window.localStorage.getItem(key)

  if (isTruthy(stickyValue)) {
    return maybeParse(stickyValue)
  }

  return defaultValue
}

export const setLocalStorageJSON = (key: string, value: any) => {
  window.localStorage.setItem(key, maybeStringify(value))
}

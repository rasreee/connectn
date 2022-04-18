import { isTruthy } from './types'

export function getLocalStorageItem<S>(key: string, defaultValue: S) {
  const stickyValue = window.localStorage.getItem(key)

  if (isTruthy(stickyValue)) {
    return JSON.parse(stickyValue)
  }

  return defaultValue
}

export function setLocalStorageJSON(key: string, value: any) {
  window.localStorage.setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : value,
  )
}

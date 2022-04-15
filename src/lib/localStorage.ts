import React from 'react'

export const getLocalStorageItem = <S>(key: string, defaultValue: S) => {
  const stickyValue = window.localStorage.getItem(key)
  return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
}

export function useStickyState<S>(
  defaultValue: S,
  key: string,
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [value, setValue] = React.useState<S>(() =>
    getLocalStorageItem<S>(key, defaultValue),
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

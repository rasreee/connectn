import { useMemo, useRef } from 'react'

/**
 * Like `useRef`, but it returns immutable ref that contains actual value.
 *
 * @param value
 */
export const useSyncedRef = <T>(value: T): { readonly current: T } => {
  const _ref = useRef(value)

  _ref.current = value

  return useMemo(
    () =>
      Object.freeze({
        get current() {
          return _ref.current
        },
      }),
    [],
  )
}

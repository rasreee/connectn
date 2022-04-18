import { useMountedEffect } from 'hooks/useMountedEffect'
import { getLocalStorageItem, setLocalStorageJSON } from 'lib/localStorage'
import { isUndefinedString } from 'lib/types'
import React, { useEffect } from 'react'

import { useDebugStickyStateHook } from './helpers'

export type UseStickyStateResult<S> = {
  value: S
  set: React.Dispatch<React.SetStateAction<S>>
  isInitialized: boolean
}

export function useStickyState<S>(
  defaultValue: S,
  key: string,
): UseStickyStateResult<S> {
  const [value, set] = React.useState<S>(() =>
    getLocalStorageItem<S>(key, defaultValue),
  )

  // useEffect(() => {}, [])

  useMountedEffect(() => {
    if (!isUndefinedString(value)) {
      setLocalStorageJSON(key, value)
    }
  }, [value])

  const isInitialized = !isUndefinedString(value)

  useDebugStickyStateHook({ key, value })

  return { value, set, isInitialized }
}

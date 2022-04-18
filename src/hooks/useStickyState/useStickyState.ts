import { useMountedEffect } from 'hooks/useMountedEffect'
import { getLocalStorageItem, setLocalStorageJSON } from 'lib/localStorage'
import { isUndefinedString } from 'lib/types'
import React, { useState } from 'react'

import { useDebugStickyStateHook } from './helpers'

export function useStickyState<S>(
  defaultValue: S,
  key: string,
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [isInitialized, setIsInitialized] = useState(false)

  const [value, setValue] = React.useState<S>(() =>
    getLocalStorageItem<S>(key, defaultValue),
  )
  useMountedEffect(() => {
    if (!isInitialized) {
      if (isUndefinedString(value))
        return console.log('Tried to update but not initialized, aborting...')

      setIsInitialized(true)
    }

    setLocalStorageJSON(key, value)
  }, [value])

  useDebugStickyStateHook({ isInitialized, key, value })

  return [value, setValue]
}

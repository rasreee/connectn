import { useMountedEffect } from 'hooks/useMountedEffect'
import { isUndefinedString } from 'lib/types'

export function useDebugStickyStateHook<S>({
  key,
  value,
}: {
  key: string
  value: S
}) {
  useMountedEffect(() => {
    const isInitialized = !isUndefinedString(value)
    isInitialized && console.log('INITIALIZED:\n', { key, value })
  }, [value])

  useMountedEffect(() => {
    console.log('UPDATED:\n', { key, value })
  }, [value])
}

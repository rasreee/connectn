import { useMountedEffect } from 'hooks/useMountedEffect'

export function useDebugStickyStateHook<S>({
  isInitialized,
  key,
  value,
}: {
  isInitialized: boolean
  key: string
  value: S
}) {
  useMountedEffect(() => {
    console.log('INITIALIZED:\n', { key, value })
  }, [isInitialized])

  useMountedEffect(() => {
    isInitialized && console.log('UPDATED:\n', { key, value })
  }, [value, isInitialized])
}

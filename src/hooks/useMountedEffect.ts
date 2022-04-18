import { DependencyList, EffectCallback, useEffect } from 'react'

import { useIsMounted } from './useIsMounted'

export function useMountedEffect(
  effect: EffectCallback,
  dependencies: DependencyList = [],
) {
  const isMounted = useIsMounted()

  useEffect(() => {
    isMounted && effect()
  }, [isMounted, ...dependencies])
}

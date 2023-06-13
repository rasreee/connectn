import { useIfTruthy } from 'hooks/useIfTruthy'
import useStickyState from 'hooks/useStickyState'
import { GameSettings, SETTINGS_LOCAL_STORAGE_KEY } from 'lib/game'
import { useState } from 'react'

export const useSettings = () => {
  const persistedSettings = useStickyState<GameSettings | null>(
    null,
    SETTINGS_LOCAL_STORAGE_KEY,
  )

  const [settings, setSettings] = useState<GameSettings | null>(
    persistedSettings.value,
  )

  // Sync local with persisted state
  useIfTruthy(() => {
    setSettings(persistedSettings.value)
  }, persistedSettings.isInitialized && persistedSettings.value && !settings)

  const saveSettings = (data: GameSettings) => {
    persistedSettings.set(data.rememberSettings ? data : null)
  }

  return {
    persistedSettings,
    settings,
    setSettings,
    saveSettings,
  }
}

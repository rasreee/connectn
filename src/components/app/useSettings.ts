import useStickyState from 'hooks/useStickyState'
import { GameSettings, SETTINGS_LOCAL_STORAGE_KEY } from 'lib/game'
import { useState } from 'react'

export const useSettings = () => {
  const {
    value: persistedSettings,
    set: setPersistedSettings,
    isInitialized: isPersistedSettingsInitialized,
  } = useStickyState<GameSettings | null>(null, SETTINGS_LOCAL_STORAGE_KEY)

  const [settings, setSettings] = useState<GameSettings | null>(
    persistedSettings,
  )

  const saveSettings = (data: GameSettings) => {
    const newPersistedSettings = data.rememberSettings ? data : null
    setPersistedSettings(newPersistedSettings)
  }

  return {
    settings,
    setSettings,
    persistedSettings,
    setPersistedSettings,
    isPersistedSettingsInitialized,
    saveSettings,
  }
}

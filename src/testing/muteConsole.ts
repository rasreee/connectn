export const muteConsole = () => {
  global.console = (global as any).muteConsole()
}

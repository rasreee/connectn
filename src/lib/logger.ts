const initLogger = () => ({
  info: console.log,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (..._: any[]) => {};

const initMutedLogger = () => ({ info: noop });

export const logger =
  process.env.NODE_ENV === 'test' ? initMutedLogger() : initLogger();

/* eslint-disable @typescript-eslint/no-unused-vars */
const initLogger = () => ({
  info: console.log,
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (...args: any[]) => {};

const initMutedLogger = () => ({ info: noop });

export const logger =
  process.env.NODE_ENV === 'test' ? initMutedLogger() : initLogger();

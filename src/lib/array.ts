export function reversed<T = any>(arr: T[]): T[] {
  const cloned = arr.slice()
  return cloned.reverse()
}

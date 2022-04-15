import { Dict } from './types'

export const objectKeys = <T extends Dict>(obj: T) =>
  Object.keys(obj) as unknown as (keyof T)[]

export const updateWithJSON = <T extends Dict>(obj: T, data: T) => {
  objectKeys(data).forEach((key) => {
    obj[key] = data[key]
  })
}

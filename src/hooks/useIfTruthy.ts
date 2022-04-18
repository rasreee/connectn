import { isTruthy, MaybeFalsy } from 'lib/types'
import { useEffect } from 'react'

export const useIfTruthy = <Arg>(
  callback: (arg: Arg) => void,
  input: MaybeFalsy<Arg>,
) => {
  useEffect(() => {
    if (isTruthy(input)) {
      callback(input)
    }
  }, [input])
}

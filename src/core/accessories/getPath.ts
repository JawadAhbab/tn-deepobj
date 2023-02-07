import { isNumber, isString } from 'tn-validate'
import { Path, Userpath } from '../../accessories/Types'
import { getkey } from './getKey'

export const getPath = (path: Userpath) => {
  if (isString(path)) return path.split('.').map(getkey)
  if (isNumber(path)) return [path]
  return path as Path
}

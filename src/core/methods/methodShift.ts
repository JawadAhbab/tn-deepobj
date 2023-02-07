import { AnyObject } from 'tn-typescript'
import { Userpath } from '../../accessories/Types'
import { arrayControl } from './accessories/arrayControl'

export const methodShift = (object: AnyObject, userpath: Userpath, howmany = 1) => {
  return arrayControl(object, userpath, 'shift', howmany)
}

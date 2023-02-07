import { AnyObject } from 'tn-typescript'
import { Userpath } from '../../accessories/Types'
import { arrayControl } from './accessories/arrayControl'

export const methodPop = (object: AnyObject, userpath: Userpath, howmany = 1) => {
  return arrayControl(object, userpath, 'pop', howmany)
}

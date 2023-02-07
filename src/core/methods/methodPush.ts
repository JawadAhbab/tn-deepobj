import { AnyObject } from 'tn-typescript'
import { Userpath } from '../../accessories/Types'
import { arrayControl } from './accessories/arrayControl'

export const methodPush = (object: AnyObject, userpath: Userpath, ...items: any[]) => {
  return arrayControl(object, userpath, 'push', items)
}

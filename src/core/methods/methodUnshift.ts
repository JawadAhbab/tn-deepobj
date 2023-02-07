import { AnyObject } from 'tn-typescript'
import { Userpath } from '../../accessories/Types'
import { arrayControl } from './accessories/arrayControl'

export const methodUnshift = (object: AnyObject, userpath: Userpath, ...items: any[]) => {
  return arrayControl(object, userpath, 'unshift', items)
}

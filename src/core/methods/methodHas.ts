import { AnyObject } from 'tn-typescript'
import { Userpath } from '../../accessories/Types'
import { methodGet } from './methodGet'

export const methodHas = (object: AnyObject, ...userpaths: Userpath[]) => {
  let has = true

  userpaths.forEach(p => {
    has = has && methodGet(object, p) !== undefined
  })

  return has
}

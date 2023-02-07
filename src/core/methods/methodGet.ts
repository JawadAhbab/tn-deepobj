import { AnyObject } from 'tn-typescript'
import { isArrObject } from 'tn-validate'
import { Userpath } from '../../accessories/Types'
import { core } from '../core'

export const methodGet = (object: AnyObject, userpath: Userpath) => {
  return core({
    object,
    userpath,
    lastpath: (_obj, _prop, value) => value,
    otherpath: (_obj, _prop, value) => {
      if (isArrObject(value)) return {}
      return { return: true, retval: undefined }
    },
  })
}

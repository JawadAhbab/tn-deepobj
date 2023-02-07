import { AnyObject } from 'tn-typescript'
import { isArrObject } from 'tn-validate'
import { Userpath } from '../../accessories/Types'
import { core } from '../core'

export const methodDelete = (object: AnyObject, userpath: Userpath) => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop) => {
      delete obj[prop]
      return undefined
    },
    otherpath: (_obj, _prop, value) => {
      if (!isArrObject(value)) return { return: true, retval: undefined }
      return {}
    },
  })
}

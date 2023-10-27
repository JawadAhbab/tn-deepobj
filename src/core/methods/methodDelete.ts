import { AnyObject } from 'tn-typescript'
import { isArrObject, isArray } from 'tn-validate'
import { Userpath } from '../../accessories/Types'
import { core } from '../core'

export const methodDelete = (object: AnyObject, userpath: Userpath) => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop) => {
      if (isArray(obj)) obj.splice(prop as number, 1)
      else delete obj[prop]
      return undefined
    },
    otherpath: (_obj, _prop, value) => {
      if (!isArrObject(value)) return { return: true, retval: undefined }
      return {}
    },
  })
}

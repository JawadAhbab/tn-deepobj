import { AnyObject } from 'tn-typescript'
import { isFunction } from 'tn-validate'
import { Userpath } from '../../accessories/Types'
import { core } from '../core'
import { emptier } from './accessories/emptier'

export const methodSet = <T>(
  object: AnyObject,
  userpath: Userpath,
  newval: T | ((oldval: any) => T)
): T => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop, oldval) => {
      const setval = isFunction(newval) ? newval(oldval) : newval
      return (obj[prop] = setval)
    },
    otherpath: (obj, prop, value, nextprop) => {
      obj[prop] = emptier(nextprop, value).newval
      return {}
    },
  })
}

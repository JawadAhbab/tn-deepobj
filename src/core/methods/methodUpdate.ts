import { AnyObject } from 'tn-typescript'
import { isFunction } from 'tn-validate'
import { devconsole } from '../../accessories/devconsole'
import { isdev } from '../../accessories/isdev'
import { Userpath } from '../../accessories/Types'
import { core } from '../core'
import { emptier } from './accessories/emptier'

export const methodUpdate = <T>(
  object: AnyObject,
  userpath: Userpath,
  newval: T | ((oldval: any) => T)
): T | undefined => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop, oldval) => {
      if (oldval === undefined) {
        if (isdev) devconsole.mods.setters.when('update', prop, userpath)
        return oldval
      }
      const setval = isFunction(newval) ? newval(oldval) : newval
      return (obj[prop] = setval)
    },
    otherpath: (_obj, prop, value, nextprop) => {
      if (emptier(nextprop, value).changed) {
        if (isdev) devconsole.mods.setters.when('update', prop, userpath)
        return { return: true, retval: value }
      }
      return {}
    },
  })
}

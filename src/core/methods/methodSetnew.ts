import { AnyObject } from 'tn-typescript'
import { devconsole } from '../../accessories/devconsole'
import { isdev } from '../../accessories/isdev'
import { Userpath } from '../../accessories/Types'
import { core } from '../core'
import { emptier } from './accessories/emptier'

export const methodSetnew = (object: AnyObject, userpath: Userpath, newval: any) => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop, value) => {
      if (value !== undefined) {
        if (isdev) devconsole.mods.setters.when('setnew', prop, userpath)
        return value
      }
      obj[prop] = newval
      return newval
    },
    otherpath: (obj, prop, value, nextprop) => {
      obj[prop] = emptier(nextprop, value).newval
      return {}
    },
  })
}

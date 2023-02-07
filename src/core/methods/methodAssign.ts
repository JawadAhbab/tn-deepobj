import { mergeobj } from 'tn-mergeobj'
import { AnyObject } from 'tn-typescript'
import { isObject } from 'tn-validate'
import { devconsole } from '../../accessories/devconsole'
import { isdev } from '../../accessories/isdev'
import { Userpath } from '../../accessories/Types'
import { methodGet } from './methodGet'
import { methodSet } from './methodSet'

export const methodAssign = (
  object: AnyObject,
  userpath: Userpath,
  assigner: AnyObject,
  deep = true
) => {
  const oldobj: AnyObject = methodGet(object, userpath)

  if (!isObject(oldobj)) {
    if (isdev) devconsole.mods.objs(userpath, 'assign')
    return {}
  }

  return methodSet(object, userpath, mergeobj(deep, oldobj, assigner))
}

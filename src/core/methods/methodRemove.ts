import { AnyObject } from 'tn-typescript'
import { isObject } from 'tn-validate'
import { devconsole } from '../../accessories/devconsole'
import { isdev } from '../../accessories/isdev'
import { Userpath } from '../../accessories/Types'
import { methodDelete } from './methodDelete'
import { methodGet } from './methodGet'

export const methodRemove = (
  object: AnyObject,
  userpath: Userpath,
  ...props: (string | string[])[]
) => {
  const newobj: AnyObject = methodGet(object, userpath)

  if (!isObject(newobj)) {
    if (isdev) devconsole.mods.objs(userpath, 'remove')
    return {}
  }

  props.forEach(prop => {
    methodDelete(newobj, prop)
  })

  return newobj
}

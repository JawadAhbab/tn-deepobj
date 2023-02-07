import { AnyObject } from 'tn-typescript'
import { isArray } from 'tn-validate'
import { devconsole } from '../../../accessories/devconsole'
import { isdev } from '../../../accessories/isdev'
import { Userpath } from '../../../accessories/Types'
import { methodGet } from '../methodGet'
import { methodSet } from '../methodSet'

export const arrayControl = (
  object: AnyObject,
  userpath: Userpath,
  method: 'push' | 'unshift' | 'pop' | 'shift',
  query: any
) => {
  const array: any[] = methodGet(object, userpath)

  if (!isArray(array)) {
    if (isdev) devconsole.mods.array(userpath, method)
    return []
  }

  if (method === 'push') array.push(...query)
  else if (method === 'unshift') array.unshift(...query)
  else if (method === 'pop') {
    const howmany = query as number
    for (let i = 0; i < howmany; i++) array.pop()
  } else if (method === 'shift') {
    const howmany = query as number
    for (let i = 0; i < howmany; i++) array.shift()
  }

  return methodSet(object, userpath, array)
}

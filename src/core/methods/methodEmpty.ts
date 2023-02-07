import { AnyObject } from 'tn-typescript'
import { isArray, isObject, isString } from 'tn-validate'
import { Userpath } from '../../accessories/Types'
import { methodGet } from './methodGet'
import { methodSet } from './methodSet'

export const methodEmpty = (object: AnyObject, userpath: Userpath): {} | [] | null | '' => {
  let value: any = methodGet(object, userpath)

  if (isObject(value)) value = {}
  else if (isArray(value)) value = []
  else if (isString(value)) value = ''
  else value = null

  return methodSet(object, userpath, value)
}

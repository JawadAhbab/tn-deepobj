import { methodAssign } from './core/methods/methodAssign'
import { methodDelete } from './core/methods/methodDelete'
import { methodEmpty } from './core/methods/methodEmpty'
import { methodGet } from './core/methods/methodGet'
import { methodHas } from './core/methods/methodHas'
import { methodPop } from './core/methods/methodPop'
import { methodPush } from './core/methods/methodPush'
import { methodRemove } from './core/methods/methodRemove'
import { methodSet } from './core/methods/methodSet'
import { methodSetnew } from './core/methods/methodSetnew'
import { methodShift } from './core/methods/methodShift'
import { methodUnshift } from './core/methods/methodUnshift'
import { methodUpdate } from './core/methods/methodUpdate'

export const deepobj = {
  set: methodSet,
  setnew: methodSetnew,
  update: methodUpdate,
  get: methodGet,
  push: methodPush,
  unshift: methodUnshift,
  pop: methodPop,
  shift: methodShift,
  assign: methodAssign,
  remove: methodRemove,
  has: methodHas,
  empty: methodEmpty,
  delete: methodDelete,
}

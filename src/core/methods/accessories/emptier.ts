import { isArray, isObject, isString } from 'tn-validate'
import { Prop } from '../../../accessories/Types'
type Return = { newval: any; changed: boolean }

export const emptier = (nextprop: Prop, value: any): Return => {
  const ret: Return = { newval: value, changed: false }

  if (isString(nextprop)) {
    if (!isObject(value)) {
      ret.newval = {}
      ret.changed = true
    }
  } else {
    if (!isArray(value)) {
      ret.newval = []
      ret.changed = true
    }
  }

  return ret
}

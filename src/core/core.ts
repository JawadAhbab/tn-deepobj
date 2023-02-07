import { AnyObject } from 'tn-typescript'
import { Corelp, Coreop, Userpath } from '../accessories/Types'
import { getPath } from './accessories/getPath'
interface CoreProps {
  object: AnyObject
  userpath: Userpath
  lastpath: Corelp
  otherpath: Coreop
}

export const core = ({ object, userpath, lastpath, otherpath }: CoreProps) => {
  const path = getPath(userpath)
  const property = path[0]
  const currentval: any = object[property]

  if (path.length === 1) return lastpath(object, property, currentval)
  const nonext = otherpath(object, property, currentval, path[1])
  if (nonext.return) return nonext.retval

  return core({
    object: object[property],
    userpath: path.slice(1),
    lastpath,
    otherpath,
  })
}

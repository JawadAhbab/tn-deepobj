import { consoler } from 'tn-consoler'
import { Prop, Userpath } from './Types'
import { getPath } from '../core/accessories/getPath'

export const devconsole = {
  mods: {
    setters: {
      when(type: 'update' | 'setnew', prop: Prop, userpath: Userpath) {
        const title = type === 'update' ? 'Unknown property' : 'Property exists'
        const warn =
          type === 'update'
            ? 'Object does not contain the property'
            : 'Object must not contain the property'

        let match = false
        let path: any = getPath(userpath).map(val => {
          if (val === prop) match = true
          if (match) return `{red+b:${val}}`
          else return `{green+b:${val}}`
        })
        path = path.join('{grey+b: > }')

        consoler.groupCollapsed(`{bgyellow:warning} 
        {b:deepobj}{orange+b:.}{yellow+b:${type}}{b:()}
        {grey+b:>} {yellow+b:${title}}`)
        consoler.log(`{b:Error} : ${warn}`)
        consoler.log(`{b:Path} : ${path}`)
        consoler.groupEnd(true)
      },
    },
    array(userpath: Userpath, method: string) {
      const path = getPath(userpath)
        .map(val => `{green+b:${val}}`)
        .join('{grey+b: > }')

      consoler.groupCollapsed(`{bgred:warning} 
      {b:deepobj}{orange+b:.}{yellow+b:${method}}{b:()}
      {grey+b:>} {red+b:Array required}`)
      consoler.log('{b:Error} : Path value must be an {cyan+b:Array}')
      consoler.log(`{b:Path} : ${path}`)
      consoler.groupEnd(true)
    },
    objs(userpath: Userpath, method: string) {
      let path: any = getPath(userpath).map(val => `{green+b:${val}}`)
      path = path.join('{grey+b: > }')

      consoler.groupCollapsed(`{bgred:warning} 
      {b:deepobj}{orange+b:.}{yellow+b:${method}}{b:()}
      {grey+b:>} {red+b:Object required}`)
      consoler.log('{b:Error} : Path value must be an {cyan+b:Object}')
      consoler.log(`{b:Path} : ${path}`)
      consoler.groupEnd(true)
    },
  },
}

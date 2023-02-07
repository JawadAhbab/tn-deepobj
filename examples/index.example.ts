import { deepobj } from '../src/index'

let obj = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: {
    f: {
      g: true,
      h: true
    }
  }
}

console.log(deepobj.has(obj, 'e.f.g', 'd'));

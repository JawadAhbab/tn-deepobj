<p align="center"><i>Bundle Size - 1.28 Kb gzipped</i></p>

### Methods

```ts
deepobj.has(obj, ...paths)
deepobj.get(obj, path)
deepobj.set(obj, path, value)
deepobj.setnew(obj, path, value)
deepobj.update(obj, path, value)
deepobj.delete(obj, path)
deepobj.empty(obj, path)
deepobj.push(obj, path, ...items)
deepobj.unshift(obj, path, ...items)
deepobj.pop(obj, path, howmany?)
deepobj.shift(obj, path, howmany?)
deepobj.assign(obj, path, { prop: value }, deep?)
deepobj.remove(obj, path, ...prop)
```

### Setters

- `set()` It is strict. Can create or mutate any property.
- `setnew()` It can not mutate pre existed property. Can create a new one.
- `update()` It can not create new property. Can mutate existed one.

### Dynamic setters

- `set()`
- `update()`

```ts
deepobj.set(obj, path, function (preval) {
  return ++preval
})

deepobj.set(obj, path, function () {
  return function () {}
})
```

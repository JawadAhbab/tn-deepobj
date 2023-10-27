'use strict';

var tnMergeobj = require('tn-mergeobj');
var tnValidate = require('tn-validate');
var tnConsoler = require('tn-consoler');
const getkey = key => {
  const intkey = parseInt(key);
  if (intkey.toString() === key) return intkey;
  return key;
};
const getPath = path => {
  if (tnValidate.isString(path)) return path.split('.').map(getkey);
  if (tnValidate.isNumber(path)) return [path];
  return path;
};
const devconsole = {
  mods: {
    setters: {
      when(type, prop, userpath) {
        const title = type === 'update' ? 'Unknown property' : 'Property exists';
        const warn = type === 'update' ? 'Object does not contain the property' : 'Object must not contain the property';
        let match = false;
        let path = getPath(userpath).map(val => {
          if (val === prop) match = true;
          if (match) return `{red+b:${val}}`;else return `{green+b:${val}}`;
        });
        path = path.join('{grey+b: > }');
        tnConsoler.consoler.groupCollapsed(`{bgyellow:warning} 
        {b:deepobj}{orange+b:.}{yellow+b:${type}}{b:()}
        {grey+b:>} {yellow+b:${title}}`);
        tnConsoler.consoler.log(`{b:Error} : ${warn}`);
        tnConsoler.consoler.log(`{b:Path} : ${path}`);
        tnConsoler.consoler.groupEnd(true);
      }
    },
    array(userpath, method) {
      const path = getPath(userpath).map(val => `{green+b:${val}}`).join('{grey+b: > }');
      tnConsoler.consoler.groupCollapsed(`{bgred:warning} 
      {b:deepobj}{orange+b:.}{yellow+b:${method}}{b:()}
      {grey+b:>} {red+b:Array required}`);
      tnConsoler.consoler.log('{b:Error} : Path value must be an {cyan+b:Array}');
      tnConsoler.consoler.log(`{b:Path} : ${path}`);
      tnConsoler.consoler.groupEnd(true);
    },
    objs(userpath, method) {
      let path = getPath(userpath).map(val => `{green+b:${val}}`);
      path = path.join('{grey+b: > }');
      tnConsoler.consoler.groupCollapsed(`{bgred:warning} 
      {b:deepobj}{orange+b:.}{yellow+b:${method}}{b:()}
      {grey+b:>} {red+b:Object required}`);
      tnConsoler.consoler.log('{b:Error} : Path value must be an {cyan+b:Object}');
      tnConsoler.consoler.log(`{b:Path} : ${path}`);
      tnConsoler.consoler.groupEnd(true);
    }
  }
};
const isdev = process.env.NODE_ENV === 'development';
const core = _ref => {
  let {
    object,
    userpath,
    lastpath,
    otherpath
  } = _ref;
  const path = getPath(userpath);
  const property = path[0];
  const currentval = object[property];
  if (path.length === 1) return lastpath(object, property, currentval);
  const nonext = otherpath(object, property, currentval, path[1]);
  if (nonext.return) return nonext.retval;
  return core({
    object: object[property],
    userpath: path.slice(1),
    lastpath,
    otherpath
  });
};
const methodGet = (object, userpath) => {
  return core({
    object,
    userpath,
    lastpath: (_obj, _prop, value) => value,
    otherpath: (_obj, _prop, value) => {
      if (tnValidate.isArrObject(value)) return {};
      return {
        return: true,
        retval: undefined
      };
    }
  });
};
const emptier = (nextprop, value) => {
  const ret = {
    newval: value,
    changed: false
  };
  if (tnValidate.isString(nextprop)) {
    if (!tnValidate.isObject(value)) {
      ret.newval = {};
      ret.changed = true;
    }
  } else {
    if (!tnValidate.isArray(value)) {
      ret.newval = [];
      ret.changed = true;
    }
  }
  return ret;
};
const methodSet = (object, userpath, newval) => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop, oldval) => {
      const setval = tnValidate.isFunction(newval) ? newval(oldval) : newval;
      return obj[prop] = setval;
    },
    otherpath: (obj, prop, value, nextprop) => {
      obj[prop] = emptier(nextprop, value).newval;
      return {};
    }
  });
};
const methodAssign = function (object, userpath, assigner) {
  let deep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  const oldobj = methodGet(object, userpath);
  if (!tnValidate.isObject(oldobj)) {
    if (isdev) devconsole.mods.objs(userpath, 'assign');
    return {};
  }
  return methodSet(object, userpath, tnMergeobj.mergeobj(deep, oldobj, assigner));
};
const methodDelete = (object, userpath) => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop) => {
      if (tnValidate.isArray(obj)) obj.splice(prop, 1);else delete obj[prop];
      return undefined;
    },
    otherpath: (_obj, _prop, value) => {
      if (!tnValidate.isArrObject(value)) return {
        return: true,
        retval: undefined
      };
      return {};
    }
  });
};
const methodEmpty = (object, userpath) => {
  let value = methodGet(object, userpath);
  if (tnValidate.isObject(value)) value = {};else if (tnValidate.isArray(value)) value = [];else if (tnValidate.isString(value)) value = '';else value = null;
  return methodSet(object, userpath, value);
};
const methodHas = function (object) {
  let has = true;
  for (var _len = arguments.length, userpaths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    userpaths[_key - 1] = arguments[_key];
  }
  userpaths.forEach(p => {
    has = has && methodGet(object, p) !== undefined;
  });
  return has;
};
const arrayControl = (object, userpath, method, query) => {
  const array = methodGet(object, userpath);
  if (!tnValidate.isArray(array)) {
    if (isdev) devconsole.mods.array(userpath, method);
    return [];
  }
  if (method === 'push') array.push(...query);else if (method === 'unshift') array.unshift(...query);else if (method === 'pop') {
    const howmany = query;
    for (let i = 0; i < howmany; i++) array.pop();
  } else if (method === 'shift') {
    const howmany = query;
    for (let i = 0; i < howmany; i++) array.shift();
  }
  return methodSet(object, userpath, array);
};
const methodPop = function (object, userpath) {
  let howmany = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return arrayControl(object, userpath, 'pop', howmany);
};
const methodPush = function (object, userpath) {
  for (var _len2 = arguments.length, items = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    items[_key2 - 2] = arguments[_key2];
  }
  return arrayControl(object, userpath, 'push', items);
};
const methodRemove = function (object, userpath) {
  const newobj = methodGet(object, userpath);
  if (!tnValidate.isArrObject(newobj)) {
    if (isdev) devconsole.mods.objs(userpath, 'remove');
    return {};
  }
  for (var _len3 = arguments.length, props = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    props[_key3 - 2] = arguments[_key3];
  }
  props.forEach(prop => methodDelete(newobj, prop));
  return newobj;
};
const methodSetnew = (object, userpath, newval) => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop, value) => {
      if (value !== undefined) {
        if (isdev) devconsole.mods.setters.when('setnew', prop, userpath);
        return value;
      }
      obj[prop] = newval;
      return newval;
    },
    otherpath: (obj, prop, value, nextprop) => {
      obj[prop] = emptier(nextprop, value).newval;
      return {};
    }
  });
};
const methodShift = function (object, userpath) {
  let howmany = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return arrayControl(object, userpath, 'shift', howmany);
};
const methodUnshift = function (object, userpath) {
  for (var _len4 = arguments.length, items = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    items[_key4 - 2] = arguments[_key4];
  }
  return arrayControl(object, userpath, 'unshift', items);
};
const methodUpdate = (object, userpath, newval) => {
  return core({
    object,
    userpath,
    lastpath: (obj, prop, oldval) => {
      if (oldval === undefined) {
        if (isdev) devconsole.mods.setters.when('update', prop, userpath);
        return oldval;
      }
      const setval = tnValidate.isFunction(newval) ? newval(oldval) : newval;
      return obj[prop] = setval;
    },
    otherpath: (_obj, prop, value, nextprop) => {
      if (emptier(nextprop, value).changed) {
        if (isdev) devconsole.mods.setters.when('update', prop, userpath);
        return {
          return: true,
          retval: value
        };
      }
      return {};
    }
  });
};
const deepobj = {
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
  delete: methodDelete
};
exports.deepobj = deepobj;

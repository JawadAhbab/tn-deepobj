import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { mergeobj } from 'tn-mergeobj';
import { isString, isNumber, isArrObject, isObject, isArray, isFunction } from 'tn-validate';
import { consoler } from 'tn-consoler';

var getkey = function getkey(key) {
  var intkey = parseInt(key);
  if (intkey.toString() === key) return intkey;
  return key;
};

var getPath = function getPath(path) {
  if (isString(path)) return path.split('.').map(getkey);
  if (isNumber(path)) return [path];
  return path;
};

var devconsole = {
  mods: {
    setters: {
      when: function when(type, prop, userpath) {
        var title = type === 'update' ? 'Unknown property' : 'Property exists';
        var warn = type === 'update' ? 'Object does not contain the property' : 'Object must not contain the property';
        var match = false;
        var path = getPath(userpath).map(function (val) {
          if (val === prop) match = true;
          if (match) return "{red+b:".concat(val, "}");else return "{green+b:".concat(val, "}");
        });
        path = path.join('{grey+b: > }');
        consoler.groupCollapsed("{bgyellow:warning} \n        {b:deepobj}{orange+b:.}{yellow+b:".concat(type, "}{b:()}\n        {grey+b:>} {yellow+b:").concat(title, "}"));
        consoler.log("{b:Error} : ".concat(warn));
        consoler.log("{b:Path} : ".concat(path));
        consoler.groupEnd(true);
      }
    },
    array: function array(userpath, method) {
      var path = getPath(userpath).map(function (val) {
        return "{green+b:".concat(val, "}");
      }).join('{grey+b: > }');
      consoler.groupCollapsed("{bgred:warning} \n      {b:deepobj}{orange+b:.}{yellow+b:".concat(method, "}{b:()}\n      {grey+b:>} {red+b:Array required}"));
      consoler.log('{b:Error} : Path value must be an {cyan+b:Array}');
      consoler.log("{b:Path} : ".concat(path));
      consoler.groupEnd(true);
    },
    objs: function objs(userpath, method) {
      var path = getPath(userpath).map(function (val) {
        return "{green+b:".concat(val, "}");
      });
      path = path.join('{grey+b: > }');
      consoler.groupCollapsed("{bgred:warning} \n      {b:deepobj}{orange+b:.}{yellow+b:".concat(method, "}{b:()}\n      {grey+b:>} {red+b:Object required}"));
      consoler.log('{b:Error} : Path value must be an {cyan+b:Object}');
      consoler.log("{b:Path} : ".concat(path));
      consoler.groupEnd(true);
    }
  }
};
var isdev = process.env.NODE_ENV === 'development';

var core = function core(_ref) {
  var object = _ref.object,
      userpath = _ref.userpath,
      lastpath = _ref.lastpath,
      otherpath = _ref.otherpath;
  var path = getPath(userpath);
  var property = path[0];
  var currentval = object[property];
  if (path.length === 1) return lastpath(object, property, currentval);
  var nonext = otherpath(object, property, currentval, path[1]);
  if (nonext.return) return nonext.retval;
  return core({
    object: object[property],
    userpath: path.slice(1),
    lastpath: lastpath,
    otherpath: otherpath
  });
};

var methodGet = function methodGet(object, userpath) {
  return core({
    object: object,
    userpath: userpath,
    lastpath: function lastpath(_obj, _prop, value) {
      return value;
    },
    otherpath: function otherpath(_obj, _prop, value) {
      if (isArrObject(value)) return {};
      return {
        return: true,
        retval: undefined
      };
    }
  });
};

var emptier = function emptier(nextprop, value) {
  var ret = {
    newval: value,
    changed: false
  };

  if (isString(nextprop)) {
    if (!isObject(value)) {
      ret.newval = {};
      ret.changed = true;
    }
  } else {
    if (!isArray(value)) {
      ret.newval = [];
      ret.changed = true;
    }
  }

  return ret;
};

var methodSet = function methodSet(object, userpath, newval) {
  return core({
    object: object,
    userpath: userpath,
    lastpath: function lastpath(obj, prop, oldval) {
      var setval = isFunction(newval) ? newval(oldval) : newval;
      return obj[prop] = setval;
    },
    otherpath: function otherpath(obj, prop, value, nextprop) {
      obj[prop] = emptier(nextprop, value).newval;
      return {};
    }
  });
};

var methodAssign = function methodAssign(object, userpath, assigner) {
  var deep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var oldobj = methodGet(object, userpath);

  if (!isObject(oldobj)) {
    if (isdev) devconsole.mods.objs(userpath, 'assign');
    return {};
  }

  return methodSet(object, userpath, mergeobj(deep, oldobj, assigner));
};

var methodDelete = function methodDelete(object, userpath) {
  return core({
    object: object,
    userpath: userpath,
    lastpath: function lastpath(obj, prop) {
      delete obj[prop];
      return undefined;
    },
    otherpath: function otherpath(_obj, _prop, value) {
      if (!isArrObject(value)) return {
        return: true,
        retval: undefined
      };
      return {};
    }
  });
};

var methodEmpty = function methodEmpty(object, userpath) {
  var value = methodGet(object, userpath);
  if (isObject(value)) value = {};else if (isArray(value)) value = [];else if (isString(value)) value = '';else value = null;
  return methodSet(object, userpath, value);
};

var methodHas = function methodHas(object) {
  var has = true;

  for (var _len = arguments.length, userpaths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    userpaths[_key - 1] = arguments[_key];
  }

  userpaths.forEach(function (p) {
    has = has && methodGet(object, p) !== undefined;
  });
  return has;
};

var arrayControl = function arrayControl(object, userpath, method, query) {
  var array = methodGet(object, userpath);

  if (!isArray(array)) {
    if (isdev) devconsole.mods.array(userpath, method);
    return [];
  }

  if (method === 'push') array.push.apply(array, _toConsumableArray(query));else if (method === 'unshift') array.unshift.apply(array, _toConsumableArray(query));else if (method === 'pop') {
    var howmany = query;

    for (var i = 0; i < howmany; i++) {
      array.pop();
    }
  } else if (method === 'shift') {
    var _howmany = query;

    for (var _i = 0; _i < _howmany; _i++) {
      array.shift();
    }
  }
  return methodSet(object, userpath, array);
};

var methodPop = function methodPop(object, userpath) {
  var howmany = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return arrayControl(object, userpath, 'pop', howmany);
};

var methodPush = function methodPush(object, userpath) {
  for (var _len2 = arguments.length, items = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    items[_key2 - 2] = arguments[_key2];
  }

  return arrayControl(object, userpath, 'push', items);
};

var methodRemove = function methodRemove(object, userpath) {
  var newobj = methodGet(object, userpath);

  if (!isObject(newobj)) {
    if (isdev) devconsole.mods.objs(userpath, 'remove');
    return {};
  }

  for (var _len3 = arguments.length, props = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    props[_key3 - 2] = arguments[_key3];
  }

  props.forEach(function (prop) {
    methodDelete(newobj, prop);
  });
  return newobj;
};

var methodSetnew = function methodSetnew(object, userpath, newval) {
  return core({
    object: object,
    userpath: userpath,
    lastpath: function lastpath(obj, prop, value) {
      if (value !== undefined) {
        if (isdev) devconsole.mods.setters.when('setnew', prop, userpath);
        return value;
      }

      obj[prop] = newval;
      return newval;
    },
    otherpath: function otherpath(obj, prop, value, nextprop) {
      obj[prop] = emptier(nextprop, value).newval;
      return {};
    }
  });
};

var methodShift = function methodShift(object, userpath) {
  var howmany = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return arrayControl(object, userpath, 'shift', howmany);
};

var methodUnshift = function methodUnshift(object, userpath) {
  for (var _len4 = arguments.length, items = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    items[_key4 - 2] = arguments[_key4];
  }

  return arrayControl(object, userpath, 'unshift', items);
};

var methodUpdate = function methodUpdate(object, userpath, newval) {
  return core({
    object: object,
    userpath: userpath,
    lastpath: function lastpath(obj, prop, oldval) {
      if (oldval === undefined) {
        if (isdev) devconsole.mods.setters.when('update', prop, userpath);
        return oldval;
      }

      var setval = isFunction(newval) ? newval(oldval) : newval;
      return obj[prop] = setval;
    },
    otherpath: function otherpath(_obj, prop, value, nextprop) {
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

var deepobj = {
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
export { deepobj };

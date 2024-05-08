import "./chunk-UXIASGQL.js";

// node_modules/good-storage/dist/storage.esm.js
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var isServer = typeof window === "undefined";
var store = {
  /* eslint-disable no-undef */
  version: "1.1.1",
  storage: !isServer ? window.localStorage : null,
  session: {
    storage: !isServer ? window.sessionStorage : null
  }
};
var api = {
  set: function set(key, val) {
    if (this.disabled) {
      return;
    }
    if (val === void 0) {
      return this.remove(key);
    }
    this.storage.setItem(key, serialize(val));
    return val;
  },
  get: function get(key, def) {
    if (this.disabled) {
      return def;
    }
    var val = deserialize(this.storage.getItem(key));
    return val === void 0 ? def : val;
  },
  has: function has(key) {
    return this.get(key) !== void 0;
  },
  remove: function remove(key) {
    if (this.disabled) {
      return;
    }
    this.storage.removeItem(key);
  },
  clear: function clear() {
    if (this.disabled) {
      return;
    }
    this.storage.clear();
  },
  getAll: function getAll() {
    if (this.disabled) {
      return null;
    }
    var ret = {};
    this.forEach(function(key, val) {
      ret[key] = val;
    });
    return ret;
  },
  forEach: function forEach(callback) {
    if (this.disabled) {
      return;
    }
    for (var i = 0; i < this.storage.length; i++) {
      var key = this.storage.key(i);
      callback(key, this.get(key));
    }
  }
};
_extends(store, api);
_extends(store.session, api);
function serialize(val) {
  return JSON.stringify(val);
}
function deserialize(val) {
  if (typeof val !== "string") {
    return void 0;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || void 0;
  }
}
try {
  testKey = "__storejs__";
  store.set(testKey, testKey);
  if (store.get(testKey) !== testKey) {
    store.disabled = true;
  }
  store.remove(testKey);
} catch (e) {
  store.disabled = true;
}
var testKey;
var storage_esm_default = store;
export {
  storage_esm_default as default
};
//# sourceMappingURL=good-storage.js.map

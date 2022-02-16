var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global$10 = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

var global$$ = global$10;
var path$1 = global$$;

var fails$t = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$s = fails$t;
var functionBindNative = !fails$s(function () {
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;
var FunctionPrototype$2 = Function.prototype;
var bind$8 = FunctionPrototype$2.bind;
var call$n = FunctionPrototype$2.call;
var uncurryThis$w = NATIVE_BIND$3 && bind$8.bind(call$n, call$n);
var functionUncurryThis = NATIVE_BIND$3 ? function (fn) {
  return fn && uncurryThis$w(fn);
} : function (fn) {
  return fn && function () {
    return call$n.apply(fn, arguments);
  };
};

var global$_ = global$10;
var TypeError$k = global$_.TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$8 = function (it) {
  if (it == undefined) throw TypeError$k("Can't call method on " + it);
  return it;
};

var global$Z = global$10;
var requireObjectCoercible$7 = requireObjectCoercible$8;
var Object$6 = global$Z.Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$9 = function (argument) {
  return Object$6(requireObjectCoercible$7(argument));
};

var uncurryThis$v = functionUncurryThis;
var toObject$8 = toObject$9;
var hasOwnProperty = uncurryThis$v({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$8(it), key);
};

var wellKnownSymbolWrapped = {};

var shared$4 = {exports: {}};

var isPure = false;

var global$Y = global$10; // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty$7 = Object.defineProperty;

var setGlobal$3 = function (key, value) {
  try {
    defineProperty$7(global$Y, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global$Y[key] = value;
  }

  return value;
};

var global$X = global$10;
var setGlobal$2 = setGlobal$3;
var SHARED = '__core-js_shared__';
var store$3 = global$X[SHARED] || setGlobal$2(SHARED, {});
var sharedStore = store$3;

var store$2 = sharedStore;
(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.21.0',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.21.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var uncurryThis$u = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString$b = uncurryThis$u(1.0.toString);

var uid$4 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$b(++id + postfix, 36);
};

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$o = function (argument) {
  return typeof argument == 'function';
};

var global$W = global$10;
var isCallable$n = isCallable$o;

var aFunction = function (argument) {
  return isCallable$n(argument) ? argument : undefined;
};

var getBuiltIn$c = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$W[namespace]) : global$W[namespace] && global$W[namespace][method];
};

var getBuiltIn$b = getBuiltIn$c;
var engineUserAgent = getBuiltIn$b('navigator', 'userAgent') || '';

var global$V = global$10;
var userAgent$3 = engineUserAgent;
var process$1 = global$V.process;
var Deno = global$V.Deno;
var versions = process$1 && process$1.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = engineV8Version;
var fails$r = fails$t; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$r(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var global$U = global$10;
var shared$3 = shared$4.exports;
var hasOwn$i = hasOwnProperty_1;
var uid$3 = uid$4;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var WellKnownSymbolsStore = shared$3('wks');
var Symbol$1 = global$U.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;

var wellKnownSymbol$o = function (name) {
  if (!hasOwn$i(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn$i(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID$1 && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

var wellKnownSymbol$n = wellKnownSymbol$o;
wellKnownSymbolWrapped.f = wellKnownSymbol$n;

var objectDefineProperty = {};

var fails$q = fails$t; // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$q(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

var isCallable$m = isCallable$o;

var isObject$f = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$m(it);
};

var global$T = global$10;
var isObject$e = isObject$f;
var document$1 = global$T.document; // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$e(document$1) && isObject$e(document$1.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$d = descriptors;
var fails$p = fails$t;
var createElement$1 = documentCreateElement$2; // Thanks to IE8 for its funny defineProperty

var ie8DomDefine = !DESCRIPTORS$d && !fails$p(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

var DESCRIPTORS$c = descriptors;
var fails$o = fails$t; // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334

var v8PrototypeDefineBug = DESCRIPTORS$c && fails$o(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var global$S = global$10;
var isObject$d = isObject$f;
var String$6 = global$S.String;
var TypeError$j = global$S.TypeError; // `Assert: Type(argument) is Object`

var anObject$h = function (argument) {
  if (isObject$d(argument)) return argument;
  throw TypeError$j(String$6(argument) + ' is not an object');
};

var NATIVE_BIND$2 = functionBindNative;
var call$m = Function.prototype.call;
var functionCall = NATIVE_BIND$2 ? call$m.bind(call$m) : function () {
  return call$m.apply(call$m, arguments);
};

var uncurryThis$t = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$t({}.isPrototypeOf);

var global$R = global$10;
var getBuiltIn$a = getBuiltIn$c;
var isCallable$l = isCallable$o;
var isPrototypeOf$7 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var Object$5 = global$R.Object;
var isSymbol$4 = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$a('Symbol');
  return isCallable$l($Symbol) && isPrototypeOf$7($Symbol.prototype, Object$5(it));
};

var global$Q = global$10;
var String$5 = global$Q.String;

var tryToString$5 = function (argument) {
  try {
    return String$5(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$P = global$10;
var isCallable$k = isCallable$o;
var tryToString$4 = tryToString$5;
var TypeError$i = global$P.TypeError; // `Assert: IsCallable(argument) is true`

var aCallable$7 = function (argument) {
  if (isCallable$k(argument)) return argument;
  throw TypeError$i(tryToString$4(argument) + ' is not a function');
};

var aCallable$6 = aCallable$7; // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$6 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$6(func);
};

var global$O = global$10;
var call$l = functionCall;
var isCallable$j = isCallable$o;
var isObject$c = isObject$f;
var TypeError$h = global$O.TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$j(fn = input.toString) && !isObject$c(val = call$l(fn, input))) return val;
  if (isCallable$j(fn = input.valueOf) && !isObject$c(val = call$l(fn, input))) return val;
  if (pref !== 'string' && isCallable$j(fn = input.toString) && !isObject$c(val = call$l(fn, input))) return val;
  throw TypeError$h("Can't convert object to primitive value");
};

var global$N = global$10;
var call$k = functionCall;
var isObject$b = isObject$f;
var isSymbol$3 = isSymbol$4;
var getMethod$5 = getMethod$6;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$m = wellKnownSymbol$o;
var TypeError$g = global$N.TypeError;
var TO_PRIMITIVE = wellKnownSymbol$m('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$b(input) || isSymbol$3(input)) return input;
  var exoticToPrim = getMethod$5(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$k(exoticToPrim, input, pref);
    if (!isObject$b(result) || isSymbol$3(result)) return result;
    throw TypeError$g("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$2 = isSymbol$4; // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$4 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$2(key) ? key : key + '';
};

var global$M = global$10;
var DESCRIPTORS$b = descriptors;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$g = anObject$h;
var toPropertyKey$3 = toPropertyKey$4;
var TypeError$f = global$M.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$b ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$g(O);
  P = toPropertyKey$3(P);
  anObject$g(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor$1(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$g(O);
  P = toPropertyKey$3(P);
  anObject$g(Attributes);
  if (IE8_DOM_DEFINE$1) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError$f('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var path = path$1;
var hasOwn$h = hasOwnProperty_1;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineProperty$6 = objectDefineProperty.f;

var defineWellKnownSymbol$1 = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn$h(Symbol, NAME)) defineProperty$6(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

var defineWellKnownSymbol = defineWellKnownSymbol$1; // `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall

defineWellKnownSymbol('matchAll');

var objectGetOwnPropertyDescriptor = {};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$9 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var uncurryThis$s = functionUncurryThis;
var toString$a = uncurryThis$s({}.toString);
var stringSlice$8 = uncurryThis$s(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$8(toString$a(it), 8, -1);
};

var global$L = global$10;
var uncurryThis$r = functionUncurryThis;
var fails$n = fails$t;
var classof$d = classofRaw$1;
var Object$4 = global$L.Object;
var split$3 = uncurryThis$r(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$n(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$d(it) == 'String' ? split$3(it, '') : Object$4(it);
} : Object$4;

var IndexedObject$2 = indexedObject;
var requireObjectCoercible$6 = requireObjectCoercible$8;

var toIndexedObject$6 = function (it) {
  return IndexedObject$2(requireObjectCoercible$6(it));
};

var DESCRIPTORS$a = descriptors;
var call$j = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$8 = createPropertyDescriptor$9;
var toIndexedObject$5 = toIndexedObject$6;
var toPropertyKey$2 = toPropertyKey$4;
var hasOwn$g = hasOwnProperty_1;
var IE8_DOM_DEFINE = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$5(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn$g(O, P)) return createPropertyDescriptor$8(!call$j(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var DESCRIPTORS$9 = descriptors;
var definePropertyModule$6 = objectDefineProperty;
var createPropertyDescriptor$7 = createPropertyDescriptor$9;
var createNonEnumerableProperty$d = DESCRIPTORS$9 ? function (object, key, value) {
  return definePropertyModule$6.f(object, key, createPropertyDescriptor$7(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$a = {exports: {}};

var uncurryThis$q = functionUncurryThis;
var isCallable$i = isCallable$o;
var store$1 = sharedStore;
var functionToString = uncurryThis$q(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$i(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$K = global$10;
var isCallable$h = isCallable$o;
var inspectSource$2 = inspectSource$3;
var WeakMap$1 = global$K.WeakMap;
var nativeWeakMap = isCallable$h(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

var shared$2 = shared$4.exports;
var uid$2 = uid$4;
var keys$1 = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys$1[key] || (keys$1[key] = uid$2(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$J = global$10;
var uncurryThis$p = functionUncurryThis;
var isObject$a = isObject$f;
var createNonEnumerableProperty$c = createNonEnumerableProperty$d;
var hasOwn$f = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$e = global$J.TypeError;
var WeakMap = global$J.WeakMap;
var set$2, get$1, has;

var enforce = function (it) {
  return has(it) ? get$1(it) : set$2(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject$a(it) || (state = get$1(it)).type !== TYPE) {
      throw TypeError$e('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = uncurryThis$p(store.get);
  var wmhas = uncurryThis$p(store.has);
  var wmset = uncurryThis$p(store.set);

  set$2 = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$e(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get$1 = function (it) {
    return wmget(store, it) || {};
  };

  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;

  set$2 = function (it, metadata) {
    if (hasOwn$f(it, STATE)) throw new TypeError$e(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$c(it, STATE, metadata);
    return metadata;
  };

  get$1 = function (it) {
    return hasOwn$f(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return hasOwn$f(it, STATE);
  };
}

var internalState = {
  set: set$2,
  get: get$1,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var DESCRIPTORS$8 = descriptors;
var hasOwn$e = hasOwnProperty_1;
var FunctionPrototype$1 = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS$8 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$e(FunctionPrototype$1, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS$8 || DESCRIPTORS$8 && getDescriptor(FunctionPrototype$1, 'name').configurable);
var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var global$I = global$10;
var isCallable$g = isCallable$o;
var hasOwn$d = hasOwnProperty_1;
var createNonEnumerableProperty$b = createNonEnumerableProperty$d;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule$7 = internalState;
var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
var getInternalState$6 = InternalStateModule$7.get;
var enforceInternalState = InternalStateModule$7.enforce;
var TEMPLATE = String(String).split('String');
(redefine$a.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable$g(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn$d(value, 'name') || CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name) {
      createNonEnumerableProperty$b(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global$I) {
    if (simple) O[key] = value;else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty$b(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable$g(this) && getInternalState$6(this).source || inspectSource$1(this);
});

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$7 = Math.floor; // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

var toIntegerOrInfinity$c = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0 ? 0 : (number > 0 ? floor$7 : ceil)(number);
};

var toIntegerOrInfinity$b = toIntegerOrInfinity$c;
var max$3 = Math.max;
var min$2 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$3 = function (index, length) {
  var integer = toIntegerOrInfinity$b(index);
  return integer < 0 ? max$3(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$a = toIntegerOrInfinity$c;
var min$1 = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$6 = function (argument) {
  return argument > 0 ? min$1(toIntegerOrInfinity$a(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$5 = toLength$6; // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$b = function (obj) {
  return toLength$5(obj.length);
};

var toIndexedObject$4 = toIndexedObject$6;
var toAbsoluteIndex$2 = toAbsoluteIndex$3;
var lengthOfArrayLike$a = lengthOfArrayLike$b; // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$4($this);
    var length = lengthOfArrayLike$a(O);
    var index = toAbsoluteIndex$2(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false)
};

var uncurryThis$o = functionUncurryThis;
var hasOwn$c = hasOwnProperty_1;
var toIndexedObject$3 = toIndexedObject$6;
var indexOf$2 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push$7 = uncurryThis$o([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$3(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !hasOwn$c(hiddenKeys$2, key) && hasOwn$c(O, key) && push$7(result, key); // Don't enum bug & hidden keys


  while (names.length > i) if (hasOwn$c(O, key = names[i++])) {
    ~indexOf$2(result, key) || push$7(result, key);
  }

  return result;
};

var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$9 = getBuiltIn$c;
var uncurryThis$n = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$f = anObject$h;
var concat$2 = uncurryThis$n([].concat); // all object keys, includes non-enumerable and symbols

var ownKeys$1 = getBuiltIn$9('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$f(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$b = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var definePropertyModule$5 = objectDefineProperty;

var copyConstructorProperties$3 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$5.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn$b(target, key) && !(exceptions && hasOwn$b(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$m = fails$t;
var isCallable$f = isCallable$o;
var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$f(detection) ? fails$m(detection) : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';
var isForced_1 = isForced$1;

var global$H = global$10;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$a = createNonEnumerableProperty$d;
var redefine$9 = redefine$a.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties$2 = copyConstructorProperties$3;
var isForced = isForced_1;
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/

var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global$H;
  } else if (STATIC) {
    target = global$H[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$H[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$2(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty$a(sourceProperty, 'sham', true);
    } // extend global


    redefine$9(target, key, sourceProperty, options);
  }
};

var NATIVE_BIND$1 = functionBindNative;
var FunctionPrototype = Function.prototype;
var apply$4 = FunctionPrototype.apply;
var call$i = FunctionPrototype.call; // eslint-disable-next-line es/no-reflect -- safe

var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$i.bind(apply$4) : function () {
  return call$i.apply(apply$4, arguments);
});

var global$G = global$10;
var isCallable$e = isCallable$o;
var String$4 = global$G.String;
var TypeError$d = global$G.TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$e(argument)) return argument;
  throw TypeError$d("Can't set " + String$4(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */
var uncurryThis$m = functionUncurryThis;
var anObject$e = anObject$h;
var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe

var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$m(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject$e(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var isCallable$d = isCallable$o;
var isObject$9 = isObject$f;
var setPrototypeOf$6 = objectSetPrototypeOf; // makes subclassing work correct for wrapped built-ins

var inheritIfRequired$3 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if ( // it can work only with native `setPrototypeOf`
  setPrototypeOf$6 && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  isCallable$d(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$9(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf$6($this, NewTargetPrototype);
  return $this;
};

var wellKnownSymbol$l = wellKnownSymbol$o;
var TO_STRING_TAG$5 = wellKnownSymbol$l('toStringTag');
var test = {};
test[TO_STRING_TAG$5] = 'z';
var toStringTagSupport = String(test) === '[object z]';

var global$F = global$10;
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$c = isCallable$o;
var classofRaw = classofRaw$1;
var wellKnownSymbol$k = wellKnownSymbol$o;
var TO_STRING_TAG$4 = wellKnownSymbol$k('toStringTag');
var Object$3 = global$F.Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof$c = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object$3(it), TO_STRING_TAG$4)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable$c(O.callee) ? 'Arguments' : result;
};

var global$E = global$10;
var classof$b = classof$c;
var String$3 = global$E.String;

var toString$9 = function (argument) {
  if (classof$b(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String$3(argument);
};

var toString$8 = toString$9;

var normalizeStringArgument$3 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$8(argument);
};

var isObject$8 = isObject$f;
var createNonEnumerableProperty$9 = createNonEnumerableProperty$d; // `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause

var installErrorCause$2 = function (O, options) {
  if (isObject$8(options) && 'cause' in options) {
    createNonEnumerableProperty$9(O, 'cause', options.cause);
  }
};

var uncurryThis$l = functionUncurryThis;
var replace$5 = uncurryThis$l(''.replace);

var TEST = function (arg) {
  return String(Error(arg).stack);
}('zxcasd');

var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var clearErrorStack$3 = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string') {
    while (dropEntries--) stack = replace$5(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  }

  return stack;
};

var fails$l = fails$t;
var createPropertyDescriptor$6 = createPropertyDescriptor$9;
var errorStackInstallable = !fails$l(function () {
  var error = Error('a');
  if (!('stack' in error)) return true; // eslint-disable-next-line es/no-object-defineproperty -- safe

  Object.defineProperty(error, 'stack', createPropertyDescriptor$6(1, 7));
  return error.stack !== 7;
});

var getBuiltIn$8 = getBuiltIn$c;
var hasOwn$a = hasOwnProperty_1;
var createNonEnumerableProperty$8 = createNonEnumerableProperty$d;
var isPrototypeOf$6 = objectIsPrototypeOf;
var setPrototypeOf$5 = objectSetPrototypeOf;
var copyConstructorProperties$1 = copyConstructorProperties$3;
var inheritIfRequired$2 = inheritIfRequired$3;
var normalizeStringArgument$2 = normalizeStringArgument$3;
var installErrorCause$1 = installErrorCause$2;
var clearErrorStack$2 = clearErrorStack$3;
var ERROR_STACK_INSTALLABLE$2 = errorStackInstallable;

var wrapErrorConstructorWithCause$2 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$8.apply(null, path);
  if (!OriginalError) return;
  var OriginalErrorPrototype = OriginalError.prototype; // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006

  if (hasOwn$a(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;
  if (!FORCED) return OriginalError;
  var BaseError = getBuiltIn$8('Error');
  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument$2(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$8(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE$2) createNonEnumerableProperty$8(result, 'stack', clearErrorStack$2(result.stack, 2));
    if (this && isPrototypeOf$6(OriginalErrorPrototype, this)) inheritIfRequired$2(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause$1(result, arguments[OPTIONS_POSITION]);
    return result;
  });
  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf$5) setPrototypeOf$5(WrappedError, BaseError);else copyConstructorProperties$1(WrappedError, BaseError, {
      name: true
    });
  }

  copyConstructorProperties$1(WrappedError, OriginalError);
  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$8(OriginalErrorPrototype, 'name', ERROR_NAME);
    }

    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) {
    /* empty */
  }
  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $$l = _export;
var global$D = global$10;
var apply$3 = functionApply;
var wrapErrorConstructorWithCause$1 = wrapErrorConstructorWithCause$2;
var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly$1 = global$D[WEB_ASSEMBLY];
var FORCED$4 = Error('e', {
  cause: 7
}).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause$1(ERROR_NAME, wrapper, FORCED$4);
  $$l({
    global: true,
    forced: FORCED$4
  }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly$1 && WebAssembly$1[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause$1(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$4);
    $$l({
      target: WEB_ASSEMBLY,
      stat: true,
      forced: FORCED$4
    }, O);
  }
}; // https://github.com/tc39/proposal-error-cause


exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) {
    return apply$3(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) {
    return apply$3(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) {
    return apply$3(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) {
    return apply$3(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) {
    return apply$3(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) {
    return apply$3(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) {
    return apply$3(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) {
    return apply$3(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) {
    return apply$3(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) {
    return apply$3(init, this, arguments);
  };
});

var fails$k = fails$t;
var correctPrototypeGetter = !fails$k(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var global$C = global$10;
var hasOwn$9 = hasOwnProperty_1;
var isCallable$b = isCallable$o;
var toObject$7 = toObject$9;
var sharedKey$1 = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
var IE_PROTO$1 = sharedKey$1('IE_PROTO');
var Object$2 = global$C.Object;
var ObjectPrototype$2 = Object$2.prototype; // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$2.getPrototypeOf : function (O) {
  var object = toObject$7(O);
  if (hasOwn$9(object, IE_PROTO$1)) return object[IE_PROTO$1];
  var constructor = object.constructor;

  if (isCallable$b(constructor) && object instanceof constructor) {
    return constructor.prototype;
  }

  return object instanceof Object$2 ? ObjectPrototype$2 : null;
};

var objectDefineProperties = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys$3 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$7 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$4 = objectDefineProperty;
var anObject$d = anObject$h;
var toIndexedObject$2 = toIndexedObject$6;
var objectKeys$2 = objectKeys$3; // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

objectDefineProperties.f = DESCRIPTORS$7 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$d(O);
  var props = toIndexedObject$2(Properties);
  var keys = objectKeys$2(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) definePropertyModule$4.f(O, key = keys[index++], props[key]);

  return O;
};

var getBuiltIn$7 = getBuiltIn$c;
var html$2 = getBuiltIn$7('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */
var anObject$c = anObject$h;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey = sharedKey$3;
var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject$c(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var uncurryThis$k = functionUncurryThis;
var aCallable$5 = aCallable$7;
var NATIVE_BIND = functionBindNative;
var bind$7 = uncurryThis$k(uncurryThis$k.bind); // optional / simple context binding

var functionBindContext = function (fn, that) {
  aCallable$5(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$7(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

var iterators = {};

var wellKnownSymbol$j = wellKnownSymbol$o;
var Iterators$4 = iterators;
var ITERATOR$7 = wellKnownSymbol$j('iterator');
var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod$3 = function (it) {
  return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$7] === it);
};

var classof$a = classof$c;
var getMethod$4 = getMethod$6;
var Iterators$3 = iterators;
var wellKnownSymbol$i = wellKnownSymbol$o;
var ITERATOR$6 = wellKnownSymbol$i('iterator');

var getIteratorMethod$5 = function (it) {
  if (it != undefined) return getMethod$4(it, ITERATOR$6) || getMethod$4(it, '@@iterator') || Iterators$3[classof$a(it)];
};

var global$B = global$10;
var call$h = functionCall;
var aCallable$4 = aCallable$7;
var anObject$b = anObject$h;
var tryToString$3 = tryToString$5;
var getIteratorMethod$4 = getIteratorMethod$5;
var TypeError$c = global$B.TypeError;

var getIterator$4 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
  if (aCallable$4(iteratorMethod)) return anObject$b(call$h(iteratorMethod, argument));
  throw TypeError$c(tryToString$3(argument) + ' is not iterable');
};

var call$g = functionCall;
var anObject$a = anObject$h;
var getMethod$3 = getMethod$6;

var iteratorClose$2 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$a(iterator);

  try {
    innerResult = getMethod$3(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call$g(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$a(innerResult);
  return value;
};

var global$A = global$10;
var bind$6 = functionBindContext;
var call$f = functionCall;
var anObject$9 = anObject$h;
var tryToString$2 = tryToString$5;
var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
var lengthOfArrayLike$9 = lengthOfArrayLike$b;
var isPrototypeOf$5 = objectIsPrototypeOf;
var getIterator$3 = getIterator$4;
var getIteratorMethod$3 = getIteratorMethod$5;
var iteratorClose$1 = iteratorClose$2;
var TypeError$b = global$A.TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$4 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$6(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose$1(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$9(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$3(iterable);
    if (!iterFn) throw TypeError$b(tryToString$2(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod$2(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$9(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$5(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator$3(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = call$f(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$1(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf$5(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

var $$k = _export;
var global$z = global$10;
var isPrototypeOf$4 = objectIsPrototypeOf;
var getPrototypeOf$4 = objectGetPrototypeOf;
var setPrototypeOf$4 = objectSetPrototypeOf;
var copyConstructorProperties = copyConstructorProperties$3;
var create$5 = objectCreate;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$d;
var createPropertyDescriptor$5 = createPropertyDescriptor$9;
var clearErrorStack$1 = clearErrorStack$3;
var installErrorCause = installErrorCause$2;
var iterate$3 = iterate$4;
var normalizeStringArgument$1 = normalizeStringArgument$3;
var wellKnownSymbol$h = wellKnownSymbol$o;
var ERROR_STACK_INSTALLABLE$1 = errorStackInstallable;
var TO_STRING_TAG$3 = wellKnownSymbol$h('toStringTag');
var Error$3 = global$z.Error;
var push$6 = [].push;

var $AggregateError$1 = function AggregateError(errors, message
/* , options */
) {
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var isInstance = isPrototypeOf$4(AggregateErrorPrototype, this);
  var that;

  if (setPrototypeOf$4) {
    that = setPrototypeOf$4(new Error$3(), isInstance ? getPrototypeOf$4(this) : AggregateErrorPrototype);
  } else {
    that = isInstance ? this : create$5(AggregateErrorPrototype);
    createNonEnumerableProperty$7(that, TO_STRING_TAG$3, 'Error');
  }

  if (message !== undefined) createNonEnumerableProperty$7(that, 'message', normalizeStringArgument$1(message));
  if (ERROR_STACK_INSTALLABLE$1) createNonEnumerableProperty$7(that, 'stack', clearErrorStack$1(that.stack, 1));
  installErrorCause(that, options);
  var errorsArray = [];
  iterate$3(errors, push$6, {
    that: errorsArray
  });
  createNonEnumerableProperty$7(that, 'errors', errorsArray);
  return that;
};

if (setPrototypeOf$4) setPrototypeOf$4($AggregateError$1, Error$3);else copyConstructorProperties($AggregateError$1, Error$3, {
  name: true
});
var AggregateErrorPrototype = $AggregateError$1.prototype = create$5(Error$3.prototype, {
  constructor: createPropertyDescriptor$5(1, $AggregateError$1),
  message: createPropertyDescriptor$5(1, ''),
  name: createPropertyDescriptor$5(1, 'AggregateError')
}); // `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor

$$k({
  global: true
}, {
  AggregateError: $AggregateError$1
});

var $$j = _export;
var getBuiltIn$6 = getBuiltIn$c;
var apply$2 = functionApply;
var fails$j = fails$t;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$2;
var AGGREGATE_ERROR = 'AggregateError';
var $AggregateError = getBuiltIn$6(AGGREGATE_ERROR);
var FORCED$3 = !fails$j(function () {
  return $AggregateError([1]).errors[0] !== 1;
}) && fails$j(function () {
  return $AggregateError([1], AGGREGATE_ERROR, {
    cause: 7
  }).cause !== 7;
}); // https://github.com/tc39/proposal-error-cause

$$j({
  global: true,
  forced: FORCED$3
}, {
  AggregateError: wrapErrorConstructorWithCause(AGGREGATE_ERROR, function (init) {
    // eslint-disable-next-line no-unused-vars -- required for functions `.length`
    return function AggregateError(errors, message) {
      return apply$2(init, this, arguments);
    };
  }, FORCED$3, true)
});

var wellKnownSymbol$g = wellKnownSymbol$o;
var create$4 = objectCreate;
var definePropertyModule$3 = objectDefineProperty;
var UNSCOPABLES = wellKnownSymbol$g('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule$3.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$4(null)
  });
} // add a key to Array.prototype[@@unscopables]


var addToUnscopables$4 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var $$i = _export;
var toObject$6 = toObject$9;
var lengthOfArrayLike$8 = lengthOfArrayLike$b;
var toIntegerOrInfinity$9 = toIntegerOrInfinity$c;
var addToUnscopables$3 = addToUnscopables$4; // `Array.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method

$$i({
  target: 'Array',
  proto: true
}, {
  at: function at(index) {
    var O = toObject$6(this);
    var len = lengthOfArrayLike$8(O);
    var relativeIndex = toIntegerOrInfinity$9(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return k < 0 || k >= len ? undefined : O[k];
  }
});
addToUnscopables$3('at');

// in popular engines, so it's moved to a separate module

var addToUnscopables$2 = addToUnscopables$4; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables$2('flat');

// in popular engines, so it's moved to a separate module

var addToUnscopables$1 = addToUnscopables$4; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables$1('flatMap');

var uncurryThis$j = functionUncurryThis; // `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue

var thisNumberValue$1 = uncurryThis$j(1.0.valueOf);

var global$y = global$10;
var toIntegerOrInfinity$8 = toIntegerOrInfinity$c;
var toString$7 = toString$9;
var requireObjectCoercible$5 = requireObjectCoercible$8;
var RangeError$9 = global$y.RangeError; // `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat

var stringRepeat = function repeat(count) {
  var str = toString$7(requireObjectCoercible$5(this));
  var result = '';
  var n = toIntegerOrInfinity$8(count);
  if (n < 0 || n == Infinity) throw RangeError$9('Wrong number of repetitions');

  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

  return result;
};

var log$1 = Math.log;
var LOG10E = Math.LOG10E; // eslint-disable-next-line es/no-math-log10 -- safe

var mathLog10 = Math.log10 || function log10(x) {
  return log$1(x) * LOG10E;
};

var $$h = _export;
var global$x = global$10;
var uncurryThis$i = functionUncurryThis;
var toIntegerOrInfinity$7 = toIntegerOrInfinity$c;
var thisNumberValue = thisNumberValue$1;
var $repeat = stringRepeat;
var log10 = mathLog10;
var fails$i = fails$t;
var RangeError$8 = global$x.RangeError;
var String$2 = global$x.String;
var isFinite$1 = global$x.isFinite;
var abs$1 = Math.abs;
var floor$6 = Math.floor;
var pow$2 = Math.pow;
var round$1 = Math.round;
var un$ToExponential = uncurryThis$i(1.0.toExponential);
var repeat = uncurryThis$i($repeat);
var stringSlice$7 = uncurryThis$i(''.slice); // Edge 17-

var ROUNDS_PROPERLY = un$ToExponential(-6.9e-11, 4) === '-6.9000e-11' // IE11- && Edge 14-
&& un$ToExponential(1.255, 2) === '1.25e+0' // FF86-, V8 ~ Chrome 49-50
&& un$ToExponential(12345, 3) === '1.235e+4' // FF86-, V8 ~ Chrome 49-50
&& un$ToExponential(25, 0) === '3e+1'; // IE8-

var THROWS_ON_INFINITY_FRACTION = fails$i(function () {
  un$ToExponential(1, Infinity);
}) && fails$i(function () {
  un$ToExponential(1, -Infinity);
}); // Safari <11 && FF <50

var PROPER_NON_FINITE_THIS_CHECK = !fails$i(function () {
  un$ToExponential(Infinity, Infinity);
}) && !fails$i(function () {
  un$ToExponential(NaN, Infinity);
});
var FORCED$2 = !ROUNDS_PROPERLY || !THROWS_ON_INFINITY_FRACTION || !PROPER_NON_FINITE_THIS_CHECK; // `Number.prototype.toExponential` method
// https://tc39.es/ecma262/#sec-number.prototype.toexponential

$$h({
  target: 'Number',
  proto: true,
  forced: FORCED$2
}, {
  toExponential: function toExponential(fractionDigits) {
    var x = thisNumberValue(this);
    if (fractionDigits === undefined) return un$ToExponential(x);
    var f = toIntegerOrInfinity$7(fractionDigits);
    if (!isFinite$1(x)) return String$2(x); // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation

    if (f < 0 || f > 20) throw RangeError$8('Incorrect fraction digits');
    if (ROUNDS_PROPERLY) return un$ToExponential(x, f);
    var s = '';
    var m = '';
    var e = 0;
    var c = '';
    var d = '';

    if (x < 0) {
      s = '-';
      x = -x;
    }

    if (x === 0) {
      e = 0;
      m = repeat('0', f + 1);
    } else {
      // this block is based on https://gist.github.com/SheetJSDev/1100ad56b9f856c95299ed0e068eea08
      // TODO: improve accuracy with big fraction digits
      var l = log10(x);
      e = floor$6(l);
      var n = 0;
      var w = pow$2(10, e - f);
      n = round$1(x / w);

      if (2 * x >= (2 * n + 1) * w) {
        n += 1;
      }

      if (n >= pow$2(10, f + 1)) {
        n /= 10;
        e += 1;
      }

      m = String$2(n);
    }

    if (f !== 0) {
      m = stringSlice$7(m, 0, 1) + '.' + stringSlice$7(m, 1);
    }

    if (e === 0) {
      c = '+';
      d = '0';
    } else {
      c = e > 0 ? '+' : '-';
      d = String$2(abs$1(e));
    }

    m += 'e' + c + d;
    return s + m;
  }
});

var $$g = _export;
var hasOwn$8 = hasOwnProperty_1; // `Object.hasOwn` method
// https://github.com/tc39/proposal-accessible-object-hasownproperty

$$g({
  target: 'Object',
  stat: true
}, {
  hasOwn: hasOwn$8
});

var newPromiseCapability$1 = {};

var aCallable$3 = aCallable$7;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$3(resolve);
  this.reject = aCallable$3(reject);
}; // `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability


newPromiseCapability$1.f = function (C) {
  return new PromiseCapability(C);
};

var perform$2 = function (exec) {
  try {
    return {
      error: false,
      value: exec()
    };
  } catch (error) {
    return {
      error: true,
      value: error
    };
  }
};

var $$f = _export;
var call$e = functionCall;
var aCallable$2 = aCallable$7;
var newPromiseCapabilityModule$1 = newPromiseCapability$1;
var perform$1 = perform$2;
var iterate$2 = iterate$4; // `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled

$$f({
  target: 'Promise',
  stat: true
}, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var promiseResolve = aCallable$2(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$2(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$e(promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = {
            status: 'fulfilled',
            value: value
          };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = {
            status: 'rejected',
            reason: error
          };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$e = _export;
var aCallable$1 = aCallable$7;
var getBuiltIn$5 = getBuiltIn$c;
var call$d = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$1;
var perform = perform$2;
var iterate$1 = iterate$4;
var PROMISE_ANY_ERROR = 'No one promise resolved'; // `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any

$$e({
  target: 'Promise',
  stat: true
}, {
  any: function any(iterable) {
    var C = this;
    var AggregateError = getBuiltIn$5('AggregateError');
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable$1(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate$1(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        remaining++;
        call$d(promiseResolve, C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var global$w = global$10;
var nativePromiseConstructor = global$w.Promise;

var uncurryThis$h = functionUncurryThis;
var fails$h = fails$t;
var isCallable$a = isCallable$o;
var classof$9 = classof$c;
var getBuiltIn$4 = getBuiltIn$c;
var inspectSource = inspectSource$3;

var noop = function () {
  /* empty */
};

var empty = [];
var construct = getBuiltIn$4('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$3 = uncurryThis$h(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$a(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$a(argument)) return false;

  switch (classof$9(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$3(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

var isConstructor$4 = !construct || fails$h(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

var global$v = global$10;
var isConstructor$3 = isConstructor$4;
var tryToString$1 = tryToString$5;
var TypeError$a = global$v.TypeError; // `Assert: IsConstructor(argument) is true`

var aConstructor$2 = function (argument) {
  if (isConstructor$3(argument)) return argument;
  throw TypeError$a(tryToString$1(argument) + ' is not a constructor');
};

var anObject$8 = anObject$h;
var aConstructor$1 = aConstructor$2;
var wellKnownSymbol$f = wellKnownSymbol$o;
var SPECIES$3 = wellKnownSymbol$f('species'); // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$2 = function (O, defaultConstructor) {
  var C = anObject$8(O).constructor;
  var S;
  return C === undefined || (S = anObject$8(C)[SPECIES$3]) == undefined ? defaultConstructor : aConstructor$1(S);
};

var anObject$7 = anObject$h;
var isObject$7 = isObject$f;
var newPromiseCapability = newPromiseCapability$1;

var promiseResolve$1 = function (C, x) {
  anObject$7(C);
  if (isObject$7(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$d = _export;
var NativePromise = nativePromiseConstructor;
var fails$g = fails$t;
var getBuiltIn$3 = getBuiltIn$c;
var isCallable$9 = isCallable$o;
var speciesConstructor$1 = speciesConstructor$2;
var promiseResolve = promiseResolve$1;
var redefine$8 = redefine$a.exports; // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829

var NON_GENERIC = !!NativePromise && fails$g(function () {
  // eslint-disable-next-line unicorn/no-thenable -- required for testing
  NativePromise.prototype['finally'].call({
    then: function () {
      /* empty */
    }
  }, function () {
    /* empty */
  });
}); // `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally

$$d({
  target: 'Promise',
  proto: true,
  real: true,
  forced: NON_GENERIC
}, {
  'finally': function (onFinally) {
    var C = speciesConstructor$1(this, getBuiltIn$3('Promise'));
    var isFunction = isCallable$9(onFinally);
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  }
}); // makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`

if (isCallable$9(NativePromise)) {
  var method = getBuiltIn$3('Promise').prototype['finally'];

  if (NativePromise.prototype['finally'] !== method) {
    redefine$8(NativePromise.prototype, 'finally', method, {
      unsafe: true
    });
  }
}

var defineProperty$5 = objectDefineProperty.f;
var hasOwn$7 = hasOwnProperty_1;
var wellKnownSymbol$e = wellKnownSymbol$o;
var TO_STRING_TAG$2 = wellKnownSymbol$e('toStringTag');

var setToStringTag$6 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;

  if (target && !hasOwn$7(target, TO_STRING_TAG$2)) {
    defineProperty$5(target, TO_STRING_TAG$2, {
      configurable: true,
      value: TAG
    });
  }
};

var $$c = _export;
var global$u = global$10;
var setToStringTag$5 = setToStringTag$6;
$$c({
  global: true
}, {
  Reflect: {}
}); // Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag

setToStringTag$5(global$u.Reflect, 'Reflect', true);

var $$b = _export;
var uncurryThis$g = functionUncurryThis;
var requireObjectCoercible$4 = requireObjectCoercible$8;
var toIntegerOrInfinity$6 = toIntegerOrInfinity$c;
var toString$6 = toString$9;
var fails$f = fails$t;
var charAt$7 = uncurryThis$g(''.charAt);
var FORCED$1 = fails$f(function () {
  return '𠮷'.at(-2) !== '\uD842';
}); // `String.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method

$$b({
  target: 'String',
  proto: true,
  forced: FORCED$1
}, {
  at: function at(index) {
    var S = toString$6(requireObjectCoercible$4(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity$6(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return k < 0 || k >= len ? undefined : charAt$7(S, k);
  }
});

var fails$e = fails$t;
var isCallable$8 = isCallable$o;
var getPrototypeOf$3 = objectGetPrototypeOf;
var redefine$7 = redefine$a.exports;
var wellKnownSymbol$d = wellKnownSymbol$o;
var ITERATOR$5 = wellKnownSymbol$d('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false; // `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object

var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
/* eslint-disable es/no-array-prototype-keys -- safe */

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$e(function () {
  var test = {}; // FF44- legacy iterators case

  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

if (!isCallable$8(IteratorPrototype$2[ITERATOR$5])) {
  redefine$7(IteratorPrototype$2, ITERATOR$5, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$3 = objectCreate;
var createPropertyDescriptor$4 = createPropertyDescriptor$9;
var setToStringTag$4 = setToStringTag$6;
var Iterators$2 = iterators;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor$3 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$3(IteratorPrototype$1, {
    next: createPropertyDescriptor$4(+!ENUMERABLE_NEXT, next)
  });
  setToStringTag$4(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$2[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isObject$6 = isObject$f;
var classof$8 = classofRaw$1;
var wellKnownSymbol$c = wellKnownSymbol$o;
var MATCH = wellKnownSymbol$c('match'); // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp;
  return isObject$6(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof$8(it) == 'RegExp');
};

var anObject$6 = anObject$h; // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$6(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var uncurryThis$f = functionUncurryThis;
var toIntegerOrInfinity$5 = toIntegerOrInfinity$c;
var toString$5 = toString$9;
var requireObjectCoercible$3 = requireObjectCoercible$8;
var charAt$6 = uncurryThis$f(''.charAt);
var charCodeAt$1 = uncurryThis$f(''.charCodeAt);
var stringSlice$6 = uncurryThis$f(''.slice);

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$5(requireObjectCoercible$3($this));
    var position = toIntegerOrInfinity$5(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt$1(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt$6(S, position) : first : CONVERT_TO_STRING ? stringSlice$6(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var charAt$5 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex$2 = function (S, index, unicode) {
  return index + (unicode ? charAt$5(S, index).length : 1);
};

var fails$d = fails$t;
var global$t = global$10; // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

var $RegExp$2 = global$t.RegExp;
var UNSUPPORTED_Y$1 = fails$d(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
}); // UC Browser bug
// https://github.com/zloirock/core-js/issues/1008

var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$d(function () {
  return !$RegExp$2('a', 'y').sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$d(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});
var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};

var fails$c = fails$t;
var global$s = global$10; // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

var $RegExp$1 = global$s.RegExp;
var regexpUnsupportedDotAll = fails$c(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$b = fails$t;
var global$r = global$10; // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

var $RegExp = global$r.RegExp;
var regexpUnsupportedNcg = fails$b(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */


var call$c = functionCall;
var uncurryThis$e = functionUncurryThis;
var toString$4 = toString$9;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4.exports;
var create$2 = objectCreate;
var getInternalState$5 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;
var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$4 = uncurryThis$e(''.charAt);
var indexOf$1 = uncurryThis$e(''.indexOf);
var replace$4 = uncurryThis$e(''.replace);
var stringSlice$5 = uncurryThis$e(''.slice);

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$c(nativeExec, re1, 'a');
  call$c(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$5(re);
    var str = toString$4(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$c(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$c(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$4(flags, 'y', '');

      if (indexOf$1(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$5(str, re.lastIndex); // Support anchored sticky behavior.

      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$4(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      } // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.


      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = call$c(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$5(match.input, charsAdded);
        match[0] = stringSlice$5(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call$c(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$2(null);

      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var global$q = global$10;
var call$b = functionCall;
var anObject$5 = anObject$h;
var isCallable$7 = isCallable$o;
var classof$7 = classofRaw$1;
var regexpExec$1 = regexpExec$2;
var TypeError$9 = global$q.TypeError; // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec;

  if (isCallable$7(exec)) {
    var result = call$b(exec, R, S);
    if (result !== null) anObject$5(result);
    return result;
  }

  if (classof$7(R) === 'RegExp') return call$b(regexpExec$1, R, S);
  throw TypeError$9('RegExp#exec called on incompatible receiver');
};

/* eslint-disable es/no-string-prototype-matchall -- safe */


var $$a = _export;
var global$p = global$10;
var call$a = functionCall;
var uncurryThis$d = functionUncurryThis;
var createIteratorConstructor$2 = createIteratorConstructor$3;
var requireObjectCoercible$2 = requireObjectCoercible$8;
var toLength$4 = toLength$6;
var toString$3 = toString$9;
var anObject$4 = anObject$h;
var classof$6 = classofRaw$1;
var isPrototypeOf$3 = objectIsPrototypeOf;
var isRegExp$1 = isRegexp;
var regExpFlags$2 = regexpFlags$1;
var getMethod$2 = getMethod$6;
var redefine$6 = redefine$a.exports;
var fails$a = fails$t;
var wellKnownSymbol$b = wellKnownSymbol$o;
var speciesConstructor = speciesConstructor$2;
var advanceStringIndex$1 = advanceStringIndex$2;
var regExpExec$1 = regexpExecAbstract;
var InternalStateModule$6 = internalState;
var IS_PURE$1 = isPure;
var MATCH_ALL = wellKnownSymbol$b('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState$6 = InternalStateModule$6.set;
var getInternalState$4 = InternalStateModule$6.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype$2 = RegExp.prototype;
var TypeError$8 = global$p.TypeError;
var getFlags$2 = uncurryThis$d(regExpFlags$2);
var stringIndexOf$2 = uncurryThis$d(''.indexOf);
var un$MatchAll = uncurryThis$d(''.matchAll);
var WORKS_WITH_NON_GLOBAL_REGEX = !!un$MatchAll && !fails$a(function () {
  un$MatchAll('a', /./);
});
var $RegExpStringIterator = createIteratorConstructor$2(function RegExpStringIterator(regexp, string, $global, fullUnicode) {
  setInternalState$6(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: $global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next() {
  var state = getInternalState$4(this);
  if (state.done) return {
    value: undefined,
    done: true
  };
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec$1(R, S);
  if (match === null) return {
    value: undefined,
    done: state.done = true
  };

  if (state.global) {
    if (toString$3(match[0]) === '') R.lastIndex = advanceStringIndex$1(S, toLength$4(R.lastIndex), state.unicode);
    return {
      value: match,
      done: false
    };
  }

  state.done = true;
  return {
    value: match,
    done: false
  };
});

var $matchAll = function (string) {
  var R = anObject$4(this);
  var S = toString$3(string);
  var C, flagsValue, flags, matcher, $global, fullUnicode;
  C = speciesConstructor(R, RegExp);
  flagsValue = R.flags;

  if (flagsValue === undefined && isPrototypeOf$3(RegExpPrototype$2, R) && !('flags' in RegExpPrototype$2)) {
    flagsValue = getFlags$2(R);
  }

  flags = flagsValue === undefined ? '' : toString$3(flagsValue);
  matcher = new C(C === RegExp ? R.source : R, flags);
  $global = !!~stringIndexOf$2(flags, 'g');
  fullUnicode = !!~stringIndexOf$2(flags, 'u');
  matcher.lastIndex = toLength$4(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
}; // `String.prototype.matchAll` method
// https://tc39.es/ecma262/#sec-string.prototype.matchall


$$a({
  target: 'String',
  proto: true,
  forced: WORKS_WITH_NON_GLOBAL_REGEX
}, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible$2(this);
    var flags, S, matcher, rx;

    if (regexp != null) {
      if (isRegExp$1(regexp)) {
        flags = toString$3(requireObjectCoercible$2('flags' in RegExpPrototype$2 ? regexp.flags : getFlags$2(regexp)));
        if (!~stringIndexOf$2(flags, 'g')) throw TypeError$8('`.matchAll` does not allow non-global regexes');
      }

      if (WORKS_WITH_NON_GLOBAL_REGEX) return un$MatchAll(O, regexp);
      matcher = getMethod$2(regexp, MATCH_ALL);
      if (matcher === undefined && IS_PURE$1 && classof$6(regexp) == 'RegExp') matcher = $matchAll;
      if (matcher) return call$a(matcher, regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return un$MatchAll(O, regexp);

    S = toString$3(O);
    rx = new RegExp(regexp, 'g');
    return rx[MATCH_ALL](S);
  }
});
MATCH_ALL in RegExpPrototype$2 || redefine$6(RegExpPrototype$2, MATCH_ALL, $matchAll);

var $$9 = _export;
var exec$2 = regexpExec$2; // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$$9({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== exec$2
}, {
  exec: exec$2
});

var uncurryThis$c = functionUncurryThis;
var redefine$5 = redefine$a.exports;
var regexpExec = regexpExec$2;
var fails$9 = fails$t;
var wellKnownSymbol$a = wellKnownSymbol$o;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$d;
var SPECIES$2 = wellKnownSymbol$a('species');
var RegExpPrototype$1 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$a(KEY);
  var DELEGATES_TO_SYMBOL = !fails$9(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$9(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.

      re.constructor = {};

      re.constructor[SPECIES$2] = function () {
        return re;
      };

      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
    var uncurriedNativeRegExpMethod = uncurryThis$c(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$c(nativeMethod);
      var $exec = regexp.exec;

      if ($exec === regexpExec || $exec === RegExpPrototype$1.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: uncurriedNativeRegExpMethod(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: uncurriedNativeMethod(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    });
    redefine$5(String.prototype, KEY, methods[0]);
    redefine$5(RegExpPrototype$1, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$6(RegExpPrototype$1[SYMBOL], 'sham', true);
};

var uncurryThis$b = functionUncurryThis;
var toObject$5 = toObject$9;
var floor$5 = Math.floor;
var charAt$3 = uncurryThis$b(''.charAt);
var replace$3 = uncurryThis$b(''.replace);
var stringSlice$4 = uncurryThis$b(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g; // `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution

var getSubstitution$2 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

  if (namedCaptures !== undefined) {
    namedCaptures = toObject$5(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }

  return replace$3(replacement, symbols, function (match, ch) {
    var capture;

    switch (charAt$3(ch, 0)) {
      case '$':
        return '$';

      case '&':
        return matched;

      case '`':
        return stringSlice$4(str, 0, position);

      case "'":
        return stringSlice$4(str, tailPos);

      case '<':
        capture = namedCaptures[stringSlice$4(ch, 1, -1)];
        break;

      default:
        // \d\d?
        var n = +ch;
        if (n === 0) return match;

        if (n > m) {
          var f = floor$5(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt$3(ch, 1) : captures[f - 1] + charAt$3(ch, 1);
          return match;
        }

        capture = captures[n - 1];
    }

    return capture === undefined ? '' : capture;
  });
};

var apply$1 = functionApply;
var call$9 = functionCall;
var uncurryThis$a = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails$8 = fails$t;
var anObject$3 = anObject$h;
var isCallable$6 = isCallable$o;
var toIntegerOrInfinity$4 = toIntegerOrInfinity$c;
var toLength$3 = toLength$6;
var toString$2 = toString$9;
var requireObjectCoercible$1 = requireObjectCoercible$8;
var advanceStringIndex = advanceStringIndex$2;
var getMethod$1 = getMethod$6;
var getSubstitution$1 = getSubstitution$2;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol$9 = wellKnownSymbol$o;
var REPLACE$1 = wellKnownSymbol$9('replace');
var max$2 = Math.max;
var min = Math.min;
var concat$1 = uncurryThis$a([].concat);
var push$5 = uncurryThis$a([].push);
var stringIndexOf$1 = uncurryThis$a(''.indexOf);
var stringSlice$3 = uncurryThis$a(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
}; // IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0


var REPLACE_KEEPS_$0 = function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
}(); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string


var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
  if (/./[REPLACE$1]) {
    return /./[REPLACE$1]('a', '$0') === '';
  }

  return false;
}();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$8(function () {
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  }; // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive


  return ''.replace(re, '$<a>') !== '7';
}); // @@replace logic

fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
  return [// `String.prototype.replace` method
  // https://tc39.es/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = requireObjectCoercible$1(this);
    var replacer = searchValue == undefined ? undefined : getMethod$1(searchValue, REPLACE$1);
    return replacer ? call$9(replacer, searchValue, O, replaceValue) : call$9(nativeReplace, toString$2(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
  function (string, replaceValue) {
    var rx = anObject$3(this);
    var S = toString$2(string);

    if (typeof replaceValue == 'string' && stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf$1(replaceValue, '$<') === -1) {
      var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
      if (res.done) return res.value;
    }

    var functionalReplace = isCallable$6(replaceValue);
    if (!functionalReplace) replaceValue = toString$2(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regExpExec(rx, S);
      if (result === null) break;
      push$5(results, result);
      if (!global) break;
      var matchStr = toString$2(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$3(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = toString$2(result[0]);
      var position = max$2(min(toIntegerOrInfinity$4(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) push$5(captures, maybeToString(result[j]));

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = concat$1([matched], captures, position, S);
        if (namedCaptures !== undefined) push$5(replacerArgs, namedCaptures);
        var replacement = toString$2(apply$1(replaceValue, undefined, replacerArgs));
      } else {
        replacement = getSubstitution$1(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += stringSlice$3(S, nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + stringSlice$3(S, nextSourcePosition);
  }];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

var $$8 = _export;
var global$o = global$10;
var call$8 = functionCall;
var uncurryThis$9 = functionUncurryThis;
var requireObjectCoercible = requireObjectCoercible$8;
var isCallable$5 = isCallable$o;
var isRegExp = isRegexp;
var toString$1 = toString$9;
var getMethod = getMethod$6;
var regExpFlags$1 = regexpFlags$1;
var getSubstitution = getSubstitution$2;
var wellKnownSymbol$8 = wellKnownSymbol$o;
var REPLACE = wellKnownSymbol$8('replace');
var RegExpPrototype = RegExp.prototype;
var TypeError$7 = global$o.TypeError;
var getFlags$1 = uncurryThis$9(regExpFlags$1);
var indexOf = uncurryThis$9(''.indexOf);
uncurryThis$9(''.replace);
var stringSlice$2 = uncurryThis$9(''.slice);
var max$1 = Math.max;

var stringIndexOf = function (string, searchValue, fromIndex) {
  if (fromIndex > string.length) return -1;
  if (searchValue === '') return fromIndex;
  return indexOf(string, searchValue, fromIndex);
}; // `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall


$$8({
  target: 'String',
  proto: true
}, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';

    if (searchValue != null) {
      IS_REG_EXP = isRegExp(searchValue);

      if (IS_REG_EXP) {
        flags = toString$1(requireObjectCoercible('flags' in RegExpPrototype ? searchValue.flags : getFlags$1(searchValue)));
        if (!~indexOf(flags, 'g')) throw TypeError$7('`.replaceAll` does not allow non-global regexes');
      }

      replacer = getMethod(searchValue, REPLACE);

      if (replacer) {
        return call$8(replacer, searchValue, O, replaceValue);
      }
    }

    string = toString$1(O);
    searchString = toString$1(searchValue);
    functionalReplace = isCallable$5(replaceValue);
    if (!functionalReplace) replaceValue = toString$1(replaceValue);
    searchLength = searchString.length;
    advanceBy = max$1(1, searchLength);
    position = stringIndexOf(string, searchString, 0);

    while (position !== -1) {
      replacement = functionalReplace ? toString$1(replaceValue(searchString, position, string)) : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice$2(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf(string, searchString, position + advanceBy);
    }

    if (endOfLastMatch < string.length) {
      result += stringSlice$2(string, endOfLastMatch);
    }

    return result;
  }
});

var typedArrayConstructor = {exports: {}};

var wellKnownSymbol$7 = wellKnownSymbol$o;
var ITERATOR$4 = wellKnownSymbol$7('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR$4] = function () {
    return this;
  }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR$4] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

var arrayBufferNative = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

var NATIVE_ARRAY_BUFFER$1 = arrayBufferNative;
var DESCRIPTORS$6 = descriptors;
var global$n = global$10;
var isCallable$4 = isCallable$o;
var isObject$5 = isObject$f;
var hasOwn$6 = hasOwnProperty_1;
var classof$5 = classof$c;
var tryToString = tryToString$5;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$d;
var redefine$4 = redefine$a.exports;
var defineProperty$4 = objectDefineProperty.f;
var isPrototypeOf$2 = objectIsPrototypeOf;
var getPrototypeOf$2 = objectGetPrototypeOf;
var setPrototypeOf$3 = objectSetPrototypeOf;
var wellKnownSymbol$6 = wellKnownSymbol$o;
var uid$1 = uid$4;
var Int8Array$2 = global$n.Int8Array;
var Int8ArrayPrototype$1 = Int8Array$2 && Int8Array$2.prototype;
var Uint8ClampedArray$1 = global$n.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
var TypedArray$1 = Int8Array$2 && getPrototypeOf$2(Int8Array$2);
var TypedArrayPrototype$1 = Int8ArrayPrototype$1 && getPrototypeOf$2(Int8ArrayPrototype$1);
var ObjectPrototype$1 = Object.prototype;
var TypeError$6 = global$n.TypeError;
var TO_STRING_TAG$1 = wellKnownSymbol$6('toStringTag');
var TYPED_ARRAY_TAG$1 = uid$1('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR$1 = uid$1('TYPED_ARRAY_CONSTRUCTOR'); // Fixing native typed arrays in Opera Presto crashes the browser, see #595

var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$3 && classof$5(global$n.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;
var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};
var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject$5(it)) return false;
  var klass = classof$5(it);
  return klass === 'DataView' || hasOwn$6(TypedArrayConstructorsList, klass) || hasOwn$6(BigIntArrayConstructorsList, klass);
};

var isTypedArray$1 = function (it) {
  if (!isObject$5(it)) return false;
  var klass = classof$5(it);
  return hasOwn$6(TypedArrayConstructorsList, klass) || hasOwn$6(BigIntArrayConstructorsList, klass);
};

var aTypedArray$3 = function (it) {
  if (isTypedArray$1(it)) return it;
  throw TypeError$6('Target is not a typed array');
};

var aTypedArrayConstructor$3 = function (C) {
  if (isCallable$4(C) && (!setPrototypeOf$3 || isPrototypeOf$2(TypedArray$1, C))) return C;
  throw TypeError$6(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod$3 = function (KEY, property, forced, options) {
  if (!DESCRIPTORS$6) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global$n[ARRAY];
    if (TypedArrayConstructor && hasOwn$6(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) {
        /* empty */
      }
    }
  }

  if (!TypedArrayPrototype$1[KEY] || forced) {
    redefine$4(TypedArrayPrototype$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod$2 = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS$6) return;

  if (setPrototypeOf$3) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$n[ARRAY];
      if (TypedArrayConstructor && hasOwn$6(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) {
        /* empty */
      }
    }

    if (!TypedArray$1[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine$4(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
      } catch (error) {
        /* empty */
      }
    } else return;
  }

  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global$n[ARRAY];

    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine$4(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global$n[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty$5(Prototype, TYPED_ARRAY_CONSTRUCTOR$1, Constructor);else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global$n[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty$5(Prototype, TYPED_ARRAY_CONSTRUCTOR$1, Constructor);
} // WebKit bug - typed arrays constructors prototype is Object.prototype


if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$4(TypedArray$1) || TypedArray$1 === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray$1 = function TypedArray() {
    throw TypeError$6('Incorrect invocation');
  };

  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (global$n[NAME]) setPrototypeOf$3(global$n[NAME], TypedArray$1);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype$1) {
  TypedArrayPrototype$1 = TypedArray$1.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (global$n[NAME]) setPrototypeOf$3(global$n[NAME].prototype, TypedArrayPrototype$1);
  }
} // WebKit bug - one more object in Uint8ClampedArray prototype chain


if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf$2(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
  setPrototypeOf$3(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
}

if (DESCRIPTORS$6 && !hasOwn$6(TypedArrayPrototype$1, TO_STRING_TAG$1)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineProperty$4(TypedArrayPrototype$1, TO_STRING_TAG$1, {
    get: function () {
      return isObject$5(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
    }
  });

  for (NAME in TypedArrayConstructorsList) if (global$n[NAME]) {
    createNonEnumerableProperty$5(global$n[NAME], TYPED_ARRAY_TAG$1, NAME);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR$1,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
  aTypedArray: aTypedArray$3,
  aTypedArrayConstructor: aTypedArrayConstructor$3,
  exportTypedArrayMethod: exportTypedArrayMethod$3,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod$2,
  isView: isView,
  isTypedArray: isTypedArray$1,
  TypedArray: TypedArray$1,
  TypedArrayPrototype: TypedArrayPrototype$1
};

/* eslint-disable no-new -- required for testing */
var global$m = global$10;
var fails$7 = fails$t;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var ArrayBuffer$2 = global$m.ArrayBuffer;
var Int8Array$1 = global$m.Int8Array;
var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$7(function () {
  Int8Array$1(1);
}) || !fails$7(function () {
  new Int8Array$1(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array$1();
  new Int8Array$1(null);
  new Int8Array$1(1.5);
  new Int8Array$1(iterable);
}, true) || fails$7(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array$1(new ArrayBuffer$2(2), 1, undefined).length !== 1;
});

var redefine$3 = redefine$a.exports;

var redefineAll$2 = function (target, src, options) {
  for (var key in src) redefine$3(target, key, src[key], options);

  return target;
};

var global$l = global$10;
var isPrototypeOf$1 = objectIsPrototypeOf;
var TypeError$5 = global$l.TypeError;

var anInstance$5 = function (it, Prototype) {
  if (isPrototypeOf$1(Prototype, it)) return it;
  throw TypeError$5('Incorrect invocation');
};

var global$k = global$10;
var toIntegerOrInfinity$3 = toIntegerOrInfinity$c;
var toLength$2 = toLength$6;
var RangeError$7 = global$k.RangeError; // `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex

var toIndex$2 = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity$3(it);
  var length = toLength$2(number);
  if (number !== length) throw RangeError$7('Wrong length or index');
  return length;
};

var global$j = global$10;
var Array$6 = global$j.Array;
var abs = Math.abs;
var pow$1 = Math.pow;
var floor$4 = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = Array$6(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow$1(2, -24) - pow$1(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number); // eslint-disable-next-line no-self-compare -- NaN check

  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor$4(log(number) / LN2);
    c = pow$1(2, -exponent);

    if (number * c < 1) {
      exponent--;
      c *= 2;
    }

    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow$1(2, 1 - eBias);
    }

    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }

    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow$1(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow$1(2, eBias - 1) * pow$1(2, mantissaLength);
      exponent = 0;
    }
  }

  while (mantissaLength >= 8) {
    buffer[index++] = mantissa & 255;
    mantissa /= 256;
    mantissaLength -= 8;
  }

  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;

  while (exponentLength > 0) {
    buffer[index++] = exponent & 255;
    exponent /= 256;
    exponentLength -= 8;
  }

  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;

  while (nBits > 0) {
    exponent = exponent * 256 + buffer[index--];
    nBits -= 8;
  }

  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;

  while (nBits > 0) {
    mantissa = mantissa * 256 + buffer[index--];
    nBits -= 8;
  }

  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow$1(2, mantissaLength);
    exponent = exponent - eBias;
  }

  return (sign ? -1 : 1) * mantissa * pow$1(2, exponent - mantissaLength);
};

var ieee754 = {
  pack: pack,
  unpack: unpack
};

var toObject$4 = toObject$9;
var toAbsoluteIndex$1 = toAbsoluteIndex$3;
var lengthOfArrayLike$7 = lengthOfArrayLike$b; // `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill

var arrayFill$1 = function fill(value
/* , start = 0, end = @length */
) {
  var O = toObject$4(this);
  var length = lengthOfArrayLike$7(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex$1(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex$1(end, length);

  while (endPos > index) O[index++] = value;

  return O;
};

var toPropertyKey$1 = toPropertyKey$4;
var definePropertyModule$2 = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$9;

var createProperty$3 = function (object, key, value) {
  var propertyKey = toPropertyKey$1(key);
  if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$3(0, value));else object[propertyKey] = value;
};

var global$i = global$10;
var toAbsoluteIndex = toAbsoluteIndex$3;
var lengthOfArrayLike$6 = lengthOfArrayLike$b;
var createProperty$2 = createProperty$3;
var Array$5 = global$i.Array;
var max = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$6(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = Array$5(max(fin - k, 0));

  for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);

  result.length = n;
  return result;
};

var global$h = global$10;
var uncurryThis$8 = functionUncurryThis;
var DESCRIPTORS$5 = descriptors;
var NATIVE_ARRAY_BUFFER = arrayBufferNative;
var FunctionName$1 = functionName;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$d;
var redefineAll$1 = redefineAll$2;
var fails$6 = fails$t;
var anInstance$4 = anInstance$5;
var toIntegerOrInfinity$2 = toIntegerOrInfinity$c;
var toLength$1 = toLength$6;
var toIndex$1 = toIndex$2;
var IEEE754 = ieee754;
var getPrototypeOf$1 = objectGetPrototypeOf;
var setPrototypeOf$2 = objectSetPrototypeOf;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var defineProperty$3 = objectDefineProperty.f;
var arrayFill = arrayFill$1;
var arraySlice$4 = arraySliceSimple;
var setToStringTag$3 = setToStringTag$6;
var InternalStateModule$5 = internalState;
var PROPER_FUNCTION_NAME$1 = FunctionName$1.PROPER;
var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
var getInternalState$3 = InternalStateModule$5.get;
var setInternalState$5 = InternalStateModule$5.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH$1 = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global$h[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global$h[DATA_VIEW];
var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var Array$4 = global$h.Array;
var RangeError$6 = global$h.RangeError;
var fill = uncurryThis$8(arrayFill);
var reverse = uncurryThis$8([].reverse);
var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter$1 = function (Constructor, key) {
  defineProperty$3(Constructor[PROTOTYPE], key, {
    get: function () {
      return getInternalState$3(this)[key];
    }
  });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex$1(index);
  var store = getInternalState$3(view);
  if (intIndex + count > store.byteLength) throw RangeError$6(WRONG_INDEX);
  var bytes = getInternalState$3(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySlice$4(bytes, start, start + count);
  return isLittleEndian ? pack : reverse(pack);
};

var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex$1(index);
  var store = getInternalState$3(view);
  if (intIndex + count > store.byteLength) throw RangeError$6(WRONG_INDEX);
  var bytes = getInternalState$3(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);

  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance$4(this, ArrayBufferPrototype$1);
    var byteLength = toIndex$1(length);
    setInternalState$5(this, {
      bytes: fill(Array$4(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS$5) this.byteLength = byteLength;
  };

  ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance$4(this, DataViewPrototype);
    anInstance$4(buffer, ArrayBufferPrototype$1);
    var bufferLength = getInternalState$3(buffer).byteLength;
    var offset = toIntegerOrInfinity$2(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError$6('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength$1(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError$6(WRONG_LENGTH$1);
    setInternalState$5(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });

    if (!DESCRIPTORS$5) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype = $DataView[PROTOTYPE];

  if (DESCRIPTORS$5) {
    addGetter$1($ArrayBuffer, 'byteLength');
    addGetter$1($DataView, 'buffer');
    addGetter$1($DataView, 'byteLength');
    addGetter$1($DataView, 'byteOffset');
  }

  redefineAll$1(DataViewPrototype, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset
    /* , littleEndian */
    ) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset
    /* , littleEndian */
    ) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset
    /* , littleEndian */
    ) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset
    /* , littleEndian */
    ) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset
    /* , littleEndian */
    ) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset
    /* , littleEndian */
    ) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set$1(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set$1(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value
    /* , littleEndian */
    ) {
      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value
    /* , littleEndian */
    ) {
      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value
    /* , littleEndian */
    ) {
      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value
    /* , littleEndian */
    ) {
      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value
    /* , littleEndian */
    ) {
      set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value
    /* , littleEndian */
    ) {
      set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$1 && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */

  if (!fails$6(function () {
    NativeArrayBuffer(1);
  }) || !fails$6(function () {
    new NativeArrayBuffer(-1);
  }) || fails$6(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME$1;
  })) {
    /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$4(this, ArrayBufferPrototype$1);
      return new NativeArrayBuffer(toIndex$1(length));
    };

    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype$1;

    for (var keys = getOwnPropertyNames$1(NativeArrayBuffer), j = 0, key$1; keys.length > j;) {
      if (!((key$1 = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty$4($ArrayBuffer, key$1, NativeArrayBuffer[key$1]);
      }
    }

    ArrayBufferPrototype$1.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME$1) {
    createNonEnumerableProperty$4(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  } // WebKit bug - the same parent prototype for typed arrays and data view


  if (setPrototypeOf$2 && getPrototypeOf$1(DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf$2(DataViewPrototype, ObjectPrototype);
  } // iOS Safari 7.x bug


  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = uncurryThis$8(DataViewPrototype.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll$1(DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, {
    unsafe: true
  });
}

setToStringTag$3($ArrayBuffer, ARRAY_BUFFER);
setToStringTag$3($DataView, DATA_VIEW);
var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

var isObject$4 = isObject$f;
var floor$3 = Math.floor; // `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe

var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
  return !isObject$4(it) && isFinite(it) && floor$3(it) === it;
};

var global$g = global$10;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$c;
var RangeError$5 = global$g.RangeError;

var toPositiveInteger$1 = function (it) {
  var result = toIntegerOrInfinity$1(it);
  if (result < 0) throw RangeError$5("The argument can't be less than 0");
  return result;
};

var global$f = global$10;
var toPositiveInteger = toPositiveInteger$1;
var RangeError$4 = global$f.RangeError;

var toOffset$2 = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError$4('Wrong offset');
  return offset;
};

var bind$5 = functionBindContext;
var call$7 = functionCall;
var aConstructor = aConstructor$2;
var toObject$3 = toObject$9;
var lengthOfArrayLike$5 = lengthOfArrayLike$b;
var getIterator$2 = getIterator$4;
var getIteratorMethod$2 = getIteratorMethod$5;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;

var typedArrayFrom$2 = function from(source
/* , mapfn, thisArg */
) {
  var C = aConstructor(this);
  var O = toObject$3(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod$2(O);
  var i, length, result, step, iterator, next;

  if (iteratorMethod && !isArrayIteratorMethod$1(iteratorMethod)) {
    iterator = getIterator$2(O, iteratorMethod);
    next = iterator.next;
    O = [];

    while (!(step = call$7(next, iterator)).done) {
      O.push(step.value);
    }
  }

  if (mapping && argumentsLength > 2) {
    mapfn = bind$5(mapfn, arguments[2]);
  }

  length = lengthOfArrayLike$5(O);
  result = new (aTypedArrayConstructor$2(C))(length);

  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }

  return result;
};

var classof$4 = classofRaw$1; // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$1 = Array.isArray || function isArray(argument) {
  return classof$4(argument) == 'Array';
};

var global$e = global$10;
var isArray = isArray$1;
var isConstructor$2 = isConstructor$4;
var isObject$3 = isObject$f;
var wellKnownSymbol$5 = wellKnownSymbol$o;
var SPECIES$1 = wellKnownSymbol$5('species');
var Array$3 = global$e.Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor$2(C) && (C === Array$3 || isArray(C.prototype))) C = undefined;else if (isObject$3(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array$3 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate$1 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind$4 = functionBindContext;
var uncurryThis$7 = functionUncurryThis;
var IndexedObject$1 = indexedObject;
var toObject$2 = toObject$9;
var lengthOfArrayLike$4 = lengthOfArrayLike$b;
var arraySpeciesCreate = arraySpeciesCreate$1;
var push$4 = uncurryThis$7([].push); // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$2($this);
    var self = IndexedObject$1(O);
    var boundFunction = bind$4(callbackfn, that);
    var length = lengthOfArrayLike$4(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3:
            return true;
          // some

          case 5:
            return value;
          // find

          case 6:
            return index;
          // findIndex

          case 2:
            push$4(target, value);
          // filter
        } else switch (TYPE) {
          case 4:
            return false;
          // every

          case 7:
            push$4(target, value);
          // filterReject
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};

var getBuiltIn$2 = getBuiltIn$c;
var definePropertyModule$1 = objectDefineProperty;
var wellKnownSymbol$4 = wellKnownSymbol$o;
var DESCRIPTORS$4 = descriptors;
var SPECIES = wellKnownSymbol$4('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$1.f;

  if (DESCRIPTORS$4 && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var $$7 = _export;
var global$d = global$10;
var call$6 = functionCall;
var DESCRIPTORS$3 = descriptors;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$2 = typedArrayConstructorsRequireWrappers;
var ArrayBufferViewCore$4 = arrayBufferViewCore;
var ArrayBufferModule = arrayBuffer;
var anInstance$3 = anInstance$5;
var createPropertyDescriptor$2 = createPropertyDescriptor$9;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$d;
var isIntegralNumber = isIntegralNumber$1;
var toLength = toLength$6;
var toIndex = toIndex$2;
var toOffset$1 = toOffset$2;
var toPropertyKey = toPropertyKey$4;
var hasOwn$5 = hasOwnProperty_1;
var classof$3 = classof$c;
var isObject$2 = isObject$f;
var isSymbol$1 = isSymbol$4;
var create$1 = objectCreate;
var isPrototypeOf = objectIsPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var typedArrayFrom$1 = typedArrayFrom$2;
var forEach = arrayIteration.forEach;
var setSpecies = setSpecies$1;
var definePropertyModule = objectDefineProperty;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var InternalStateModule$4 = internalState;
var inheritIfRequired$1 = inheritIfRequired$3;
var getInternalState$2 = InternalStateModule$4.get;
var setInternalState$4 = InternalStateModule$4.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError$3 = global$d.RangeError;
var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer$1.prototype;
var DataView$1 = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$4.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore$4.TYPED_ARRAY_CONSTRUCTOR;
var TYPED_ARRAY_TAG = ArrayBufferViewCore$4.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore$4.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore$4.TypedArrayPrototype;
var aTypedArrayConstructor$1 = ArrayBufferViewCore$4.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore$4.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  aTypedArrayConstructor$1(C);
  var index = 0;
  var length = list.length;
  var result = new C(length);

  while (length > index) result[index] = list[index++];

  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, {
    get: function () {
      return getInternalState$2(this)[key];
    }
  });
};

var isArrayBuffer = function (it) {
  var klass;
  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof$3(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target) && !isSymbol$1(key) && key in target && isIntegralNumber(+key) && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key) ? createPropertyDescriptor$2(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);

  if (isTypedArrayIndex(target, key) && isObject$2(descriptor) && hasOwn$5(descriptor, 'value') && !hasOwn$5(descriptor, 'get') && !hasOwn$5(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
  && !descriptor.configurable && (!hasOwn$5(descriptor, 'writable') || descriptor.writable) && (!hasOwn$5(descriptor, 'enumerable') || descriptor.enumerable)) {
    target[key] = descriptor.value;
    return target;
  }

  return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS$3) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $$7({
    target: 'Object',
    stat: true,
    forced: !NATIVE_ARRAY_BUFFER_VIEWS
  }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global$d[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState$2(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState$2(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance$3(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;

        if (!isObject$2(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer$1(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset$1(offset, BYTES);
          var $len = data.byteLength;

          if ($length === undefined) {
            if ($len % BYTES) throw RangeError$3(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError$3(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError$3(WRONG_LENGTH);
          }

          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return call$6(typedArrayFrom$1, TypedArrayConstructor, data);
        }

        setInternalState$4(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView$1(buffer)
        });

        while (index < length) addElement(that, index++);
      });
      if (setPrototypeOf$1) setPrototypeOf$1(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$1(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$2) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance$3(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired$1(function () {
          if (!isObject$2(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return call$6(typedArrayFrom$1, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });
      if (setPrototypeOf$1) setPrototypeOf$1(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty$3(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR, TypedArrayConstructor);

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
    $$7({
      global: true,
      forced: TypedArrayConstructor != NativeTypedArrayConstructor,
      sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty$3(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else typedArrayConstructor.exports = function () {
  /* empty */
};

var createTypedArrayConstructor$8 = typedArrayConstructor.exports; // `Float32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor$8('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$7 = typedArrayConstructor.exports; // `Float64Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor$7('Float64', function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$6 = typedArrayConstructor.exports; // `Int8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor$6('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$5 = typedArrayConstructor.exports; // `Int16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor$5('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$4 = typedArrayConstructor.exports; // `Int32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor$4('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$3 = typedArrayConstructor.exports; // `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor$3('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$2 = typedArrayConstructor.exports; // `Uint8ClampedArray` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor$2('Uint8', function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

var createTypedArrayConstructor$1 = typedArrayConstructor.exports; // `Uint16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor$1('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor = typedArrayConstructor.exports; // `Uint32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects

createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var ArrayBufferViewCore$3 = arrayBufferViewCore;
var lengthOfArrayLike$3 = lengthOfArrayLike$b;
var toIntegerOrInfinity = toIntegerOrInfinity$c;
var aTypedArray$2 = ArrayBufferViewCore$3.aTypedArray;
var exportTypedArrayMethod$2 = ArrayBufferViewCore$3.exportTypedArrayMethod; // `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method

exportTypedArrayMethod$2('at', function at(index) {
  var O = aTypedArray$2(this);
  var len = lengthOfArrayLike$3(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return k < 0 || k >= len ? undefined : O[k];
});

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1 = typedArrayConstructorsRequireWrappers;
var exportTypedArrayStaticMethod$1 = arrayBufferViewCore.exportTypedArrayStaticMethod;
var typedArrayFrom = typedArrayFrom$2; // `%TypedArray%.from` method
// https://tc39.es/ecma262/#sec-%typedarray%.from

exportTypedArrayStaticMethod$1('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1);

var ArrayBufferViewCore$2 = arrayBufferViewCore;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
var aTypedArrayConstructor = ArrayBufferViewCore$2.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore$2.exportTypedArrayStaticMethod; // `%TypedArray%.of` method
// https://tc39.es/ecma262/#sec-%typedarray%.of

exportTypedArrayStaticMethod('of', function
  /* ...items */
of() {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);

  while (length > index) result[index] = arguments[index++];

  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

var global$c = global$10;
var call$5 = functionCall;
var ArrayBufferViewCore$1 = arrayBufferViewCore;
var lengthOfArrayLike$2 = lengthOfArrayLike$b;
var toOffset = toOffset$2;
var toIndexedObject$1 = toObject$9;
var fails$5 = fails$t;
var RangeError$2 = global$c.RangeError;
var Int8Array = global$c.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
var exportTypedArrayMethod$1 = ArrayBufferViewCore$1.exportTypedArrayMethod;
var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails$5(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call$5($set, array, {
    length: 1,
    0: 3
  }, 1);
  return array[1] !== 3;
}); // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other

var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$1.NATIVE_ARRAY_BUFFER_VIEWS && fails$5(function () {
  var array = new Int8Array(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
}); // `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set

exportTypedArrayMethod$1('set', function set(arrayLike
/* , offset */
) {
  aTypedArray$1(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject$1(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call$5($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike$2(src);
  var index = 0;
  if (len + offset > length) throw RangeError$2('Wrong length');

  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

var arraySlice$3 = arraySliceSimple;
var floor$2 = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor$2(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(array, mergeSort(arraySlice$3(array, 0, middle), comparefn), mergeSort(arraySlice$3(array, middle), comparefn), comparefn);
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];

    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }

    if (j !== i++) array[j] = element;
  }

  return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
  }

  return array;
};

var arraySort$1 = mergeSort;

var userAgent$2 = engineUserAgent;
var firefox = userAgent$2.match(/firefox\/(\d+)/i);
var engineFfVersion = !!firefox && +firefox[1];

var UA = engineUserAgent;
var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent$1 = engineUserAgent;
var webkit = userAgent$1.match(/AppleWebKit\/(\d+)\./);
var engineWebkitVersion = !!webkit && +webkit[1];

var global$b = global$10;
var uncurryThis$6 = functionUncurryThis;
var fails$4 = fails$t;
var aCallable = aCallable$7;
var internalSort = arraySort$1;
var ArrayBufferViewCore = arrayBufferViewCore;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;
var Array$2 = global$b.Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array = global$b.Uint16Array;
var un$Sort = Uint16Array && uncurryThis$6(Uint16Array.prototype.sort); // WebKit

var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails$4(function () {
  un$Sort(new Uint16Array(2), null);
}) && fails$4(function () {
  un$Sort(new Uint16Array(2), {});
}));
var STABLE_SORT = !!un$Sort && !fails$4(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;
  var array = new Uint16Array(516);
  var expected = Array$2(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  un$Sort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0; // eslint-disable-next-line no-self-compare -- NaN check

    if (y !== y) return -1; // eslint-disable-next-line no-self-compare -- NaN check

    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
}; // `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort


exportTypedArrayMethod('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable(comparefn);
  if (STABLE_SORT) return un$Sort(this, comparefn);
  return internalSort(aTypedArray(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var documentCreateElement = documentCreateElement$2;
var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var $$6 = _export;
var call$4 = functionCall;
var FunctionName = functionName;
var isCallable$3 = isCallable$o;
var createIteratorConstructor$1 = createIteratorConstructor$3;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag$2 = setToStringTag$6;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$d;
var redefine$2 = redefine$a.exports;
var wellKnownSymbol$3 = wellKnownSymbol$o;
var Iterators$1 = iterators;
var IteratorsCore = iteratorsCore;
var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$3 = wellKnownSymbol$3('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () {
  return this;
};

var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor$1(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$3] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$3(CurrentIteratorPrototype[ITERATOR$3])) {
          redefine$2(CurrentIteratorPrototype, ITERATOR$3, returnThis);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;

      defaultIterator = function values() {
        return call$4(nativeIterator, this);
      };
    }
  } // export additional methods


  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine$2(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$6({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  } // define iterator


  if (IterablePrototype[ITERATOR$3] !== defaultIterator) {
    redefine$2(IterablePrototype, ITERATOR$3, defaultIterator, {
      name: DEFAULT
    });
  }

  Iterators$1[NAME] = defaultIterator;
  return methods;
};

var toIndexedObject = toIndexedObject$6;
var addToUnscopables = addToUnscopables$4;
var Iterators = iterators;
var InternalStateModule$3 = internalState;
var defineProperty$2 = objectDefineProperty.f;
var defineIterator$1 = defineIterator$2;
var DESCRIPTORS$2 = descriptors;
var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$3 = InternalStateModule$3.set;
var getInternalState$1 = InternalStateModule$3.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
  setInternalState$3(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject

var values = Iterators.Arguments = Iterators.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries'); // V8 ~ Chrome 45- bug

if (DESCRIPTORS$2 && values.name !== 'values') try {
  defineProperty$2(values, 'name', {
    value: 'values'
  });
} catch (error) {
  /* empty */
}

var global$a = global$10;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$d;
var wellKnownSymbol$2 = wellKnownSymbol$o;
var ITERATOR$2 = wellKnownSymbol$2('iterator');
var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$a[COLLECTION_NAME] && global$a[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var domExceptionConstants = {
  IndexSizeError: {
    s: 'INDEX_SIZE_ERR',
    c: 1,
    m: 1
  },
  DOMStringSizeError: {
    s: 'DOMSTRING_SIZE_ERR',
    c: 2,
    m: 0
  },
  HierarchyRequestError: {
    s: 'HIERARCHY_REQUEST_ERR',
    c: 3,
    m: 1
  },
  WrongDocumentError: {
    s: 'WRONG_DOCUMENT_ERR',
    c: 4,
    m: 1
  },
  InvalidCharacterError: {
    s: 'INVALID_CHARACTER_ERR',
    c: 5,
    m: 1
  },
  NoDataAllowedError: {
    s: 'NO_DATA_ALLOWED_ERR',
    c: 6,
    m: 0
  },
  NoModificationAllowedError: {
    s: 'NO_MODIFICATION_ALLOWED_ERR',
    c: 7,
    m: 1
  },
  NotFoundError: {
    s: 'NOT_FOUND_ERR',
    c: 8,
    m: 1
  },
  NotSupportedError: {
    s: 'NOT_SUPPORTED_ERR',
    c: 9,
    m: 1
  },
  InUseAttributeError: {
    s: 'INUSE_ATTRIBUTE_ERR',
    c: 10,
    m: 1
  },
  InvalidStateError: {
    s: 'INVALID_STATE_ERR',
    c: 11,
    m: 1
  },
  SyntaxError: {
    s: 'SYNTAX_ERR',
    c: 12,
    m: 1
  },
  InvalidModificationError: {
    s: 'INVALID_MODIFICATION_ERR',
    c: 13,
    m: 1
  },
  NamespaceError: {
    s: 'NAMESPACE_ERR',
    c: 14,
    m: 1
  },
  InvalidAccessError: {
    s: 'INVALID_ACCESS_ERR',
    c: 15,
    m: 1
  },
  ValidationError: {
    s: 'VALIDATION_ERR',
    c: 16,
    m: 0
  },
  TypeMismatchError: {
    s: 'TYPE_MISMATCH_ERR',
    c: 17,
    m: 1
  },
  SecurityError: {
    s: 'SECURITY_ERR',
    c: 18,
    m: 1
  },
  NetworkError: {
    s: 'NETWORK_ERR',
    c: 19,
    m: 1
  },
  AbortError: {
    s: 'ABORT_ERR',
    c: 20,
    m: 1
  },
  URLMismatchError: {
    s: 'URL_MISMATCH_ERR',
    c: 21,
    m: 1
  },
  QuotaExceededError: {
    s: 'QUOTA_EXCEEDED_ERR',
    c: 22,
    m: 1
  },
  TimeoutError: {
    s: 'TIMEOUT_ERR',
    c: 23,
    m: 1
  },
  InvalidNodeTypeError: {
    s: 'INVALID_NODE_TYPE_ERR',
    c: 24,
    m: 1
  },
  DataCloneError: {
    s: 'DATA_CLONE_ERR',
    c: 25,
    m: 1
  }
};

var $$5 = _export;
var getBuiltIn$1 = getBuiltIn$c;
var createPropertyDescriptor$1 = createPropertyDescriptor$9;
var defineProperty$1 = objectDefineProperty.f;
var hasOwn$4 = hasOwnProperty_1;
var anInstance$2 = anInstance$5;
var inheritIfRequired = inheritIfRequired$3;
var normalizeStringArgument = normalizeStringArgument$3;
var DOMExceptionConstants = domExceptionConstants;
var clearErrorStack = clearErrorStack$3;
var DOM_EXCEPTION = 'DOMException';
var Error$2 = getBuiltIn$1('Error');
var NativeDOMException = getBuiltIn$1(DOM_EXCEPTION);

var $DOMException = function DOMException() {
  anInstance$2(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var that = new NativeDOMException(message, name);
  var error = Error$2(message);
  error.name = DOM_EXCEPTION;
  defineProperty$1(that, 'stack', createPropertyDescriptor$1(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired(that, this, $DOMException);
  return that;
};

var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;
var ERROR_HAS_STACK = ('stack' in Error$2(DOM_EXCEPTION));
var DOM_EXCEPTION_HAS_STACK = ('stack' in new NativeDOMException(1, 2));
var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !DOM_EXCEPTION_HAS_STACK; // `DOMException` constructor patch for `.stack` where it's required
// https://webidl.spec.whatwg.org/#es-DOMException-specialness

$$5({
  global: true,
  forced: FORCED_CONSTRUCTOR
}, {
  // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});
var PolyfilledDOMException = getBuiltIn$1(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  {
    defineProperty$1(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor$1(1, PolyfilledDOMException));
  }

  for (var key in DOMExceptionConstants) if (hasOwn$4(DOMExceptionConstants, key)) {
    var constant = DOMExceptionConstants[key];
    var constantName = constant.s;

    if (!hasOwn$4(PolyfilledDOMException, constantName)) {
      defineProperty$1(PolyfilledDOMException, constantName, createPropertyDescriptor$1(6, constant.c));
    }
  }
}

var uncurryThis$5 = functionUncurryThis;
var arraySlice$2 = uncurryThis$5([].slice);

var global$9 = global$10;
var TypeError$4 = global$9.TypeError;

var validateArgumentsLength$4 = function (passed, required) {
  if (passed < required) throw TypeError$4('Not enough arguments');
  return passed;
};

var userAgent = engineUserAgent;
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

var classof$2 = classofRaw$1;
var global$8 = global$10;
var engineIsNode = classof$2(global$8.process) == 'process';

var global$7 = global$10;
var apply = functionApply;
var bind$3 = functionBindContext;
var isCallable$2 = isCallable$o;
var hasOwn$3 = hasOwnProperty_1;
var fails$3 = fails$t;
var html = html$2;
var arraySlice$1 = arraySlice$2;
var createElement = documentCreateElement$2;
var validateArgumentsLength$3 = validateArgumentsLength$4;
var IS_IOS = engineIsIos;
var IS_NODE = engineIsNode;
var set = global$7.setImmediate;
var clear = global$7.clearImmediate;
var process = global$7.process;
var Dispatch = global$7.Dispatch;
var Function$1 = global$7.Function;
var MessageChannel = global$7.MessageChannel;
var String$1 = global$7.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global$7.location;
} catch (error) {
  /* empty */
}

var run = function (id) {
  if (hasOwn$3(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$7.postMessage(String$1(id), location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength$3(arguments.length, 1);
    var fn = isCallable$2(handler) ? handler : Function$1(handler);
    var args = arraySlice$1(arguments, 1);

    queue[++counter] = function () {
      apply(fn, undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$3(port.postMessage, port); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global$7.addEventListener && isCallable$2(global$7.postMessage) && !global$7.importScripts && location && location.protocol !== 'file:' && !fails$3(post)) {
    defer = post;
    global$7.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var $$4 = _export;
var global$6 = global$10;
var task = task$1;
var FORCED = !global$6.setImmediate || !global$6.clearImmediate; // http://w3c.github.io/setImmediate/

$$4({
  global: true,
  bind: true,
  enumerable: true,
  forced: FORCED
}, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});

var $$3 = _export;
var global$5 = global$10;
var getBuiltin = getBuiltIn$c;
var uncurryThis$4 = functionUncurryThis;
var fails$2 = fails$t;
var uid = uid$4;
var isCallable$1 = isCallable$o;
var isConstructor$1 = isConstructor$4;
var isObject$1 = isObject$f;
var isSymbol = isSymbol$4;
var iterate = iterate$4;
var anObject$2 = anObject$h;
var classof$1 = classof$c;
var hasOwn$2 = hasOwnProperty_1;
var createProperty$1 = createProperty$3;
var createNonEnumerableProperty = createNonEnumerableProperty$d;
var lengthOfArrayLike$1 = lengthOfArrayLike$b;
var validateArgumentsLength$2 = validateArgumentsLength$4;
var regExpFlags = regexpFlags$1;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;
var Object$1 = global$5.Object;
var Date = global$5.Date;
var Error$1 = global$5.Error;
var EvalError = global$5.EvalError;
var RangeError$1 = global$5.RangeError;
var ReferenceError = global$5.ReferenceError;
var SyntaxError = global$5.SyntaxError;
var TypeError$3 = global$5.TypeError;
var URIError = global$5.URIError;
var PerformanceMark = global$5.PerformanceMark;
var WebAssembly = global$5.WebAssembly;
var CompileError = WebAssembly && WebAssembly.CompileError || Error$1;
var LinkError = WebAssembly && WebAssembly.LinkError || Error$1;
var RuntimeError = WebAssembly && WebAssembly.RuntimeError || Error$1;
var DOMException = getBuiltin('DOMException');
var Set = getBuiltin('Set');
var Map = getBuiltin('Map');
var MapPrototype = Map.prototype;
var mapHas = uncurryThis$4(MapPrototype.has);
var mapGet = uncurryThis$4(MapPrototype.get);
var mapSet = uncurryThis$4(MapPrototype.set);
var setAdd = uncurryThis$4(Set.prototype.add);
var objectKeys$1 = getBuiltin('Object', 'keys');
var push$3 = uncurryThis$4([].push);
var booleanValueOf = uncurryThis$4(true.valueOf);
var numberValueOf = uncurryThis$4(1.0.valueOf);
var stringValueOf = uncurryThis$4(''.valueOf);
var getFlags = uncurryThis$4(regExpFlags);
var getTime = uncurryThis$4(Date.prototype.getTime);
var PERFORMANCE_MARK = uid('structuredClone');
var DATA_CLONE_ERROR = 'DataCloneError';
var TRANSFERRING = 'Transferring';

var checkBasicSemantic = function (structuredCloneImplementation) {
  return !fails$2(function () {
    var set1 = new global$5.Set([7]);
    var set2 = structuredCloneImplementation(set1);
    var number = structuredCloneImplementation(Object$1(7));
    return set2 == set1 || !set2.has(7) || typeof number != 'object' || number != 7;
  }) && structuredCloneImplementation;
}; // https://github.com/whatwg/html/pull/5749


var checkNewErrorsSemantic = function (structuredCloneImplementation) {
  return !fails$2(function () {
    var test = structuredCloneImplementation(new global$5.AggregateError([1], PERFORMANCE_MARK, {
      cause: 3
    }));
    return test.name != 'AggregateError' || test.errors[0] != 1 || test.message != PERFORMANCE_MARK || test.cause != 3;
  }) && structuredCloneImplementation;
}; // FF94+, Safari TP134+, Chrome Canary 98+, NodeJS 17.0+, Deno 1.13+
// current FF and Safari implementations can't clone errors
// https://bugzilla.mozilla.org/show_bug.cgi?id=1556604
// no one of current implementations supports new (html/5749) error cloning semantic


var nativeStructuredClone = global$5.structuredClone;
var FORCED_REPLACEMENT = !checkNewErrorsSemantic(nativeStructuredClone); // Chrome 82+, Safari 14.1+, Deno 1.11+
// Chrome 78-81 implementation swaps `.name` and `.message` of cloned `DOMException`
// Safari 14.1 implementation doesn't clone some `RegExp` flags, so requires a workaround
// current Safari implementation can't clone errors
// Deno 1.2-1.10 implementations too naive
// NodeJS 16.0+ does not have `PerformanceMark` constructor, structured cloning implementation
//   from `performance.mark` is too naive and can't clone, for example, `RegExp` or some boxed primitives
//   https://github.com/nodejs/node/issues/40840
// no one of current implementations supports new (html/5749) error cloning semantic

var structuredCloneFromMark = !nativeStructuredClone && checkBasicSemantic(function (value) {
  return new PerformanceMark(PERFORMANCE_MARK, {
    detail: value
  }).detail;
});
var nativeRestrictedStructuredClone = checkBasicSemantic(nativeStructuredClone) || structuredCloneFromMark;

var throwUncloneable = function (type) {
  throw new DOMException('Uncloneable type: ' + type, DATA_CLONE_ERROR);
};

var throwUnpolyfillable = function (type, kind) {
  throw new DOMException((kind || 'Cloning') + ' of ' + type + ' cannot be properly polyfilled in this engine', DATA_CLONE_ERROR);
};

var structuredCloneInternal = function (value, map) {
  if (isSymbol(value)) throwUncloneable('Symbol');
  if (!isObject$1(value)) return value; // effectively preserves circular references

  if (map) {
    if (mapHas(map, value)) return mapGet(map, value);
  } else map = new Map();

  var type = classof$1(value);
  var deep = false;
  var C, name, cloned, dataTransfer, i, length, keys, key, source, target;

  switch (type) {
    case 'Array':
      cloned = [];
      deep = true;
      break;

    case 'Object':
      cloned = {};
      deep = true;
      break;

    case 'Map':
      cloned = new Map();
      deep = true;
      break;

    case 'Set':
      cloned = new Set();
      deep = true;
      break;

    case 'RegExp':
      // in this block because of a Safari 14.1 bug
      // old FF does not clone regexes passed to the constructor, so get the source and flags directly
      cloned = new RegExp(value.source, 'flags' in value ? value.flags : getFlags(value));
      break;

    case 'Error':
      name = value.name;

      switch (name) {
        case 'AggregateError':
          cloned = getBuiltin('AggregateError')([]);
          break;

        case 'EvalError':
          cloned = EvalError();
          break;

        case 'RangeError':
          cloned = RangeError$1();
          break;

        case 'ReferenceError':
          cloned = ReferenceError();
          break;

        case 'SyntaxError':
          cloned = SyntaxError();
          break;

        case 'TypeError':
          cloned = TypeError$3();
          break;

        case 'URIError':
          cloned = URIError();
          break;

        case 'CompileError':
          cloned = CompileError();
          break;

        case 'LinkError':
          cloned = LinkError();
          break;

        case 'RuntimeError':
          cloned = RuntimeError();
          break;

        default:
          cloned = Error$1();
      }

      deep = true;
      break;

    case 'DOMException':
      cloned = new DOMException(value.message, value.name);
      deep = true;
      break;

    case 'DataView':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'BigInt64Array':
    case 'BigUint64Array':
      C = global$5[type]; // in some old engines like Safari 9, typeof C is 'object'
      // on Uint8ClampedArray or some other constructors

      if (!isObject$1(C)) throwUnpolyfillable(type);
      cloned = new C( // this is safe, since arraybuffer cannot have circular references
      structuredCloneInternal(value.buffer, map), value.byteOffset, type === 'DataView' ? value.byteLength : value.length);
      break;

    case 'DOMQuad':
      try {
        cloned = new DOMQuad(structuredCloneInternal(value.p1, map), structuredCloneInternal(value.p2, map), structuredCloneInternal(value.p3, map), structuredCloneInternal(value.p4, map));
      } catch (error) {
        if (nativeRestrictedStructuredClone) {
          cloned = nativeRestrictedStructuredClone(value);
        } else throwUnpolyfillable(type);
      }

      break;

    case 'FileList':
      C = global$5.DataTransfer;

      if (isConstructor$1(C)) {
        dataTransfer = new C();

        for (i = 0, length = lengthOfArrayLike$1(value); i < length; i++) {
          dataTransfer.items.add(structuredCloneInternal(value[i], map));
        }

        cloned = dataTransfer.files;
      } else if (nativeRestrictedStructuredClone) {
        cloned = nativeRestrictedStructuredClone(value);
      } else throwUnpolyfillable(type);

      break;

    case 'ImageData':
      // Safari 9 ImageData is a constructor, but typeof ImageData is 'object'
      try {
        cloned = new ImageData(structuredCloneInternal(value.data, map), value.width, value.height, {
          colorSpace: value.colorSpace
        });
      } catch (error) {
        if (nativeRestrictedStructuredClone) {
          cloned = nativeRestrictedStructuredClone(value);
        } else throwUnpolyfillable(type);
      }

      break;

    default:
      if (nativeRestrictedStructuredClone) {
        cloned = nativeRestrictedStructuredClone(value);
      } else switch (type) {
        case 'BigInt':
          // can be a 3rd party polyfill
          cloned = Object$1(value.valueOf());
          break;

        case 'Boolean':
          cloned = Object$1(booleanValueOf(value));
          break;

        case 'Number':
          cloned = Object$1(numberValueOf(value));
          break;

        case 'String':
          cloned = Object$1(stringValueOf(value));
          break;

        case 'Date':
          cloned = new Date(getTime(value));
          break;

        case 'ArrayBuffer':
          C = global$5.DataView; // `ArrayBuffer#slice` is not available in IE10
          // `ArrayBuffer#slice` and `DataView` are not available in old FF

          if (!C && typeof value.slice != 'function') throwUnpolyfillable(type); // detached buffers throws in `DataView` and `.slice`

          try {
            if (typeof value.slice == 'function') {
              cloned = value.slice(0);
            } else {
              length = value.byteLength;
              cloned = new ArrayBuffer(length);
              source = new C(value);
              target = new C(cloned);

              for (i = 0; i < length; i++) {
                target.setUint8(i, source.getUint8(i));
              }
            }
          } catch (error) {
            throw new DOMException('ArrayBuffer is detached', DATA_CLONE_ERROR);
          }

          break;

        case 'SharedArrayBuffer':
          // SharedArrayBuffer should use shared memory, we can't polyfill it, so return the original
          cloned = value;
          break;

        case 'Blob':
          try {
            cloned = value.slice(0, value.size, value.type);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'DOMPoint':
        case 'DOMPointReadOnly':
          C = global$5[type];

          try {
            cloned = C.fromPoint ? C.fromPoint(value) : new C(value.x, value.y, value.z, value.w);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'DOMRect':
        case 'DOMRectReadOnly':
          C = global$5[type];

          try {
            cloned = C.fromRect ? C.fromRect(value) : new C(value.x, value.y, value.width, value.height);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'DOMMatrix':
        case 'DOMMatrixReadOnly':
          C = global$5[type];

          try {
            cloned = C.fromMatrix ? C.fromMatrix(value) : new C(value);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'AudioData':
        case 'VideoFrame':
          if (!isCallable$1(value.clone)) throwUnpolyfillable(type);

          try {
            cloned = value.clone();
          } catch (error) {
            throwUncloneable(type);
          }

          break;

        case 'File':
          try {
            cloned = new File([value], value.name, value);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'CryptoKey':
        case 'GPUCompilationMessage':
        case 'GPUCompilationInfo':
        case 'ImageBitmap':
        case 'RTCCertificate':
        case 'WebAssembly.Module':
          throwUnpolyfillable(type);
        // break omitted

        default:
          throwUncloneable(type);
      }

  }

  mapSet(map, value, cloned);
  if (deep) switch (type) {
    case 'Array':
    case 'Object':
      keys = objectKeys$1(value);

      for (i = 0, length = lengthOfArrayLike$1(keys); i < length; i++) {
        key = keys[i];
        createProperty$1(cloned, key, structuredCloneInternal(value[key], map));
      }

      break;

    case 'Map':
      value.forEach(function (v, k) {
        mapSet(cloned, structuredCloneInternal(k, map), structuredCloneInternal(v, map));
      });
      break;

    case 'Set':
      value.forEach(function (v) {
        setAdd(cloned, structuredCloneInternal(v, map));
      });
      break;

    case 'Error':
      createNonEnumerableProperty(cloned, 'message', structuredCloneInternal(value.message, map));

      if (hasOwn$2(value, 'cause')) {
        createNonEnumerableProperty(cloned, 'cause', structuredCloneInternal(value.cause, map));
      }

      if (name == 'AggregateError') {
        cloned.errors = structuredCloneInternal(value.errors, map);
      }

    // break omitted

    case 'DOMException':
      if (ERROR_STACK_INSTALLABLE) {
        createNonEnumerableProperty(cloned, 'stack', structuredCloneInternal(value.stack, map));
      }

  }
  return cloned;
};

var PROPER_TRANSFER = nativeStructuredClone && !fails$2(function () {
  var buffer = new ArrayBuffer(8);
  var clone = nativeStructuredClone(buffer, {
    transfer: [buffer]
  });
  return buffer.byteLength != 0 || clone.byteLength != 8;
});

var tryToTransfer = function (rawTransfer, map) {
  if (!isObject$1(rawTransfer)) throw TypeError$3('Transfer option cannot be converted to a sequence');
  var transfer = [];
  iterate(rawTransfer, function (value) {
    push$3(transfer, anObject$2(value));
  });
  var i = 0;
  var length = lengthOfArrayLike$1(transfer);
  var value, type, C, transferredArray, transferred, canvas, context;

  if (PROPER_TRANSFER) {
    transferredArray = nativeStructuredClone(transfer, {
      transfer: transfer
    });

    while (i < length) mapSet(map, transfer[i], transferredArray[i++]);
  } else while (i < length) {
    value = transfer[i++];
    if (mapHas(map, value)) throw new DOMException('Duplicate transferable', DATA_CLONE_ERROR);
    type = classof$1(value);

    switch (type) {
      case 'ImageBitmap':
        C = global$5.OffscreenCanvas;
        if (!isConstructor$1(C)) throwUnpolyfillable(type, TRANSFERRING);

        try {
          canvas = new C(value.width, value.height);
          context = canvas.getContext('bitmaprenderer');
          context.transferFromImageBitmap(value);
          transferred = canvas.transferToImageBitmap();
        } catch (error) {
          /* empty */
        }

        break;

      case 'AudioData':
      case 'VideoFrame':
        if (!isCallable$1(value.clone) || !isCallable$1(value.close)) throwUnpolyfillable(type, TRANSFERRING);

        try {
          transferred = value.clone();
          value.close();
        } catch (error) {
          /* empty */
        }

        break;

      case 'ArrayBuffer':
      case 'MessagePort':
      case 'OffscreenCanvas':
      case 'ReadableStream':
      case 'TransformStream':
      case 'WritableStream':
        throwUnpolyfillable(type, TRANSFERRING);
    }

    if (transferred === undefined) throw new DOMException('This object cannot be transferred: ' + type, DATA_CLONE_ERROR);
    mapSet(map, value, transferred);
  }
};

$$3({
  global: true,
  enumerable: true,
  sham: !PROPER_TRANSFER,
  forced: FORCED_REPLACEMENT
}, {
  structuredClone: function structuredClone(value
  /* , { transfer } */
  ) {
    var options = validateArgumentsLength$2(arguments.length, 1) > 1 ? anObject$2(arguments[1]) : undefined;
    var transfer = options ? options.transfer : undefined;
    var map;

    if (transfer !== undefined) {
      map = new Map();
      tryToTransfer(transfer, map);
    }

    return structuredCloneInternal(value, map);
  }
});

var charAt$2 = stringMultibyte.charAt;
var toString = toString$9;
var InternalStateModule$2 = internalState;
var defineIterator = defineIterator$2;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState = InternalStateModule$2.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt$2(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

var fails$1 = fails$t;
var wellKnownSymbol$1 = wellKnownSymbol$o;
var IS_PURE = isPure;
var ITERATOR$1 = wellKnownSymbol$1('iterator');
var nativeUrl = !fails$1(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return IS_PURE && !url.toJSON || !searchParams.sort || url.href !== 'http://a/c%20d?a=1&c=3' || searchParams.get('c') !== '3' || String(new URLSearchParams('?a=1')) !== 'a=1' || !searchParams[ITERATOR$1] // throws in Edge
  || new URL('https://a@b').username !== 'a' || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' // not punycoded in Edge
  || new URL('http://тест').host !== 'xn--e1aybc' // not escaped in Chrome 62-
  || new URL('http://a#б').hash !== '#%D0%B1' // fails in Chrome 66-
  || result !== 'a1c3' // throws in Safari
  || new URL('http://x', undefined).host !== 'x';
});

var DESCRIPTORS$1 = descriptors;
var uncurryThis$3 = functionUncurryThis;
var call$3 = functionCall;
var fails = fails$t;
var objectKeys = objectKeys$3;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$1 = toObject$9;
var IndexedObject = indexedObject; // eslint-disable-next-line es/no-object-assign -- safe

var $assign = Object.assign; // eslint-disable-next-line es/no-object-defineproperty -- required for testing

var defineProperty = Object.defineProperty;
var concat = uncurryThis$3([].concat); // `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign

var objectAssign = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$1 && $assign({
    b: 1
  }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

  var A = {};
  var B = {}; // eslint-disable-next-line es/no-symbol -- safe

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$1(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;

  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$1 || call$3(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  }

  return T;
} : $assign;

var anObject$1 = anObject$h;
var iteratorClose = iteratorClose$2; // call something on iterator step with safe closing on error

var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

var global$4 = global$10;
var bind$2 = functionBindContext;
var call$2 = functionCall;
var toObject = toObject$9;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$3;
var isConstructor = isConstructor$4;
var lengthOfArrayLike = lengthOfArrayLike$b;
var createProperty = createProperty$3;
var getIterator$1 = getIterator$4;
var getIteratorMethod$1 = getIteratorMethod$5;
var Array$1 = global$4.Array; // `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from

var arrayFrom$1 = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind$2(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod$1(O);
  var index = 0;
  var length, result, step, iterator, next, value; // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod && !(this == Array$1 && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator$1(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];

    for (; !(step = call$2(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array$1(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }

  result.length = index;
  return result;
};

var global$3 = global$10;
var uncurryThis$2 = functionUncurryThis;
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80

var delimiter = '-'; // '\x2D'

var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars

var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var RangeError = global$3.RangeError;
var exec$1 = uncurryThis$2(regexSeparators.exec);
var floor$1 = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis$2(''.charCodeAt);
var join$2 = uncurryThis$2([].join);
var push$2 = uncurryThis$2([].push);
var replace$2 = uncurryThis$2(''.replace);
var split$2 = uncurryThis$2(''.split);
var toLowerCase$1 = uncurryThis$2(''.toLowerCase);
/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */

var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;

  while (counter < length) {
    var value = charCodeAt(string, counter++);

    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);

      if ((extra & 0xFC00) == 0xDC00) {
        // Low surrogate.
        push$2(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push$2(output, value);
        counter--;
      }
    } else {
      push$2(output, value);
    }
  }

  return output;
};
/**
 * Converts a digit/integer into a basic code point.
 */


var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};
/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */


var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$1(delta / damp) : delta >> 1;
  delta += floor$1(delta / numPoints);

  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor$1(delta / baseMinusTMin);
    k += base;
  }

  return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */


var encode = function (input) {
  var output = []; // Convert the input in UCS-2 to an array of Unicode code points.

  input = ucs2decode(input); // Cache the length.

  var inputLength = input.length; // Initialize the state.

  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue; // Handle the basic code points.

  for (i = 0; i < input.length; i++) {
    currentValue = input[i];

    if (currentValue < 0x80) {
      push$2(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.

  var handledCPCount = basicLength; // number of code points that have been handled;
  // Finish the basic string with a delimiter unless it's empty.

  if (basicLength) {
    push$2(output, delimiter);
  } // Main encoding loop:


  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.


    var handledCPCountPlusOne = handledCPCount + 1;

    if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }

      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;

        while (true) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push$2(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$1(qMinusT / baseMinusT);
          k += base;
        }

        push$2(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }

  return join$2(output, '');
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = split$2(replace$2(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
  var i, label;

  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push$2(encoded, exec$1(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }

  return join$2(encoded, '.');
};

var $$2 = _export;
var global$2 = global$10;
var getBuiltIn = getBuiltIn$c;
var call$1 = functionCall;
var uncurryThis$1 = functionUncurryThis;
var USE_NATIVE_URL$1 = nativeUrl;
var redefine$1 = redefine$a.exports;
var redefineAll = redefineAll$2;
var setToStringTag$1 = setToStringTag$6;
var createIteratorConstructor = createIteratorConstructor$3;
var InternalStateModule$1 = internalState;
var anInstance$1 = anInstance$5;
var isCallable = isCallable$o;
var hasOwn$1 = hasOwnProperty_1;
var bind$1 = functionBindContext;
var classof = classof$c;
var anObject = anObject$h;
var isObject = isObject$f;
var $toString$1 = toString$9;
var create = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$9;
var getIterator = getIterator$4;
var getIteratorMethod = getIteratorMethod$5;
var validateArgumentsLength$1 = validateArgumentsLength$4;
var wellKnownSymbol = wellKnownSymbol$o;
var arraySort = arraySort$1;
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalParamsState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);
var n$Fetch = getBuiltIn('fetch');
var N$Request = getBuiltIn('Request');
var Headers = getBuiltIn('Headers');
var RequestPrototype = N$Request && N$Request.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp$1 = global$2.RegExp;
var TypeError$2 = global$2.TypeError;
var decodeURIComponent = global$2.decodeURIComponent;
var encodeURIComponent$1 = global$2.encodeURIComponent;
var charAt$1 = uncurryThis$1(''.charAt);
var join$1 = uncurryThis$1([].join);
var push$1 = uncurryThis$1([].push);
var replace$1 = uncurryThis$1(''.replace);
var shift$1 = uncurryThis$1([].shift);
var splice = uncurryThis$1([].splice);
var split$1 = uncurryThis$1(''.split);
var stringSlice$1 = uncurryThis$1(''.slice);
var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace$1(it, plus, ' ');
  var bytes = 4;

  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace$1(result, percentSequence(bytes--), percentDecode);
    }

    return result;
  }
};

var find = /[!'()~]|%20/g;
var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace$1(encodeURIComponent$1(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState$1(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;

  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  }

  return step;
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);else this.parseQuery(typeof init == 'string' ? charAt$1(init, 0) === '?' ? stringSlice$1(init, 1) : init : $toString$1(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;

      while (!(step = call$1(next, iterator)).done) {
        entryIterator = getIterator(anObject(step.value));
        entryNext = entryIterator.next;
        if ((first = call$1(entryNext, entryIterator)).done || (second = call$1(entryNext, entryIterator)).done || !call$1(entryNext, entryIterator).done) throw TypeError$2('Expected sequence with length 2');
        push$1(this.entries, {
          key: $toString$1(first.value),
          value: $toString$1(second.value)
        });
      }
    } else for (var key in object) if (hasOwn$1(object, key)) {
      push$1(this.entries, {
        key: key,
        value: $toString$1(object[key])
      });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var attributes = split$1(query, '&');
      var index = 0;
      var attribute, entry;

      while (index < attributes.length) {
        attribute = attributes[index++];

        if (attribute.length) {
          entry = split$1(attribute, '=');
          push$1(this.entries, {
            key: deserialize(shift$1(entry)),
            value: deserialize(join$1(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;

    while (index < entries.length) {
      entry = entries[index++];
      push$1(result, serialize(entry.key) + '=' + serialize(entry.value));
    }

    return join$1(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
}; // `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams

var URLSearchParamsConstructor = function
  /* init */
URLSearchParams() {
  anInstance$1(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  setInternalState$1(this, new URLSearchParamsState(init));
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength$1(arguments.length, 2);
    var state = getInternalParamsState(this);
    push$1(state.entries, {
      key: $toString$1(name),
      value: $toString$1(value)
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength$1(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString$1(name);
    var index = 0;

    while (index < entries.length) {
      if (entries[index].key === key) splice(entries, index, 1);else index++;
    }

    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength$1(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$1(name);
    var index = 0;

    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }

    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength$1(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$1(name);
    var result = [];
    var index = 0;

    for (; index < entries.length; index++) {
      if (entries[index].key === key) push$1(result, entries[index].value);
    }

    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength$1(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$1(name);
    var index = 0;

    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }

    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength$1(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString$1(name);
    var val = $toString$1(value);
    var index = 0;
    var entry;

    for (; index < entries.length; index++) {
      entry = entries[index];

      if (entry.key === key) {
        if (found) splice(entries, index--, 1);else {
          found = true;
          entry.value = val;
        }
      }
    }

    if (!found) push$1(entries, {
      key: key,
      value: val
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback
  /* , thisArg */
  ) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind$1(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;

    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, {
  enumerable: true
}); // `URLSearchParams.prototype[@@iterator]` method

redefine$1(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, {
  name: 'entries'
}); // `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior

redefine$1(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, {
  enumerable: true
});
setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
$$2({
  global: true,
  forced: !USE_NATIVE_URL$1
}, {
  URLSearchParams: URLSearchParamsConstructor
}); // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`

if (!USE_NATIVE_URL$1 && isCallable(Headers)) {
  var headersHas = uncurryThis$1(HeadersPrototype.has);
  var headersSet = uncurryThis$1(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;

      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();

        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }

        return create(init, {
          body: createPropertyDescriptor(0, $toString$1(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    }

    return init;
  };

  if (isCallable(n$Fetch)) {
    $$2({
      global: true,
      enumerable: true,
      forced: true
    }, {
      fetch: function fetch(input
      /* , init */
      ) {
        return n$Fetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(N$Request)) {
    var RequestConstructor = function Request(input
    /* , init */
    ) {
      anInstance$1(this, RequestPrototype);
      return new N$Request(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;
    $$2({
      global: true,
      forced: true
    }, {
      Request: RequestConstructor
    });
  }
}

var web_urlSearchParams = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

var $$1 = _export;
var DESCRIPTORS = descriptors;
var USE_NATIVE_URL = nativeUrl;
var global$1 = global$10;
var bind = functionBindContext;
var uncurryThis = functionUncurryThis;
var defineProperties = objectDefineProperties.f;
var redefine = redefine$a.exports;
var anInstance = anInstance$5;
var hasOwn = hasOwnProperty_1;
var assign = objectAssign;
var arrayFrom = arrayFrom$1;
var arraySlice = arraySliceSimple;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var $toString = toString$9;
var setToStringTag = setToStringTag$6;
var validateArgumentsLength = validateArgumentsLength$4;
var URLSearchParamsModule = web_urlSearchParams;
var InternalStateModule = internalState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var NativeURL = global$1.URL;
var TypeError$1 = global$1.TypeError;
var parseInt = global$1.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);
var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';
var ALPHA = /[a-z]/i; // eslint-disable-next-line regexp/no-obscure-range -- safe

var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */

var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */

var EOF; // https://url.spec.whatwg.org/#ipv4-number-parser

var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;

  if (parts.length && parts[parts.length - 1] == '') {
    parts.length--;
  }

  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];

  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;

    if (part.length > 1 && charAt(part, 0) == '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix == 8 ? 1 : 2);
    }

    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }

    push(numbers, number);
  }

  for (index = 0; index < partsLength; index++) {
    number = numbers[index];

    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }

  ipv4 = pop(numbers);

  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }

  return ipv4;
}; // https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO


var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() == ':') {
    if (charAt(input, 1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }

  while (chr()) {
    if (pieceIndex == 8) return;

    if (chr() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }

    value = length = 0;

    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }

    if (chr() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;

      while (chr()) {
        ipv4Piece = null;

        if (numbersSeen > 0) {
          if (chr() == '.' && numbersSeen < 4) pointer++;else return;
        }

        if (!exec(DIGIT, chr())) return;

        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;else if (ipv4Piece == 0) return;else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }

        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }

      if (numbersSeen != 4) return;
      break;
    } else if (chr() == ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;

    address[pieceIndex++] = value;
  }

  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;

    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;

  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;

  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }

      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }

  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }

  return maxIndex;
}; // https://url.spec.whatwg.org/#host-serializing


var serializeHost = function (host) {
  var result, index, compress, ignore0; // ipv4

  if (typeof host == 'number') {
    result = [];

    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    }

    return join(result, '.'); // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);

    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;

      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }

    return '[' + result + ']';
  }

  return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1,
  '"': 1,
  '<': 1,
  '>': 1,
  '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1,
  '?': 1,
  '{': 1,
  '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1,
  ':': 1,
  ';': 1,
  '=': 1,
  '@': 1,
  '[': 1,
  '\\': 1,
  ']': 1,
  '^': 1,
  '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
}; // https://url.spec.whatwg.org/#special-scheme


var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}; // https://url.spec.whatwg.org/#windows-drive-letter

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && exec(ALPHA, charAt(string, 0)) && ((second = charAt(string, 1)) == ':' || !normalized && second == '|');
}; // https://url.spec.whatwg.org/#start-with-a-windows-drive-letter


var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (string.length == 2 || (third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#');
}; // https://url.spec.whatwg.org/#single-dot-path-segment


var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
}; // https://url.spec.whatwg.org/#double-dot-path-segment


var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
}; // States:


var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;

  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw TypeError$1(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw TypeError$1(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;
    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
    }

    input = replace(input, TAB_AND_NEW_LINE, '');
    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];

      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;

          break;

        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
            buffer += toLowerCase(chr);
          } else if (chr == ':') {
            if (stateOverride && (url.isSpecial() != hasOwn(specialSchemes, buffer) || buffer == 'file' && (url.includesCredentials() || url.port !== null) || url.scheme == 'file' && !url.host)) return;
            url.scheme = buffer;

            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
              return;
            }

            buffer = '';

            if (url.scheme == 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;

          break;

        case NO_SCHEME:
          if (!base || base.cannotBeABaseURL && chr != '#') return INVALID_SCHEME;

          if (base.cannotBeABaseURL && chr == '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }

          state = base.scheme == 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          }

          break;

        case PATH_OR_AUTHORITY:
          if (chr == '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;

          if (chr == EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr == '/' || chr == '\\' && url.isSpecial()) {
            state = RELATIVE_SLASH;
          } else if (chr == '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          }

          break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr == '/' || chr == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr == '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          }

          break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr != '/' && chr != '\\') {
            state = AUTHORITY;
            continue;
          }

          break;

        case AUTHORITY:
          if (chr == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);

            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];

              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }

              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;else url.username += encodedCodePoints;
            }

            buffer = '';
          } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial()) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;

          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride == HOSTNAME) return;
          } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial()) {
            if (url.isSpecial() && buffer == '') return INVALID_HOST;
            if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr == '[') seenBracket = true;else if (chr == ']') seenBracket = false;
            buffer += chr;
          }

          break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial() || stateOverride) {
            if (buffer != '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = url.isSpecial() && port === specialSchemes[url.scheme] ? null : port;
              buffer = '';
            }

            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;

          break;

        case FILE:
          url.scheme = 'file';
          if (chr == '/' || chr == '\\') state = FILE_SLASH;else if (base && base.scheme == 'file') {
            if (chr == EOF) {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
            } else if (chr == '?') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.shortenPath();
              }

              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          }
          break;

        case FILE_SLASH:
          if (chr == '/' || chr == '\\') {
            state = FILE_HOST;
            break;
          }

          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);else url.host = base.host;
          }

          state = PATH;
          continue;

        case FILE_HOST:
          if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            }

            continue;
          } else buffer += chr;

          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr != '/' && chr != '\\') continue;
          } else if (!stateOverride && chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            state = PATH;
            if (chr != '/') continue;
          }

          break;

        case PATH:
          if (chr == EOF || chr == '/' || chr == '\\' && url.isSpecial() || !stateOverride && (chr == '?' || chr == '#')) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();

              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else {
              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
              }

              push(url.path, buffer);
            }

            buffer = '';

            if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }

            if (chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          }

          break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          }

          break;

        case QUERY:
          if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            if (chr == "'" && url.isSpecial()) url.query += '%27';else if (chr == '#') url.query += '%23';else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          }

          break;

        case FRAGMENT:
          if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;

    if (charAt(input, 0) == '[') {
      if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result; // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);

      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }

      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username != '' || this.password != '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;

    if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';

    if (host !== null) {
      output += '//';

      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }

      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';

    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw TypeError$1(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme == 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme == 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';

    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';

    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? '' : port === null ? serializeHost(host) : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port == '') this.port = null;else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);

    if (search == '') {
      this.query = null;
    } else {
      if ('?' == charAt(search, 0)) search = stringSlice(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }

    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);

    if (hash == '') {
      this.fragment = null;
      return;
    }

    if ('#' == charAt(hash, 0)) hash = stringSlice(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
}; // `URL` constructor
// https://url.spec.whatwg.org/#url-class

var URLConstructor = function URL(url
/* , base */
) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));

  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor('serialize', 'setHref'),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor('getOrigin'),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor('getProtocol', 'setProtocol'),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor('getUsername', 'setUsername'),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor('getPassword', 'setPassword'),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor('getHost', 'setHost'),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor('getHostname', 'setHostname'),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor('getPort', 'setPort'),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor('getPathname', 'setPathname'),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor('getSearch', 'setSearch'),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor('getSearchParams'),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor('getHash', 'setHash')
  });
} // `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson


redefine(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, {
  enumerable: true
}); // `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior

redefine(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, {
  enumerable: true
});

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL; // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL

  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL)); // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL

  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');
$$1({
  global: true,
  forced: !USE_NATIVE_URL,
  sham: !DESCRIPTORS
}, {
  URL: URLConstructor
});

var $ = _export;
var call = functionCall; // `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson

$({
  target: 'URL',
  proto: true,
  enumerable: true
}, {
  toJSON: function toJSON() {
    return call(URL.prototype.toString, this);
  }
});

const add = (x, y) => x + y;

const mul = (x, y) => x * y;

const addArr = function () {
  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  return arr.reduce((acc, cur) => add(acc, cur));
};

const mulArr = function () {
  for (var _len2 = arguments.length, arr = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    arr[_key2] = arguments[_key2];
  }

  return arr.reduce((acc, cur) => mul(acc, cur));
};

export { addArr as add, mulArr as mul };

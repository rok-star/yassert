# Yassert ✅

Yet another assertion module for JavaScript (Node and Browser).

# Installation

```
npm install yassert
```

# Usage

Basic usage:

```javascript
const { assert } = require('yassert');

// value assertions...
assert(value).optional().equals(123);
assert(value).optional().oneOf(['windows', 'linux', 'darwin']);

// number assertion...
assert(value).required().number().greaterThan(0).lessThan(10);
assert(value).required().number().greaterThanOrEquals(123);
assert(value).required().number().inRange(1, 65535);
assert(value).required().number().even(10);
assert(value).required().number().odd(10);

// string assertion...
assert(value).required().string().lengthOf(10);
assert(value).required().string().notEmpty();

// array assertion...
assert(value).required().array().lengthOf(10);
assert(value).required().array().notEmpty();

// object assertions...
assert(value).required().object().hasOwnProperty('property1');
assert(value).required().object().hasProperty('property2');
assert(value).required().object().prototypeOf(basePrototype);
```

You can also specify additional info:

```javascript
const { assert } = require('yassert');

assert(data, 'Input data').required().object().hasProperty('username')
                                                .hasProperty('password')
                                                .hasProperty('email')
                                                .hasProperty('age');

assert(data.username, 'Input "username"').required().string().notEmpty();
assert(data.password, 'Input "password"').required().string().notEmpty();
assert(data.email, 'Input "email"').optional().string().notEmpty();
assert(data.age, 'Input "age"').optional().number().inRange(1, 200);
```

Also some extra functions are available:

```javascript
const {
    isPrototypeOf,
    isPromise,
    isObject,
    isArray,
    isFunction,
    isString,
    isNumber,
    isDate,
    isBool,
    isNull,
    isSet,
    assert
} = require('yassert');
```

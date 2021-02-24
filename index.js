const isPrototypeOf = (value, proto) => {
	if (!value || !proto) return false;
	let next = value.__proto__;
	while (next && next !== Object) {
		if (next === proto) return true;
		next = next.__proto__;
	}
	return false;
}
const isPromise = value => (toString.call(value) === '[object Promise]');
const isObject = value => (toString.call(value) === '[object Object]');
const isArray = value => Array.isArray(value);
const isFunction = value => ((toString.call(value) === '[object Function]') || (toString.call(value) === '[object AsyncFunction]'));
const isString = value => (toString.call(value) === '[object String]');
const isNumber = value => ((toString.call(value) === '[object Number]') && isFinite(value) && (value !== Number.POSITIVE_INFINITY) && (value !== Number.NEGATIVE_INFINITY));
const isDate = value => (toString.call(value) === '[object Date]');
const isBool = value => ((value === true) || (value === false));
const isNull = value => (value === null || value === undefined);
const assert = (value, description = null) => {
	const valueAssert = {
		equals(rvalue) {
			if ((isset || !optional) && value !== rvalue) throw new Error(`${ description || 'Assert:' } value "${value}" is not equal to "${rvalue}".`);
			return this;
		},
		oneOf(allowed) {
			if (!isArray(allowed)) throw new Error('Assert: "oneOf" accepts only array as first argument.');
			if ((isset || !optional) && !allowed.includes(value)) throw new Error(`${ description || 'Assert:' } value "${value}" is not one of "${allowed.join(', ')}".`);
			return this;
		}
	}
	const objectAssert = Object.assign(Object.create(valueAssert), {
		hasOwnProperty(name) {
			const names = isArray(name) ? name : [name];
			if ((isset || !optional) && !names.every(p => value.hasOwnProperty(p))) throw new Error(`${ description || 'Assert:' } object has no own property "${name}".`);
			return this;
		},
		hasProperty(name) {
			const names = isArray(name) ? name : [name];
			if ((isset || !optional) && !names.every(p => p in value)) throw new Error(`${ description || 'Assert:' } object has no property "${name}".`);
			return this;
		},
		prototypeOf(proto) {
			if ((isset || !optional) && !isPrototypeOf(value, proto)) throw new Error(`${ description || 'Assert:' } object is not prototype of "${proto}".`);
			return this;
		}
	});
	const arrayAssert = Object.assign(Object.create(valueAssert), {
		lengthOf(len) {
			if ((isset || !optional) && !(value.length === len)) throw new Error(`${ description || 'Assert:' } array is not length of "${len}".`);
			return this;
		},
		notEmpty() {
			if ((isset || !optional) && (value.length === 0)) throw new Error(`${ description || 'Assert:' } array "${value}" is empty.`);
			return this;
		}
	});
	const numberAssert = Object.assign(Object.create(valueAssert), {
		greaterThan(rvalue) {
			if ((isset || !optional) && !(value > rvalue)) throw new Error(`${ description || 'Assert:' } value "${value}" is not more than "${rvalue}".`);
			return this;
		},
		greaterThanOrEquals(rvalue) {
			if ((isset || !optional) && !(value >= rvalue)) throw new Error(`${ description || 'Assert:' } value "${value}" is not more than or equal to "${rvalue}".`);
			return this;
		},
		lessThan(rvalue) {
			if ((isset || !optional) && !(value < rvalue)) throw new Error(`${ description || 'Assert:' } value "${value}" is not less than "${rvalue}".`);
			return this;
		},
		lessThanOrEquals(rvalue) {
			if ((isset || !optional) && !(value <= rvalue)) throw new Error(`${ description || 'Assert:' } value "${value}" is not less than or equal to "${rvalue}".`);
			return this;
		},
		odd() {
			if ((isset || !optional) && (value % 2) === 0) throw new Error(`${ description || 'Assert:' } value "${value}" is not odd.`);
			return this;
		},
		even() {
			if ((isset || !optional) && (value % 2) !== 0) throw new Error(`${ description || 'Assert:' } value "${value}" is not even.`);
			return this;
		},
		inRange(from, to) {
			if ((isset || !optional) && (value < from || value > to)) throw new Error(`${ description || 'Assert:' } value "${value}" is not in range ${from}..${to}.`);
			return this;
		}
	});
	const stringAssert = Object.assign(Object.create(valueAssert), {
		lengthOf(len) {
			if ((isset || !optional) && !(value.length === len)) throw new Error(`${ description || 'Assert:' } string "${value}" is not length of "${len}".`);
			return this;
		},
		notEmpty() {
			if ((isset || !optional) && (value.length === 0)) throw new Error(`${ description || 'Assert:' } string "${value}" is empty.`);
			return this;
		}
	});
	const functionAssert = Object.assign(Object.create(valueAssert), {
	});
	const typeAssert = Object.assign(Object.create(valueAssert), {
		object() {
			if ((isset || !optional) && !isObject(value)) throw new Error(`${ description || 'Assert:' } value "${value}" is not an object.`);
			return objectAssert;
		},
		array() {
			if ((isset || !optional) && !isArray(value)) throw new Error(`${ description || 'Assert:' } value "${value}" is not an array.`);
			return arrayAssert;
		},
		number() {
			if ((isset || !optional) && !isNumber(value)) throw new Error(`${ description || 'Assert:' } value "${value}" is not a number.`);
			return numberAssert;
		},
		string() {
			if ((isset || !optional) && !isString(value)) throw new Error(`${ description || 'Assert:' } value "${value}" is not a string.`);
			return stringAssert;
		},
		bool() {
			if ((isset || !optional) && !isBool(value)) throw new Error(`${ description || 'Assert:' } value "${value}" is not a bool.`);
			return valueAssert;
		},
		function() {
			if ((isset || !optional) && !isFunction(value)) throw new Error(`${ description || 'Assert:' } value "${value}" is not a function.`);
			return functionAssert;
		}
	});
	let isset = (value !== null && value !== undefined);
	let optional = false;
	return {
		optional: () => {
			optional = true;
			return typeAssert;
		},
		required: () => {
			optional = false;
			if (value === null || value === undefined) throw new Error(`${ description || 'Assert:' } value is required.`);
			return typeAssert;
		}
	}
}

module.exports = {
	isPrototypeOf,
	isPromise,
	isObject,
	isArray,
	isFunction,
	isString,
	isNumber,
	isDate,
	isBool,
	assert
};
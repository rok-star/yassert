export function isPrototypeOf(value: any, proto: any): boolean;
export function isPromise(value: any): boolean;
export function isObject(value: any): boolean;
export function isArray(value: any): boolean;
export function isFunction(value: any): boolean;
export function isString(value: any): boolean;
export function isNumber(value: any): boolean;
export function isDate(value: any): boolean;
export function isBool(value: any): boolean;
export function assert(value: any, description?: any): {
    optional: () => any;
    required: () => any;
};

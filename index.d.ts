declare interface IValueAssert {
    equals(rvalue: any): IValueAssert,
    oneOf(allowed: any[]): IValueAssert
}

declare interface IObjectAssert extends IValueAssert {
    hasOwnProperty(name: string | string[]): IObjectAssert,
    hasProperty(name: string | string[]): IObjectAssert,
    prototypeOf(proto: any): IObjectAssert
}

declare interface IArrayAssert extends IValueAssert {
    lengthOf(len: number): IArrayAssert,
    notEmpty(): IArrayAssert
}

declare interface INumberAssert extends IValueAssert {
    greaterThan(rvalue: number): INumberAssert,
    greaterThanOrEquals(rvalue: number): INumberAssert,
    lessThan(rvalue: number): INumberAssert,
    lessThanOrEquals(rvalue: number): INumberAssert,
    odd(): INumberAssert,
    even(): INumberAssert,
    inRange(from: number, to: number): INumberAssert
}

declare interface IStringAssert extends IValueAssert {
    lengthOf(len: number): IStringAssert,
    notEmpty(): IStringAssert
}

declare interface IFunctionAssert extends IValueAssert {
}

declare interface ITypeAssert extends IValueAssert {
    object(): IObjectAssert,
    array(): IArrayAssert,
    number(): INumberAssert,
    string(): IStringAssert,
    bool(): IValueAssert,
    function(): IFunctionAssert
}

export function isPrototypeOf(value: any, proto: any): boolean;
export function isPromise(value: any): boolean;
export function isObject(value: any): boolean;
export function isArray(value: any): boolean;
export function isFunction(value: any): boolean;
export function isString(value: any): boolean;
export function isNumber(value: any): boolean;
export function isDate(value: any): boolean;
export function isBool(value: any): boolean;
export function isNull(value: any): boolean;
export function isSet<T>(value: T): value is NonNullable<T>;
export function ifNull<T>(value: any, value2: T): T;
export function ifNull(value: any, value2: true): boolean;
export function ifNull(value: any, value2: false): boolean;
export function assert(value: any, description?: string): {
    optional: () => ITypeAssert;
    required: () => ITypeAssert;
};
export function required<T>(value: T | null | undefined, description?: string): NonNullable<T>;

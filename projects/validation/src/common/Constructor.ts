export interface Constructor<T> extends Function {
    new(...args: Array<any>): T;
}

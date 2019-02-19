import { OneOfRule } from './../rules/OneOfRule';
import { Validate } from './Validate';

export function IsOneOf<T>(values: Array<T>, message?: string) {
    return Validate(new OneOfRule(values, message));
}

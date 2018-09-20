import { OneOfRule } from './../rules/OneOfRule';
import { EmailRule } from './../rules/EmailRule';
import { Validate } from './Validate';


export function IsOneOf<T>(values: T[], message?: string) {
    return Validate(new OneOfRule(values, message));
}

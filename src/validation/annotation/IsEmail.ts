import { EmailRule } from './../rules/EmailRule';
import { Validate } from './Validate';


export function IsEmail(message?: string) {
    return Validate(new EmailRule(message));
}

import { EmailRule } from './../rules/EmailRule';
import { Validate } from './Validate';
import { NotBlankRule } from '../rules/NotBlankRule';


export function IsNotBlank(message?: string) {
    return Validate(new NotBlankRule(message));
}

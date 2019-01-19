import { EmailRule } from './../rules/EmailRule';
import { Validate } from './Validate';
import { NotBlankRule } from '../rules/NotBlankRule';
import { ValidModelRule } from '../rules/ValidModelRule';

export function IsValidModel(message: string) {
    return Validate(new ValidModelRule(message));
}

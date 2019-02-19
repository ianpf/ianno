import { Validate } from './Validate';
import { ValidModelRule } from '../rules/ValidModelRule';

export function IsValidModel(message: string) {
    return Validate(new ValidModelRule(message));
}

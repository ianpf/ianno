import { ValidationRule } from './ValidationRule';
import { IModel } from '../../common/IModel';
import { ValidationResult } from '../ValidationResult';

export class RegexMatchingRule extends ValidationRule {
    constructor(protected regex: RegExp, protected message: string) {
        super(message);
    }

    public async evaluate(value: unknown, model: IModel, property: string) {
        if (typeof value === 'string') {
            const valid = this.regex.test(value);
            return new ValidationResult(property, valid, valid ? '' : this.message);
        } else {
            return ValidationResult.InvalidResult(property, 'Field is not a string');
        }
    }
}

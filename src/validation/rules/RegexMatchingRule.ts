import { ValidationRule } from './ValidationRule';
import { IModel } from '../../common/IModel';
import { ValidationResult } from '../ValidationResult';

export class RegexMatchingRule extends ValidationRule {
    constructor(protected regex: RegExp, protected message: string) {
        super(message);
    }

    public async evaluate(value: unknown, fieldName: string, model?: IModel) {
        if (typeof value === 'string') {
            const valid = this.regex.test(value);
            return new ValidationResult(fieldName, valid, valid ? '' : this.message);
        } else {
            return ValidationResult.InvalidResult(fieldName, 'Field is not a string');
        }
    }
}

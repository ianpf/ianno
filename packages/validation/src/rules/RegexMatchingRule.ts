import { ValidationRule } from './ValidationRule';
import { ValidationResult } from '../ValidationResult';

export class RegexMatchingRule extends ValidationRule {
    constructor(public message: string, protected regex: RegExp) {
        super(message);
    }

    public async evaluate(value: unknown, fieldName: string) {
        if (typeof value !== 'string' || !this.regex.test(value)) {
            return ValidationResult.InvalidResult(fieldName, this.message);
        } else {
            return [];
        }
    }
}

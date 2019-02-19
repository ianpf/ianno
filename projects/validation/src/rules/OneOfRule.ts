import { ValidationResult } from './../ValidationResult';
import { ValidationRule } from './ValidationRule';

export class OneOfRule<T> extends ValidationRule {
    constructor(private values: Array<T>, message?: string) {
        super(message || `Must be one of ${values.join(', ')}`);
    }
    public async evaluate(value: unknown, property: string) {
        if (!this.values.includes(value as T)) {
            return ValidationResult.InvalidResult(property, this.message);
        } else {
            return [];
        }
    }
}

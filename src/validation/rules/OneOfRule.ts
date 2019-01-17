import { ValidationResult } from './../ValidationResult';
import { ValidationRule } from './ValidationRule';

export class OneOfRule<T> extends ValidationRule {
    constructor(private values: Array<T>, message?: string) {
        super(message || `Must be one of ${values.join(', ')}`);
    }
    public async evaluate(value: unknown, property: string, model: any) {
        if (['string', 'number'].includes(typeof value)) {
            if (this.values.includes(value as any)) {
                return ValidationResult.ValidResult(property);
            } else {
                return ValidationResult.InvalidResult(property, this.message);
            }
        } else {
            return ValidationResult.InvalidResult(property, this.message);
        }
    }
}

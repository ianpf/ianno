import { ValidationResult } from './../ValidationResult';
import { ValidationRule } from './ValidationRule';


export class OneOfRule<T> extends ValidationRule {
    constructor(private values: T[], message?: string) {
        super(message || `Must be one of ${values.join(', ')}`);
    }
    public async evaluate(value: unknown, model: any, property: string) {
        if (['string', 'number'].includes(typeof value)) {
            if (this.values.includes(value as any)) {
                return ValidationResult.ValidResult();
            } else {
                return ValidationResult.InvalidResult(this.message);
            }
        } else {
            return ValidationResult.InvalidResult(this.message);
        }
    }
}

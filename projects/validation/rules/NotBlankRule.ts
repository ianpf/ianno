import { ValidationResult } from '../ValidationResult';
import { ValidationRule } from './ValidationRule';

export class NotBlankRule extends ValidationRule {
    private static blankValuesList: Array<any> = [null, undefined, '', NaN];
    constructor(protected message: string = 'Field cannot be blank') {
        super(message);
    }
    public async evaluate(value: unknown, fieldName: string) {
        if (NotBlankRule.blankValuesList.includes(value)) {
            return ValidationResult.InvalidResult(fieldName, this.message);
        } else {
            return [];
        }
    }
}

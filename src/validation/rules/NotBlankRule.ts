import { IModel } from './../../common/IModel';
import { ValidationResult } from '../ValidationResult';
import { ValidationRule } from './ValidationRule';

export class NotBlankRule extends ValidationRule {
    private static blankValuesList: any[] = [null, undefined, '', NaN];
    constructor(protected message: string = 'Field cannot be blank') {
        super();
    }
    public evaluate(value: unknown, model: IModel, property: string) {
        if (NotBlankRule.blankValuesList.indexOf(value) !== -1) {
            return ValidationResult.InvalidResult(this.message);
        } else {
            return ValidationResult.ValidResult();
        }
    }
}

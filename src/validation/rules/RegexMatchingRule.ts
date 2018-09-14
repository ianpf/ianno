import { ValidationRule } from "./ValidationRule";
import { IModel } from "../../IModel";
import { ValidationResult } from "../ValidationResult";

export class RegexMatchingRule extends ValidationRule {
    constructor(protected message: string, protected regex: RegExp) {
        super();
    }

    public evaluate(value: unknown, model: IModel, property: string): ValidationResult {
        if (typeof value === 'string') {
            const valid = this.regex.test(value);
            return new ValidationResult(valid, valid ? '' : this.message)
        } else {
            return ValidationResult.InvalidResult('Field is not a string');
        }
    }
}
import { ValidationRule } from "./ValidationRule";
import { IModel } from "../../common/IModel";
import { ValidationResult } from "../ValidationResult";

export class RegexMatchingRule extends ValidationRule {
    constructor(protected regex: RegExp, protected message: string) {
        super();
    }

    public async evaluate(value: unknown, model?: IModel, property?: string) {
        if (typeof value === 'string') {
            const valid = this.regex.test(value);
            return new ValidationResult(valid, valid ? '' : this.message)
        } else {
            return ValidationResult.InvalidResult('Field is not a string');
        }
    }
}

import { ValidationRule } from './ValidationRule';
import { ValidationResult } from '../ValidationResult';
import { IModel } from '../../common/IModel';
import { ValidationResults } from '../ValidationResults';

export enum ArrayValidationMode {
  All, // all items in the array must pass the rule (Array.every)
  Any, // any item in the array must pass the rule (Array.some)
  None, // no items in the array msut pass the rule (!Array.every)
}

export class ValidateArrayRule extends ValidationRule {
  constructor(private rule: ValidationRule, private mode: ArrayValidationMode, message: string) {
    super(message);
  }

  public async evaluate(value: unknown, fieldName: string, model?: IModel) {
    console.log(this.mode);
    if (value instanceof Array) {
      const results = new ValidationResults();
      for (let i = 0; i < value.length; i++) {
        const entry = value[i];
        results.addResults([...await this.rule.evaluate(entry, `${fieldName}[${i}]`, model)]);
      }
      if (!results.valid) {
        results.addResult(ValidationResult.InvalidResult(fieldName, this.message));
      }
      return results.getErrors();
    }
    return [ValidationResult.InvalidResult(fieldName, 'Must be an array')];
  }
}

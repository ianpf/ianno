import { ValidationRule } from './ValidationRule';
import { ValidationResult } from '../ValidationResult';

export enum ValidateArrayMode {
  All, // all items in the array must pass the rule (Array.every)
  Any, // any item in the array must pass the rule (Array.some)
  None, // no items in the array msut pass the rule (!Array.every)
}

export class ValidateArrayRule extends ValidationRule {
  constructor(private rule: ValidationRule, private mode: ValidateArrayMode) {
    super();
  }

  public async evaluate(value: unknown, fieldName: string) {
    if (value instanceof Array) {

    }
    return ValidationResult.InvalidResult(fieldName, 'Not implemented');
  }
}

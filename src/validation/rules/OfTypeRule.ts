import { ValidationRule } from './ValidationRule';
import { ValidationResult } from '../ValidationResult';
import { IModel } from '../../common/IModel';

export class OfTypeRule extends ValidationRule {
  public async evaluate(value: unknown, fieldName: string) {
    return ValidationResult.ValidResult(fieldName);
  }
}

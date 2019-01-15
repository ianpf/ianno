import { ValidationRule } from './ValidationRule';
import { ValidationResult } from '../ValidationResult';
import { IModel } from '../../common/IModel';

export class OfTypeRule extends ValidationRule {
  constructor() {
    super()
  }
  public async evaluate(value: unknown, model: IModel, property: string) {
    return ValidationResult.ValidResult();
  }
}

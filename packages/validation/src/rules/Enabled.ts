import { ValidationRule } from './ValidationRule';
import { ValidationResult } from '../ValidationResult';
import { Model } from '../common/Model';

export class Enabled extends ValidationRule {
  constructor(
    private baseRule: ValidationRule,
    private enabled: (value: unknown, fieldName: string, model?: Model) => Promise<boolean>,
  ) {
    super(baseRule.message);
  }

  public async evaluate(
    value: unknown,
    fieldName: string,
    model?: Model,
    type?: string | Function,
  ): Promise<ValidationResult | Array<ValidationResult>> {
    if (!(await this.enabled(value, fieldName, model))) {
      return [];
    } else {
      return this.baseRule.evaluate(value, fieldName, model, type);
    }
  }
}

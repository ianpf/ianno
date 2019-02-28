import { ValidationRule } from './rules';

export class ValidationMetadata {
  constructor(
    public field: string,
    public type: string,
    public rule: ValidationRule,
  ) {}
}

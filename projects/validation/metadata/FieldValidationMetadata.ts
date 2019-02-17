import { ValidationRule } from '../rules/ValidationRule';

export class FieldValidationMetadata {
    constructor(
        public modelName: string,
        public fieldName: string,
        public type: any,
        public validation: ValidationRule,
    ) {}
}

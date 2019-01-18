import { FieldValidationMetadata } from './FieldValidationMetadata';
import { ValidationRule } from '../rules/ValidationRule';

export class ValidationMetadataStore {
    public static fieldValidationMetadataStore: Map<string, Array<FieldValidationMetadata>> = new Map();

    public static addFieldValidationMeta(
        targetClass: any,
        field: string,
        type: string,
        validation: ValidationRule,
    ): void {
        const fieldValidation = this.fieldValidationMetadataStore.get(targetClass) || [];
        fieldValidation.push(new FieldValidationMetadata(targetClass, field, type, validation));
        this.fieldValidationMetadataStore.set(targetClass, fieldValidation);
    }

    public static getFieldValidation(targetClass: any): Array<FieldValidationMetadata> {
        return this.fieldValidationMetadataStore.get(targetClass) || [];
    }
}

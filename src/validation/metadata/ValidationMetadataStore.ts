import { Map } from './../../common/Map';
import { FieldValidationMetadata } from './FieldValidationMetadata';
import { ValidationRule } from '../rules/ValidationRule';

export class ValidationMetadataStore {
    public static fieldValidationMetadataStore: Map<string, FieldValidationMetadata[]> = new Map();

    public static addFieldValidationMeta(
        className: string,
        field: string,
        type: string,
        validation: ValidationRule,
    ): void {
        const fieldValidation = this.fieldValidationMetadataStore.get(className, []);
        fieldValidation.push(new FieldValidationMetadata(className, field, type, validation));
        this.fieldValidationMetadataStore.put(className, fieldValidation);
    }

    public static getFieldValidation(target: any): FieldValidationMetadata[] {
        const className = target.prototype.constructor.name;
        return this.fieldValidationMetadataStore.get(className) || [];
    }
}

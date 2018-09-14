import 'reflect-metadata';
import { ValidationMetadataStore } from './../metadata/ValidationMetadataStore';
import { FieldValidationMetadata } from './../metadata/FieldValidationMetadata';
import { ValidationRule } from '../rules/ValidationRule';
import { NotBlankRule } from './../rules/NotBlankRule';

export function ValidateField(
    validation: ValidationRule,
    message?: string,
): (target: any, key: PropertyKey, descriptor?: PropertyDescriptor) => void {
    return (target: any, key: PropertyKey, descriptor?: PropertyDescriptor) => {
        const type = Reflect.getMetadata('design:type', target, key.toString());
        console.log(type);
        ValidationMetadataStore.addFieldValidationMeta(target.constructor.name, key.toString(), type, validation);
    };
}

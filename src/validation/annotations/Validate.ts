import 'reflect-metadata';
import { ValidationMetadataStore } from '../metadata/ValidationMetadataStore';
import { FieldValidationMetadata } from '../metadata/FieldValidationMetadata';
import { ValidationRule } from '../rules/ValidationRule';
import { NotBlankRule } from '../rules/NotBlankRule';

export function Validate(
    validation: ValidationRule,
    message?: string,
): (target: any, key: PropertyKey, descriptor?: PropertyDescriptor) => void {
    return (target: any, _key: PropertyKey, descriptor?: PropertyDescriptor) => {
        const key = typeof _key === 'number' ? _key.toString() : _key;
        const type = Reflect.getMetadata('design:type', target, key);
        ValidationMetadataStore.addFieldValidationMeta(target.constructor.name, key.toString(), type, validation);
    };
}


function addSymbolForValidation(target: any) {
    
}

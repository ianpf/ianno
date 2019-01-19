import 'reflect-metadata';
import { ValidationMetadataStore } from '../metadata/ValidationMetadataStore';
import { ValidationRule } from '../rules/ValidationRule';

export function Validate(
    validation: ValidationRule,
): (target: any, key: PropertyKey, descriptor?: PropertyDescriptor) => void {
    return (target: any, _key: PropertyKey, descriptor?: PropertyDescriptor) => {
        const key = typeof _key === 'number' ? _key.toString() : _key;
        const type = Reflect.getMetadata('design:type', target, key);
        ValidationMetadataStore.addFieldValidationMeta(target.constructor, key.toString(), type, validation);
    };
}

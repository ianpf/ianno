import { Constructor } from '../common/Constructor';
import { FieldValidationMetadata } from './FieldValidationMetadata';
import { ValidationRule } from '../rules/ValidationRule';

export class ValidationMetadataStore {
    public static fieldValidationMetadataStore: Map<Function, Array<FieldValidationMetadata>> = new Map();

    public static addFieldValidationMeta(
        targetClass: any,
        field: string,
        type: string,
        validation: ValidationRule,
    ): void {
        const fieldValidation = this.fieldValidationMetadataStore.get(targetClass) || [];
        fieldValidation.push(new FieldValidationMetadata(targetClass.name, field, type, validation));
        this.fieldValidationMetadataStore.set(targetClass, fieldValidation);
    }

    public static getFieldValidation(targetClass: any): Array<FieldValidationMetadata> {
        const validationRules = this.fieldValidationMetadataStore.get(targetClass) || [];
        for (const prototype of this.prototypes(targetClass)) {
            validationRules.push(...(this.fieldValidationMetadataStore.get(prototype) || []));
        }
        return validationRules;
    }

    private static* prototypes(object: InstanceType<Constructor<{}>>): IterableIterator<Function> {
        let prototype = object;
        do {
            prototype = Object.getPrototypeOf(prototype);
            if (prototype && typeof prototype === 'function') {
                yield prototype;
            }
        } while (prototype);
    }
}

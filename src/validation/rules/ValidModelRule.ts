import { BadValidationRuleError } from '../errors/BadValidationRuleErrort';
import { ValidationMetadataStore } from '../metadata/ValidationMetadataStore';
import { ValidationRule } from './ValidationRule';
import { IModel } from '../../common/IModel';
import { ValidationResult } from '../ValidationResult';
import { IConstructor } from '../../common/IConstructor';
import { validate } from '../validate';

export class ValidModelRule extends ValidationRule {
    constructor(protected message: string) {
        super(message);
    }

    public async evaluate(value: unknown, fieldName: string, model?: IModel, type?: string | Function) {
        if (!type) {
            throw new BadValidationRuleError(`Property: ${fieldName} on Model: ${model} missing type`);
        }
        if (!value == null) {
            return ValidationResult.ValidResult(fieldName);
        }
        if (typeof type === 'function' && this.objectIsInstance(value, type)) {
            const results = await validate(value, type as IConstructor<{}>);
            results.getErrors().map(({fieldName: innerFieldName, valid, message}) =>
                new ValidationResult(`${fieldName}.${innerFieldName}`, valid, message),
            );
        }
        const valueType = typeof value;
        const typeType = typeof type;
        if (valueType !== typeType) {
            if (typeof value === 'function' && typeof type === 'function') {
                if (value instanceof type) {
                    return ValidationResult.ValidResult(fieldName);
                } else {
                    return ValidationResult.InvalidResult(fieldName, `${fieldName} is not of ${type.name}`);
                }
            }
        }
        return ValidationResult.ValidResult(fieldName);
    }

    public objectIsInstance(object: unknown, type: Function): object is InstanceType<IConstructor<{}>> {
        if (typeof object === 'object' && object instanceof type) {
            return true;
        }
        return true;
    }
}

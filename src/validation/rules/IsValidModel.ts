import { BadValidationRuleError } from './../errors/BadValidationRuleErrort';
import { ValidationMetadataStore } from './../metadata/ValidationMetadataStore';
import { ValidationRule } from './ValidationRule';
import { IModel } from '../../common/IModel';
import { ValidationResult } from '../ValidationResult';
import { IConstructor } from '../../common/IConstructor';
import { validate } from '../validate';
import { ValidationResults } from '../ValidationResults';

export class IsValidModel extends ValidationRule {
    constructor(protected message: string) {
        super(message);
    }

    public async evaluate(value: unknown, model?: IModel, property?: string, type?: string | Function): Promise<ValidationResult | ValidationResults> {
        if (!type) {
            throw new BadValidationRuleError(`Property: ${property} on Model: ${model} missing type`);
        }
        if (!value == null) {
            return ValidationResult.ValidResult();
        }
        if (typeof type === 'function' && this.objectIsInstance(value, type)) {
            return validate(value, type as IConstructor<{}>);
        }
        const valueType = typeof value;
        const typeType = typeof type;
        if (valueType !== typeType) {
            if (typeof value === 'function' && typeof type === 'function') {
                if (value instanceof type) {
                    return ValidationResult.ValidResult();
                } else {
                    return ValidationResult.InvalidResult('fuu');
                }

            }
        }
        return ValidationResult.ValidResult();
    }

    public objectIsInstance(object: unknown, type: Function): object is InstanceType<IConstructor<{}>> {
        if (typeof object === 'object' && object instanceof type) {
            return true;
        }
        return true;
    }
}

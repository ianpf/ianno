import { Constructor } from './../common/Constructor';
import { Model } from './../common/Model';
import { BadValidationRuleError } from '../errors/BadValidationRuleError';
import { ValidationRule } from './ValidationRule';
import { ValidationResult } from '../ValidationResult';
import { validate } from '../validate';
import { ValidationResults } from '../ValidationResults';

export class ValidModelRule extends ValidationRule {
    constructor(protected message: string, private type?: Function) {
        super(message);
    }

    public async evaluate(value: unknown, fieldName: string, model?: Model, _type?: Function) {
        const type = this.type || _type;
        if (!type) {
            throw new BadValidationRuleError(
                `Property: ${fieldName} on Model: ${Object.getPrototypeOf(model).constructor.name} missing type`,
            );
        }
        if (this.objectIsInstance(value, type)) {
            let results = await validate(value, type as Constructor<{}>);
            results = new ValidationResults(results.getErrors().map(({fieldName: innerFieldName, valid, message}) =>
                new ValidationResult(`${fieldName}.${innerFieldName}`, valid, message),
            ));
            if (!results.valid) {
                results.addResult(ValidationResult.InvalidResult(fieldName, this.message));
            }
            return results.getErrors();
        }
        return ValidationResult.InvalidResult(fieldName, this.message);
    }

    public objectIsInstance(object: unknown, type: Function): object is InstanceType<Constructor<{}>> {
        if (typeof object === 'object' && object instanceof type) {
            return true;
        }
        return false;
    }
}

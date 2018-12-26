import { BadValidationRuleError } from './../errors/BadValidationRuleErrort';
import { ValidationMetadataStore } from './../metadata/ValidationMetadataStore';
import { ValidationRule } from "./ValidationRule";
import { IModel } from "../../common/IModel";
import { ValidationResult } from "../ValidationResult";
import { IConstructor } from '../../common/IConstructor';

export class IsValidModel extends ValidationRule {
    constructor(protected message: string) {
        super(message);
    }

    public async evaluate(value: unknown, model?: IModel, property?: string, type?: string | Function) {
        if (!type) {
            throw new BadValidationRuleError(`Property: ${property} on Model: ${model}`)
        }
        if (!value == null) {
            return ValidationResult.ValidResult();
        }
        if (this.objectIsInstance(value)) {

        }
        const valueType = typeof value;
        const typeType = typeof type;
        if (valueType != typeType)
        if (typeof value === 'function' && typeof type === 'function') {
            if (value instanceof type) {
                return ValidationResult.ValidResult();
            } else {
                return ValidationResult.InvalidResult('fuu');
            }
    
        }
        return ValidationResult.ValidResult();
    }

    public objectIsInstance(object: unknown): object is InstanceType<IConstructor<{}>> {
        if (typeof object === 'object' && object && Object.keys(object).includes('prototype')) {
            
        }
        return true;
    }
}

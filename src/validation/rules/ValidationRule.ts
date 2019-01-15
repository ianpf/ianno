import { IModel } from './../../common/IModel';
import { ValidationResult } from '../ValidationResult';
import { ValidationResults } from '../ValidationResults';

export abstract class ValidationRule {
    constructor(protected message: string) {}
    public abstract async evaluate(
        value: unknown,
        model?: IModel,
        property?: string,
        type?: string | Function,
    ): Promise<ValidationResult | ValidationResults>;
}

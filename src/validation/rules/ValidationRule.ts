import { IModel } from './../../common/IModel';
import { ValidationResult } from '../ValidationResult';

export abstract class ValidationRule {
    constructor(protected message: string) {}
    public abstract async evaluate(
        value: unknown,
        fieldName: string,
        model?: IModel,
        type?: string | Function,
    ): Promise<ValidationResult | Array<ValidationResult>>;
}

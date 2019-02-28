import { Model } from '../common/Model';
import { ValidationResult } from '../ValidationResult';

export abstract class ValidationRule {
    constructor(public message: string) {}
    public abstract async evaluate(
        value: unknown,
        fieldName: string,
        model?: Model,
        type?: string | Function,
    ): Promise<ValidationResult | Array<ValidationResult>>;
}

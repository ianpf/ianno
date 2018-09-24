import { IModel } from './../../common/IModel';
import { ValidationResult } from '../ValidationResult';

export abstract class ValidationRule {
    constructor(protected message: string = 'Field cannot be blank') {}
    public abstract async evaluate(value: unknown, model?: IModel, property?: string): Promise<ValidationResult>;
}

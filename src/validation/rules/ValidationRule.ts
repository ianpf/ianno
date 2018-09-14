import { IModel } from './../../IModel';
import { ValidationResult } from '../ValidationResult';

export abstract class ValidationRule {
    constructor(protected message: string = 'Field cannot be blank') {}
    public abstract evaluate(value: any, model: IModel, property: string): ValidationResult;
}

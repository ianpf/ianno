import { ValidationResult } from './ValidationResult';

export class ValidationResults {
    public get valid() {
        return !this.errors.some((item) => !item.valid);
    }

    constructor(
        errors: ValidationResult | Array<ValidationResult> = [],
    ) {
        if (errors instanceof Array) {
            this.errors = errors;
        } else {
            this.errors = [errors];
        }
    }

    private errors: Array<ValidationResult>;

    public resultsFor(partial: string): ValidationResults {
        const errors = this.errors.filter((item) => item.fieldName.startsWith(partial));
        return new ValidationResults(errors);
    }

    public addResults(result: ValidationResult | Array<ValidationResult>): void {
        if (result instanceof Array) {
            this.errors.push(...result);
        } else {
            this.errors.push(result);
        }
    }

    public addResult(result: ValidationResult): void {
        this.errors.push(result);
    }

    public getErrors() {
        return this.errors;
    }
}

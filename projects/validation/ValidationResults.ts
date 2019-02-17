import { ValidationResult } from './ValidationResult';

export class ValidationResults {
    public get valid() {
        return !this.errors.some((item) => !item.valid);
    }

    constructor(
        private errors: Array<ValidationResult> = [],
    ) {}

    public resultsFor(partial: string): ValidationResults {
        const errors = this.errors.filter((item) => item.fieldName.startsWith(partial));
        return new ValidationResults(errors);
    }

    public addResults(result: Array<ValidationResult>): void {
        this.errors.push(...result);
    }

    public addResult(result: ValidationResult): void {
        this.errors.push(result);
    }

    public getErrors() {
        return this.errors;
    }
}

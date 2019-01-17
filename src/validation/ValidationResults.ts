import { ValidationResult } from './ValidationResult';

export class ValidationResults {
    public get valid() {
        return this.errors.some((item) => !item.valid);
    }

    constructor(
        private errors: Array<ValidationResult> = [],
    ) {}

    public static ValidResults() {
        return new ValidationResults();
    }

    public static InvalidResults(messages: Array<ValidationResult>) {
        return new ValidationResults(messages);
    }

    public errorsFor(partial: string): Array<ValidationResult> {
        return this.errors.filter((item) => item.fieldName.startsWith(partial));
    }

    public addResults(fieldName: string, result: Array<ValidationResult>): void {
        if (result instanceof Array) {
            this.errors.push(...result);
        } else {
            this.errors.push(result);
        }
    }

    public getErrors() {
        return this.errors;
    }
}

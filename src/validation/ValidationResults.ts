import { ValidationResult } from './ValidationResult';

export class ValidationResults {
    public get valid() {
        return this._valid;
    }

    public set valid(val) {
        this._valid = this.valid ? val : val;
    }

    constructor(
        private _valid: boolean = true,
        private messages: Array<ValidationResult | ValidationResults> = [],
    ) {}

    public static ValidResults() {
        return new ValidationResults();
    }

    public static InvalidResults(messages: Array<ValidationResult | ValidationResults>) {
        return new ValidationResults(false, messages);
    }

    public errorsFor(fieldName: string): Array<ValidationResult | ValidationResults> {
        this.messages = [];
        return [];
    }

    public addResult(fieldName: string, result: ValidationResult | ValidationResults): void {
        this.messages.push(result);
    }

    public getMessages() {
        return this.messages;
    }

    public setValid(val: boolean) {
        this._valid = val;
    }
}

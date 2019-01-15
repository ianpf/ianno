export class ValidationResult {
    constructor(public valid: boolean, public message: string = '') {}
    public static InvalidResult(message: string) {
        return new ValidationResult(false, message);
    }
    public static ValidResult() {
        return new ValidationResult(true);
    }
}

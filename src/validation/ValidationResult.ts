export class ValidationResult {
    constructor(public fieldName: string, public valid: boolean, public message: string = '') {}
    public static InvalidResult(fieldName: string, message: string) {
        return new ValidationResult(fieldName, false, message);
    }
    public static ValidResult(fieldName: string) {
        return new ValidationResult(fieldName, true);
    }
}

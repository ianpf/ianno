export class ValidationResult {
    constructor(public valid: boolean, public message: string = '') {}
    public static InvalidResult = (message: string) => new ValidationResult(false, message);
    public static ValidResult = () => new ValidationResult(true);
}

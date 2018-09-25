export class ValidationResults {
    public static ValidResults = () => new ValidationResults();
    public static InvalidResults = (messages: string[]) => new ValidationResults(false, messages);

    constructor(private _valid: boolean = true, private messages: string[] = []) {}

    public get valid() {
        return this._valid;
    }

    public set valid(val) {
        this._valid = this.valid ? val : val;
    }

    public addMessage(message: string) {
        this.messages.push(message);
    }

    public getMessages() {
        return this.messages;
    }

    public setValid(val: boolean) {
        this._valid = val;
    }
}

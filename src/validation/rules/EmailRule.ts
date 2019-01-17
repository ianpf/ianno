import { RegexMatchingRule } from './RegexMatchingRule';

// tslint:disable-next-line:max-line-length
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class EmailRule extends RegexMatchingRule {
    constructor(message: string = 'Must be an email') {
        super(emailRegex, message);
    }
}

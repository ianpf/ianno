import { RegexMatchingRule } from './../rules/RegexMatchingRule';
import { Validate } from './Validate';


export function MatchesRegex(regex: RegExp, message: string) {
    return Validate(new RegexMatchingRule(regex, message));
}

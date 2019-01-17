import { RegexMatchingRule } from '../RegexMatchingRule';
import { ValidationResult } from '../../ValidationResult';

describe(RegexMatchingRule, () => {
  const rule = new RegexMatchingRule(/abc/, 'It tests the regex for the string or else it gets the hose again');

  describe('returns valid when', () => {
    it('a string matching is given', async () => {
      expect(await rule.evaluate('abc', 'regexField')).toEqual(ValidationResult.ValidResult('regexField'));
    });
  });

  describe('returns invalid when string does not match', () => {
    it('a string not matching is given', async () => {
      expect(await rule.evaluate('abd', 'regexField'))
        .toEqual(ValidationResult.InvalidResult(
          'regexField',
          'It tests the regex for the string or else it gets the hose again',
        ));
    });
  });
});

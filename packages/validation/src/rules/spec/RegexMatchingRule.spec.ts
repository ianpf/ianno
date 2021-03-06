import { RegexMatchingRule } from '../RegexMatchingRule';
import { ValidationResult } from '../../ValidationResult';

describe(RegexMatchingRule, () => {
  const rule = new RegexMatchingRule('It tests the regex for the string or else it gets the hose again', /abc/);

  describe('returns valid when', () => {
    it('a string matching is given', async () => {
      expect(await rule.evaluate('abc', 'regexField')).toEqual([]);
    });
  });

  describe('returns invalid when', () => {
    it('a string not matching is given', async () => {
      expect(await rule.evaluate('abd', 'regexField'))
        .toEqual(ValidationResult.InvalidResult(
          'regexField',
          'It tests the regex for the string or else it gets the hose again',
        ));
    });
    it('a non-string value is given', async () => {
      expect(await rule.evaluate(null, 'regexField'))
        .toEqual(ValidationResult.InvalidResult(
          'regexField',
          'It tests the regex for the string or else it gets the hose again',
        ));
    });
  });
});

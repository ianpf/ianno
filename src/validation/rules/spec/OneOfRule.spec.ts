import { OneOfRule } from '../OneOfRule';
import { ValidationResult } from '../../ValidationResult';

describe(OneOfRule, () => {
  const rule = new OneOfRule(['a', 1]);
  const ruleWithMessage = new OneOfRule(['a', 1], 'wat');
  describe('when the value is in the acceptable values', () => {
    it('should return a valid result', async () => {
      expect(await rule.evaluate('a', 'validField'))
        .toEqual(ValidationResult.ValidResult('validField'));
    });
    it('should return a valid result', async () => {
      expect(await rule.evaluate(1, 'validField'))
        .toEqual(ValidationResult.ValidResult('validField'));
    });
  });
  describe('when the value is not in the acceptable values', () => {
    it('should return an invalid result', async () => {
      expect(await rule.evaluate('b', 'validField'))
        .toEqual(ValidationResult.InvalidResult('validField', 'Must be one of a, 1'));
    });
    it('should return an invalid result with a custom message', async () => {
      expect(await ruleWithMessage.evaluate('b', 'validField'))
        .toEqual(ValidationResult.InvalidResult('validField', 'wat'));
    });
    it('should return an invalid result with a custom message', async () => {
      expect(await rule.evaluate(null, 'validField'))
        .toEqual(ValidationResult.InvalidResult('validField', 'Must be one of a, 1'));
    });
  });
});

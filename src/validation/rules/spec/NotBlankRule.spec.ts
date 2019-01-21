import { NotBlankRule } from '../NotBlankRule';
import { ValidationResult } from '../../ValidationResult';

describe(NotBlankRule, () => {
  const rule = new NotBlankRule();
  const ruleWithMessage = new NotBlankRule('a message');
  describe('returns valid when', () => {
    it('it is given zero', async () => {
      expect(await rule.evaluate(0, 'notBlankField')).toEqual([]);
    });

    it('it is given false', async () => {
      expect(await rule.evaluate(false, 'notBlankField')).toEqual([]);
    });

    it('it is a number', async () => {
      expect(await rule.evaluate(5, 'notBlankField')).toEqual([]);
    });
  });

  describe('returns invalid when', () => {
    it('is given an empty string', async () => {
      expect(await rule.evaluate('', 'notBlankField'))
        .toEqual(ValidationResult.InvalidResult('notBlankField', 'Field cannot be blank'));
    });

    it('is given a null value', async () => {
      expect(await ruleWithMessage.evaluate(null, 'notBlankField'))
        .toEqual(ValidationResult.InvalidResult('notBlankField', 'a message'));
    });

    it('is given an undefined value', async () => {
      expect(await rule.evaluate(undefined, 'notBlankField'))
        .toEqual(ValidationResult.InvalidResult('notBlankField', 'Field cannot be blank'));
    });

    it('it is NaN', async () => {
      expect(await rule.evaluate(NaN, 'notBlankField'))
        .toEqual(ValidationResult.InvalidResult('notBlankField', 'Field cannot be blank'));
    });
  });
});

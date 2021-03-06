import { ValidationResult } from '../../ValidationResult';
import { EmailRule } from '../EmailRule';

describe(EmailRule, () => {
  const rule = new EmailRule();
  const ruleWithMessage = new EmailRule('wat');

  describe('returns valid when', () => {
    it('a valid email is given', async () => {
      expect(await rule.evaluate('test@test.com', 'emailField'))
        .toEqual([]);
    });
  });

  describe('returns invalid when', () => {
    it('a bad email is given', async () => {
      expect(await rule.evaluate('test@test', 'emailField'))
        .toEqual(ValidationResult.InvalidResult('emailField', 'Must be an email'));
    });
  });

  describe('uses a custom message when', () => {
    it('is given one', async () => {
      expect(await ruleWithMessage.evaluate('test@test', 'emailField'))
        .toEqual(ValidationResult.InvalidResult('emailField', 'wat'));
    });
  });
});

import { EmailRule } from '../EmailRule';
import { ValidationResult } from '../../ValidationResult';

describe(EmailRule, () => {
  const rule = new EmailRule();

  describe('returns valid when', () => {
    it('a valid email is given', async () => {
      expect(await rule.evaluate('test@test.com', 'emailField'))
        .toEqual(ValidationResult.ValidResult('emailField'));
    });
  });

  describe('returns invalid when', () => {
    it('a bad email is given', async () => {
      expect(await rule.evaluate('test@test', 'emailField'))
        .toEqual(ValidationResult.InvalidResult('emailField', 'Must be an email'));
    });
  });
});

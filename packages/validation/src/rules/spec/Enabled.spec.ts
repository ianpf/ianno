import { ValidationResult } from '../../ValidationResult';
import { Enabled } from '../Enabled';
import { NotBlankRule } from '../NotBlankRule';

describe(Enabled, () => {
  const disabledNotBlank = new Enabled(new NotBlankRule(), async () => false);
  const enabledNotBlank = new Enabled(new NotBlankRule(), async () => true);
  const modelDependantRule = new Enabled(new NotBlankRule(), async (_value, _field, model) => model && model.active);

  describe('returns valid when', () => {
    it('an invalid value and the rule is disabled', async () => {
      expect(await disabledNotBlank.evaluate('', 'notBlankField'))
        .toEqual([]);
    });
  });

  describe('returns invalid when', () => {
    it('an invalid value and the rule is enabled', async () => {
      expect(await enabledNotBlank.evaluate('', 'notBlankField'))
        .toEqual(ValidationResult.InvalidResult('notBlankField', 'Field cannot be blank'));
    });
  });

  describe('passes through the model when provided', () => {
    it('returns invalid when the model means it should be active', async () => {
      expect(await modelDependantRule.evaluate('', 'notBlankField', {active: true}))
        .toEqual(ValidationResult.InvalidResult('notBlankField', 'Field cannot be blank'));
    });

    it('returns valid when the model means it should not be active', async () => {
      expect(await modelDependantRule.evaluate('', 'notBlankField', {active: false}))
        .toEqual([]);
    });

    it('returns valid when the model is not provided so it is not active', async () => {
      expect(await modelDependantRule.evaluate('', 'notBlankField'))
        .toEqual([]);
    });
  });
});

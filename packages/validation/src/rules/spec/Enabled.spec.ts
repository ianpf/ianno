import { ValidationResult } from '../../ValidationResult';
import { Enabled } from '../Enabled';
import { NotBlankRule } from '../NotBlankRule';

describe(Enabled, () => {
  const disabledNotBlank = new Enabled(new NotBlankRule(), async () => false);
  const enabledNotBlank = new Enabled(new NotBlankRule(), async () => true);

  describe('returns valid when', () => {
    it('an invalid value but the rule is disabled', async () => {
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
});

import { ValidateArrayRule, ArrayValidationMode } from '../ValidateArrayRule';
import { NotBlankRule } from '../NotBlankRule';
import { ValidationResult } from '../../ValidationResult';
import { ValidModelRule } from '../ValidModelRule';
import { IsNotBlank } from '../../annotations';

class ValidatedClass {
  @IsNotBlank()
  public notBlankField: string = '';
}

describe(ValidateArrayRule, () => {
  const rule = new ValidateArrayRule(new NotBlankRule(), ArrayValidationMode.All, 'All values must not be blank');
  const ruleWithValidModel = new ValidateArrayRule(
    new ValidModelRule('Must be valid', ValidatedClass),
    ArrayValidationMode.All, 'All values must not be blank',
  );
  it('should report any errors for members of the array, and an error for the array overall ', async () => {
    expect(await rule.evaluate(['', null], 'validatedArray'))
      .toEqual(expect.arrayContaining([
        ValidationResult.InvalidResult('validatedArray[0]', 'Field cannot be blank'),
        ValidationResult.InvalidResult('validatedArray[1]', 'Field cannot be blank'),
        ValidationResult.InvalidResult('validatedArray', 'All values must not be blank'),
      ]));
  });
  it('should report errors on models in the array in an understandable way', async () => {
    const model = new ValidatedClass();
    expect(await ruleWithValidModel.evaluate([model], 'validatedArray'))
      .toEqual(expect.arrayContaining([
        ValidationResult.InvalidResult('validatedArray[0].notBlankField', 'Field cannot be blank'),
        ValidationResult.InvalidResult('validatedArray', 'All values must not be blank'),
      ]));
  });
  it('should report no errors for the array or it\'s members when all are valid', async () => {
    const model = new ValidatedClass();
    model.notBlankField = 'abc';
    expect(await ruleWithValidModel.evaluate([model], 'validatedArray'))
      .toEqual([]);
  });
  it('should return false for a non-array value', async () => {
    expect(await ruleWithValidModel.evaluate('badValue', 'validatedArray'))
      .toEqual(expect.arrayContaining([
        ValidationResult.InvalidResult('validatedArray', 'Must be an array'),
      ]));
  });
});

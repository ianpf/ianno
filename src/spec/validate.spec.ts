import { validate } from '../validation/validate';
import { ValidationRule, Validate } from '../validation';
import { ValidationResult } from '../validation/ValidationResult';
// tslint:disable:max-classes-per-file

class MockValidValidationRule extends ValidationRule {
  public calls: Array<any> = [];
  public async evaluate(...args: Array<any>) {
    this.calls.push(args);
    return ValidationResult.ValidResult(args[1]);
  }
}

class MockInvalidValidationRule extends ValidationRule {
  public calls: Array<any> = [];
  public async evaluate(...args: Array<any>) {
    this.calls.push(args);
    return ValidationResult.InvalidResult(args[1], 'Always see this');
  }
}

class MockBaseClass {
  @Validate(new MockValidValidationRule('Never see this'))
  public validField: string = '';
}

class MockExtendedClass extends MockBaseClass {
  @Validate(new MockInvalidValidationRule('Never see this'))
  public invalidField: string = '';
}

describe(validate, () => {
  it('should work on base classes that are extended from', async () => {
    const validatedClass = new MockExtendedClass();
    const validationResult = await validate(validatedClass, MockExtendedClass);
    expect(validationResult.getErrors()).toEqual([ValidationResult.InvalidResult('invalidField', 'Always see this')]);
  });
});

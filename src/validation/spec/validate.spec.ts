import { ValidationRule, Validate, validate, ValidationResult } from '../';
import { IsNotBlank } from '../annotations';
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
    return ValidationResult.InvalidResult(args[1], this.message);
  }
}

class MockBaseClass {
  @Validate(new MockValidValidationRule('never'))
  public validField: string = '';
}

const testSymbol = Symbol('testValidationSymbol');

class MockExtendedClass extends MockBaseClass {
  @Validate(new MockInvalidValidationRule('always'))
  public invalidField: string = '';
  @Validate(new MockInvalidValidationRule('always'))
  public [testSymbol]: number = 0;
  @IsNotBlank()
  public 1: string = '';
}

describe(validate, () => {
  it('should work on base classes that are extended from', async () => {
    const validatedClass = new MockExtendedClass();
    const validationResult = await validate(validatedClass, MockExtendedClass);
    expect(validationResult.getErrors()).toEqual([
      ValidationResult.InvalidResult('invalidField', 'always'),
      ValidationResult.InvalidResult('Symbol(testValidationSymbol)', 'always'),
      ValidationResult.InvalidResult('1', 'Field cannot be blank'),
    ]);
  });
});

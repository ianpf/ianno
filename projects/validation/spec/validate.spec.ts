import { ValidationRule } from '../rules';
import { ValidationResult } from '../ValidationResult';
import { Validate, IsNotBlank } from '../annotations';
import { validate } from '../validate';
// tslint:disable:max-classes-per-file

class MockValidValidationRule extends ValidationRule {
  public calls: Array<any> = [];
  public async evaluate(...args: Array<any>) {
    this.calls.push(args);
    return [];
  }
}

class MockInvalidValidationRule extends ValidationRule {
  public calls: Array<any> = [];
  public async evaluate(...args: Array<any>) {
    this.calls.push(args);
    return [ValidationResult.InvalidResult(args[1], this.message)];
  }
}

class MockBaseClass {
  @Validate(new MockInvalidValidationRule('always'))
  public invalidField: string = '';
}

const testSymbol = Symbol('testValidationSymbol');

class MockExtendedClass extends MockBaseClass {
  @Validate(new MockValidValidationRule('never'))
  public validField: string = '';
  @Validate(new MockInvalidValidationRule('always'))
  public [testSymbol]: number = 0;
  @IsNotBlank()
  public 1: string = '';
}

describe(validate, () => {
  it('should work on base classes that are extended from', async () => {
    const validatedClass = new MockExtendedClass();
    const results = await validate(validatedClass, MockExtendedClass);
    expect(results.getErrors()).toEqual(expect.arrayContaining([
      ValidationResult.InvalidResult('Symbol(testValidationSymbol)', 'always'),
      ValidationResult.InvalidResult('1', 'Field cannot be blank'),
      ValidationResult.InvalidResult('invalidField', 'always'),
    ]));
    expect(results.resultsFor('invalidField').valid).toEqual(false);
    expect(results.resultsFor('invalidField').getErrors()).toEqual([
      ValidationResult.InvalidResult('invalidField', 'always'),
    ]);
  });
});

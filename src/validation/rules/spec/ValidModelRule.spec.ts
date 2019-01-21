import { ValidModelRule } from '../ValidModelRule';
import { IsNotBlank } from '../../annotations';
import { ValidationResult } from '../../ValidationResult';
import { BadValidationRuleError } from '../../errors/BadValidationRuleError';
// tslint:disable:max-classes-per-file

class NestedClass {
  @IsNotBlank()
  public blankField: string = '';
}

class ParentClass {
  public nestedClass: NestedClass = new NestedClass();
}

class ParentClassWithoutType {
  public nestedClass!: any;
}

describe(ValidModelRule, () => {
  const rule = new ValidModelRule('Must be a valid NestedClass');
  describe('when the nested class is ', () => {
    describe('valid', () => {
      it('should not return any errors', async () => {
        const parentClass = new ParentClass();
        parentClass.nestedClass.blankField = 'abc';
        expect((await rule.evaluate(parentClass.nestedClass, 'nestedClass', parentClass, NestedClass)))
          .toEqual([]);
      });
    });
    describe('invalid', () => {
      it('should return the the errors with a nested class name plus an error for the field', async () => {
        const parentClass = new ParentClass();
        expect((await rule.evaluate(parentClass.nestedClass, 'nestedClass', parentClass, NestedClass)))
          .toEqual(expect.arrayContaining([
            ValidationResult.InvalidResult('nestedClass', 'Must be a valid NestedClass'),
            ValidationResult.InvalidResult('nestedClass.blankField', 'Field cannot be blank'),
          ]));
      });
    });
  });
  describe('when the model is null', () => {
    it('shouldn\'t try to validate the model', async () => {
      const parentClass = new ParentClass();
      (parentClass.nestedClass as any) = null;
      expect((await rule.evaluate(parentClass.nestedClass, 'nestedClass', parentClass, NestedClass)))
        .toEqual(ValidationResult.InvalidResult('nestedClass', 'Must be a valid NestedClass'));
    });
  });
  describe('when it doesn\'t have a type', () => {
    it('it should throw an error', async () => {
      const parentClass = new ParentClassWithoutType();
      parentClass.nestedClass = null;
      await expect(rule.evaluate(parentClass.nestedClass, 'nestedClass', parentClass))
        .rejects.toThrow(
          new BadValidationRuleError('Property: nestedClass on Model: ParentClassWithoutType missing type'),
        );
    });
  });
});

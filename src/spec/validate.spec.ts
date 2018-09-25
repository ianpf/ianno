import { ValidationResults } from './../validation/ValidationResults';
import { RegexMatchingRule } from './../validation/rules/RegexMatchingRule';
import { NotBlankRule } from './../validation/rules/NotBlankRule';
import { validate } from '../validation/validate';
import { ValidationRule, EmailRule, IsNotBlank } from '../validation';

describe(validate, () => {
  const model = {
    realEmail: 'test@zaius.com',
    badEmail: 'test@zaius',
    emptyString: '',
    nonEmptyString: 'hithere',
    nullValue: null,
    undefinedValue: undefined,
    zeroValue: 0,
    numberValue: 4,
    falseValue: false,
    trueValue: true,
    naN: NaN,
    regexMatching: 'abc',
    regexNotMatching: 'adc'
  };

  describe(IsNotBlank, () => {
    class IsNotBlankModel {
      @IsNotBlank()
      notBlankField: any = '';
    }
    const notBlankModel = new IsNotBlankModel();
    describe('returns valid when', () => {
      it('it is given zero', async () => {
        notBlankModel.notBlankField = 0;
        expect(await validate(notBlankModel, IsNotBlankModel)).toEqual(ValidationResults.ValidResults());
      });

      it('it is given false', async () => {
        notBlankModel.notBlankField = false;
        expect(await validate(notBlankModel, IsNotBlankModel)).toEqual(ValidationResults.ValidResults());
      });

      it('it is a number', async () => {
        notBlankModel.notBlankField = 5;
        expect(await validate(notBlankModel, IsNotBlankModel)).toEqual(ValidationResults.ValidResults());
      });
    });

    describe('returns invalid when', () => {
      const invalidResponse = {
        valid: false,
        messages: ['Please provide a value for this field']
      };

      it('is given an empty string', async () => {
        notBlankModel.notBlankField = '';
        expect(await validate(notBlankModel, IsNotBlankModel)).toEqual(ValidationResults.InvalidResults(['Field cannot be blank']));
      });

      it('is given a null value', async () => {
        notBlankModel.notBlankField = null;
        expect(await validate(notBlankModel, IsNotBlankModel)).toEqual(ValidationResults.InvalidResults(['Field cannot be blank']));
      });

      it('is given an undefined value', async () => {
        notBlankModel.notBlankField = undefined;
        expect(await validate(notBlankModel, IsNotBlankModel)).toEqual(ValidationResults.InvalidResults(['Field cannot be blank']));
      });

      it('it is NaN', async () => {
        notBlankModel.notBlankField = NaN;
        expect(await validate(notBlankModel, IsNotBlankModel)).toEqual(ValidationResults.InvalidResults(['Field cannot be blank']));
      });
    });
  });

  // describe(EmailRule, () => {
  //   const rule = new EmailRule();

  //   describe('returns valid when', () => {
  //     it('a valid email is given', async () => {
  //       expect(await rule.evaluate('test@test.com')).toEqual(validResponse);
  //     });
  //   });

  //   describe('returns invalid when', () => {
  //     const invalidResponse = {
  //       valid: false,
  //       messages: ['Please enter a valid email']
  //     };

  //     it('a bad email is given', async () => {
  //       expect(await rule.evaluate('test@test')).toEqual(invalidResponse);
  //     });
  //   });
  // });

  // describe(RegexMatchingRule, () => {
  //   const rule = new RegexMatchingRule(/abc/, 'It tests the regex for the string or else it gets the hose again')

  //   describe('returns valid when', () => {
  //     it('a string matching is given', async () => {
  //       expect(await rule.evaluate('abc')).toEqual(validResponse);
  //     });
  //   });

  //   describe('returns invalid when string does not match', () => {
  //     const invalidResponse = {
  //       valid: false,
  //       messages: ['It tests the regex for the string or it gets else hose again']
  //     };

  //     it('a string not matching is given', async () => {
  //       expect(await rule.evaluate('abd')).toEqual(invalidResponse);
  //     });
  //   });
  // });

  // describe(ValidationRule, () => {
  //   class AlwaysInvalidRule extends ValidationRule {
  //       async evaluate(value: string) {
  //         return ValidationResult.InvalidResult('Always false');
  //       }
  //   }
  //   class AlwaysValidRule extends ValidationRule {
  //       async evaluate(value: string) {
  //         return ValidationResult.ValidResult();
  //       }
  //   }

  //   describe('returns valid when', () => {
  //     it('the function returns a valid result', async () => {
  //       validationRule.value = () => {
  //         return validResponse;
  //       };
  //       expect(await validate(validationRule as ValidationRule, 'trueValue', model)).toEqual(validResponse);
  //     });

  //     it('the async function returns a valid result', async () => {
  //       validationRule.value = async () => {
  //         return {
  //           valid: true,
  //           messages: []
  //         };
  //       };
  //       expect(await validate(validationRule as ValidationRule, 'trueValue', model)).toEqual(validResponse);
  //     });
  //   });

  //   describe('returns invalid when string does not match', () => {
  //     const invalidResponse = {
  //       valid: false,
  //       messages: ['error']
  //     };

  //     it('the function returns an invalid result', async () => {
  //       validationRule.value = () => {
  //         return invalidResponse;
  //       };
  //       expect(await validate(validationRule as ValidationRule, 'falseValue', model)).toEqual(invalidResponse);
  //     });

  //     it('the async function returns an invalid result', async () => {
  //       validationRule.value = async () => {
  //         return invalidResponse;
  //       };
  //       expect(await validate(validationRule as ValidationRule, 'falseValue', model)).toEqual(invalidResponse);
  //     });
  //   });
  // });
});

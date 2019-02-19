import { FieldValidationMetadata } from './../../metadata/FieldValidationMetadata';
import { IsEmail } from '../IsEmail';
import { MatchesRegex } from '../MatchesRegex';
import { IsNotBlank } from '../IsNotBlank';
import { IsOneOf } from '../IsOneOf';
import { Validate } from '../Validate';
import { IsValidModel } from '../IsValidModel';
import { NotBlankRule, EmailRule, OneOfRule, RegexMatchingRule } from '../../rules';
import { ValidModelRule } from '../../rules/ValidModelRule';
import { ValidationMetadataStore } from '../../metadata/ValidationMetadataStore';

class GuineaPig {
  @IsEmail()
  public emailField: string = '';

  @IsNotBlank()
  public notBlankField: string = '';

  @IsOneOf([8, 9])
  public oneOfField: number = 10;

  @IsValidModel('Must be a guinea pig')
  public validModel!: GuineaPig;

  @MatchesRegex(/abc/, 'test')
  public regexField: string = '';

  @Validate(new NotBlankRule())
  public [1]: string = '';
}

describe('The annotations should', () => {
  it('should have the annotations', () => {
    const validation = ValidationMetadataStore.getFieldValidation(GuineaPig);
    expect(validation).toContainEqual(
      new FieldValidationMetadata(GuineaPig.name, 'emailField', String, new EmailRule()),
    );
    expect(validation).toContainEqual(
      new FieldValidationMetadata(GuineaPig.name, 'notBlankField', String, new NotBlankRule()),
    );
    expect(validation).toContainEqual(
      new FieldValidationMetadata(GuineaPig.name, 'oneOfField', Number, new OneOfRule([8, 9])),
    );
    expect(validation).toContainEqual(
      new FieldValidationMetadata(GuineaPig.name, 'validModel', GuineaPig, new ValidModelRule('Must be a guinea pig')),
    );
    expect(validation).toContainEqual(
      new FieldValidationMetadata(GuineaPig.name, 'regexField', String, new RegexMatchingRule(/abc/, 'test')),
    );
    expect(validation).toContainEqual(
      new FieldValidationMetadata(GuineaPig.name, '1', String, new NotBlankRule()),
    );
  });
});

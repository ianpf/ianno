import { EmailRule } from './validation/rules/EmailRule';
import { ValidationMetadataStore } from './validation/metadata/ValidationMetadataStore';
import { IModel } from './common/IModel';
import 'reflect-metadata';
import { Map } from './common/Map';
import { NotBlankRule } from './validation/rules/NotBlankRule';
import { ValidationRule } from './validation/rules/ValidationRule';
import { ValidateField } from './validation/annotation/ValidateField';
import { FieldValidationMetadata } from './validation/metadata/FieldValidationMetadata';
import { Mappable } from './mapping/annotations/Mappable';
import { ApiField } from './mapping/annotations/ApiField';

// enum ValidationType {
//     NotBlank = 'NOT_BLANK',
//     Email = 'EMAIL',
//     Function = 'FUNCTION',
//     RegexMatch = 'REGEX_MATCH',
//     String = 'STRING',
//     Boolean = 'BOOLEAN',
//     Date = 'DATE',
// }

function Validate(target: any, key: PropertyKey, descriptor?: PropertyDescriptor) {
    // console.log(target);
    // console.log(descriptor);
    // console.log(Reflect.getMetadata('design:type', target, key.toString()));
    // console.log(`${target.constructor.name}#${key.toString()}`);
    Object.defineProperty(target, key, {
        get() {
            return this._value;
        },
        set(val) {
            this._value = val;
        },
    });
}

@Mappable
export class SomeClass {
    @ApiField
    public someProperty: string = '';
    @ValidateField(new NotBlankRule())
    public data: IModel = {};
    public validateModel() {
        return 'fuck';
    }
}

export function main() {
    const someClass = new SomeClass();
    console.log((someClass as any).constructor.name);
    console.log(someClass.validateModel());
    console.log(new EmailRule().evaluate('ian@.com', {}, 'email'));
    console.log(ValidationMetadataStore.getFieldValidation(SomeClass));
}

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
import {validate} from './validation/validate';

// @Mappable
// export class SomeClass {
//     @ApiField
//     public someProperty: string = '';
//     @ValidateField(new NotBlankRule())
//     public data?: IModel;
// }

export class SomeClass {
    @ValidateField(new NotBlankRule())
    public data?: IModel;
}

export async function main() {
    const someClass = new SomeClass();
    const someClass2 = new SomeClass();
    someClass.data = {};
    console.log((someClass as any).constructor.name);
    console.log(await validate(someClass, SomeClass));
    console.log(await validate(someClass2, SomeClass));
}

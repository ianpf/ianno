import { ValidationMetadataStore } from './validation/metadata/ValidationMetadataStore';
import { OneOfRule } from './validation/rules/OneOfRule';
import { EmailRule } from './validation/rules/EmailRule';
import { IModel } from './common/IModel';
import 'reflect-metadata';
import { NotBlankRule } from './validation/rules/NotBlankRule';
import { IsNotBlank, IsEmail, IsOneOf, validate, Validate } from './validation';

export class User {
    @IsNotBlank()
    public data?: IModel;
    @IsEmail()
    public userEmail?: IModel;
    @IsOneOf(['something2', 'something3'])
    public something = 'something';
}

export class Account {
    @Validate(new NotBlankRule('abc'))
    public owner: User = new User();

    public users: User[] = [];
    
}
console.log(ValidationMetadataStore.getFieldValidation(Account));

export async function main() {
    const user1 = new User();
    const user2 = new User();
    user1.data = {};
    console.log((user1 as any).constructor.name);
    console.log(await validate(user1, User));
    console.log(await validate(user2, User));
}

import { ValidationMetadataStore } from './validation/metadata/ValidationMetadataStore';
import { IModel } from './common/IModel';
import 'reflect-metadata';
import { IsNotBlank, IsEmail, IsOneOf, validate, Validate } from './validation';
import { ValidModelRule } from './validation/rules/ValidModelRule';

class BaseClass {
    @IsNotBlank()
    public data?: IModel;
}

class User extends BaseClass {
    @IsEmail()
    public userEmail?: string;
    @IsOneOf(['something2', 'something3'])
    public something = 'something';
}

class Account {
    @IsNotBlank()
    public stuff: string = '';
    @Validate(new ValidModelRule('abc'))
    public owner: User = new User();
}

export async function main() {
    const user1 = new User();
    // const user2 = new User();
    const account = new Account();
    account.owner = user1;
    user1.userEmail = 'abc@def.com';
    console.log(ValidationMetadataStore.getFieldValidation(Account));
    console.log((await validate(account, Account)).getErrors());
    // console.log((await validate(user1, User)).getErrors());
}

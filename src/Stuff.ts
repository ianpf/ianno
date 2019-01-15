import { ValidationMetadataStore } from './validation/metadata/ValidationMetadataStore';
import { OneOfRule } from './validation/rules/OneOfRule';
import { EmailRule } from './validation/rules/EmailRule';
import { IModel } from './common/IModel';
import 'reflect-metadata';
import { NotBlankRule } from './validation/rules/NotBlankRule';
import { IsNotBlank, IsEmail, IsOneOf, validate, Validate } from './validation';
import { IsValidModel } from './validation/rules/IsValidModel';
import { IConstructor } from './common/IConstructor';

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
    @Validate(new IsValidModel('abc'))
    public owner: User = new User();
    @Validate(new IsValidModel('def'))
    public users: User[] = [];
}

export async function main() {
    const user1 = new User();
    const user2 = new User();
    const account = new Account();
    account.owner = user1;
    // user1.data = {};
    user1.userEmail = 'abc@def.com';
    console.log(ValidationMetadataStore.getFieldValidation(account));
    console.log((await validate(account, Account)).getMessages());
    console.log((await validate(account, Account)).getMessages());
}

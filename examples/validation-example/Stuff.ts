import 'reflect-metadata';
import { IsNotBlank, IsEmail, IsOneOf, Validate, ValidModelRule, validate, Enabled, EmailRule } from '@ianno/validation';
// tslint:disable:max-classes-per-file

class BaseClass {
    @IsNotBlank()
    public data?: {[key: string]: string};
}

class User extends BaseClass {
    @IsEmail()
    public userEmail?: string;
    @IsOneOf(['something2', 'something3'])
    public something = 'something';
    @Validate(new Enabled(new EmailRule(), async () => {
        return true;
    }))
    public fakeEmail = '';
}

class Account {
    @IsNotBlank()
    public stuff: string = '';
    @Validate(new ValidModelRule('abc'))
    public owner: User = new User();
}

export async function main() {
    const user1 = new User();
    const account = new Account();
    account.owner = user1;
    user1.userEmail = 'abc@def.com';
    console.log((await validate(account, Account)).getErrors());
}

main();
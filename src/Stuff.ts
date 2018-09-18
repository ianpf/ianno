import { EmailRule } from './validation/rules/EmailRule';
import { IModel } from './common/IModel';
import 'reflect-metadata';
import { NotBlankRule } from './validation/rules/NotBlankRule';
import { Validate } from './validation/annotation/Validate';
import { validate } from './validation/validate';

export class User {
    @Validate(new NotBlankRule())
    public data?: IModel;
    @Validate(new EmailRule())
    public userEmail?: IModel;
}

export async function main() {
    const user1 = new User();
    const user2 = new User();
    user1.data = {};
    console.log((user1 as any).constructor.name);
    console.log(await validate(user1, User));
    console.log(await validate(user2, User));
}

import { OneOfRule } from './validation/rules/OneOfRule';
import { EmailRule } from './validation/rules/EmailRule';
import { IModel } from './common/IModel';
import 'reflect-metadata';
import { NotBlankRule } from './validation/rules/NotBlankRule';
import { Validate } from './validation/annotation/Validate';
import { validate } from './validation/validate';
import { IsEmail } from './validation/annotation/IsEmail';
import { IsNotBlank } from './validation/annotation/IsNotBlank';
import { IsOneOf } from './validation/annotation/IsOneOf';

export class User {
    @IsNotBlank()
    public data?: IModel;
    @IsEmail()
    public userEmail?: IModel;
    @IsOneOf(['something2', 'something3'])
    public something = 'something';
}

export async function main() {
    const user1 = new User();
    const user2 = new User();
    user1.data = {};
    console.log((user1 as any).constructor.name);
    console.log(await validate(user1, User));
    console.log(await validate(user2, User));
}

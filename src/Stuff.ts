import { ValidationMetadataStore } from './validation/metadata/ValidationMetadataStore';
import { IModel } from './IModel';
import 'reflect-metadata';
import { Map } from './common/Map';
import { NotBlankRule } from './validation/rules/NotBlankRule';
import { ValidationRule } from './validation/rules/ValidationRule';
import { ValidateField } from './validation/annotation/ValidateField';
import { FieldValidationMetadata } from './validation/metadata/FieldValidationMetadata';

// class ClassFieldMetadata {
//     constructor(public modelName: string, public apiName: string, public type: string) {}
// }

// class ApiFieldMetaStore {
//     public static classFieldMetadata: Map<string, ClassFieldMetadata[]> = new Map();

//     public static addClassFieldMeta(className: string, field: string, type: string, alias: string): void {
//         const classFields = this.classFieldMetadata.get(className, []);
//         classFields.push(new ClassFieldMetadata(field, alias, type));
//         this.classFieldMetadata.put(className, classFields);
//     }
// }

function snakeToCamel(str: string) {
    return str.replace(/(\-\w)/g, (char: string) => char[1].toUpperCase());
}

function camelToSnake(str: string) {
    return str.replace(/([A-Z])/g, (char: string) => '_' + char.toLowerCase());
}

// function ApiFieldFactory(alias?: string): (target: any, key: PropertyKey, descriptor?: PropertyDescriptor) => void {
//     return (target: any, key: PropertyKey, descriptor?: PropertyDescriptor) => {
//         ApiFieldMetaStore.addClassFieldMeta(
//             target.constructor.name,
//             key.toString(),
//             Reflect.getMetadata('design:type', target, key.toString()),
//             alias || camelToSnake(key.toString()),
//         );
//     };
// }

// function ApiField(target: any, key: PropertyKey, descriptor?: PropertyDescriptor): void;
// function ApiField(alias?: string): (target: any, key: PropertyKey, descriptor?: PropertyDescriptor) => void;
// function ApiField(...args: any[]) {
//     if (args.length === 3) {
//         const [target, key, descriptor] = args;
//         ApiFieldMetaStore.addClassFieldMeta(
//             target.constructor.name,
//             key,
//             Reflect.getMetadata(key, target),
//             camelToSnake(key),
//         );
//     } else if (args.length === 2) {
//         const [target, key] = args;
//         ApiFieldMetaStore.addClassFieldMeta(
//             target.constructor.name,
//             key,
//             Reflect.getMetadata(key, target),
//             camelToSnake(key),
//         );
//     } else if (args.length === 1) {
//         const [alias] = args;
//         return ApiFieldFactory(alias);
//     } else {
//         return ApiFieldFactory();
//     }
// }

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

interface IConstructor<T> {
    new(...args: any[]): T;
}

interface IClassValidation {
    __VALIDATION__: () => string;
}

function ClassValidation<T extends IConstructor<{}>>(constructor: T): T & IConstructor<IClassValidation> {
    const wrapper: IConstructor<IClassValidation> & T = constructor as any;
    wrapper.prototype.__VALIDATION__ = () => {
        return 'hah';
    };
    return wrapper as IConstructor<IClassValidation> & T;
}

@ClassValidation
export class SomeClass {
    public someProperty: string = '';
    @ValidateField(new NotBlankRule())
    public data: IModel = {};
    public validateModel() {
        return 'fuck';
    }
}

export function main() {
    const someClass = new SomeClass();
    console.log(ValidationMetadataStore.getFieldValidation(SomeClass));
}

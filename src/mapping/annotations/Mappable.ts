// import { TypescriptMetadataKeys } from './../../common/TypescriptMetadataKeys';
// import 'reflect-metadata';
// import { IConstructor } from './../../common/IConstructor';

// function isConstructor<T>(constructor: unknown): constructor is {new(): any, name: string} {
//     return true;
// }

// interface IMappableModel {
//     originalName: string;
// }

// export function Mappable<T extends IConstructor<any>>(constructor: T): T & IConstructor<IMappableModel> {
//     const component = new Proxy<T>(constructor, {
//         construct: (...args: any[]) => {
//             const proxified = new constructor(...args);
//             return proxified;
//         },
//     });
//     return component;
// }

// function isMappableModel(model: unknown) {
//     if (model instanceof Proxy) {

//     }
// }

// function ClassValidation<T extends IConstructable<{}>>(constructor: T): T & IConstructable<IClassValidation> {
//     const wrapper: IConstructable<IClassValidation> & T = constructor as any;
//     wrapper.prototype.__VALIDATION__ = () => {
//         return 'hah';
//     };
//     return wrapper as IConstructable<IClassValidation> & T;
// }

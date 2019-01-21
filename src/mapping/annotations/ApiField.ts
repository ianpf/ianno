// import 'reflect-metadata';
// import { ApiFieldMetaStore } from './../metadata/ApiFIeldMetaStore';
// import {camelToSnake, snakeToCamel} from '../../common/';

// export function ApiField(target: any, key: PropertyKey, descriptor?: PropertyDescriptor): void;
// export function ApiField(alias?: string): (target: any, key: PropertyKey, descriptor?: PropertyDescriptor) => void;
// export function ApiField(...args: any[]) {
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

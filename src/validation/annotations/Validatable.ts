import { TypescriptMetadataKeys } from './../../common/TypescriptMetadataKeys';
import 'reflect-metadata'
import { IConstructor } from './../../common/IConstructor';

const validationSymbols: [IConstructor<any>, Symbol][] = [];

function isConstructor<T>(constructor: unknown): constructor is {new(): any, name: string} {
    return true;
}

interface IMappableModel {
    originalName: string;
}

function addSymbolTuple<T>(target: IConstructor<T>) {
    let targetTuple = validationSymbols.find(([constructor]) => constructor === target);
    if (targetTuple) {
        targetTuple = targetTuple || [target, Symbol(target.constructor.name)];
        validationSymbols.push(targetTuple);
    }

}

export function Validatable<T extends IConstructor<any>>(constructor: T): IConstructor<IMappableModel> {
    class component extends constructor {
        
    }
    component.prototype.validationSymbols
    return constructor;
}

function isMappableModel(model: unknown) {
    if (model instanceof Proxy) {
        
    }
}

function addValidationSymbol(target: any, ) {

}

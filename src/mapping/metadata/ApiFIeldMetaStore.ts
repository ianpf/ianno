import { ClassFieldMetadata } from './ApiFieldMeta';
import { Map } from './../../common/Map';

export class ApiFieldMetaStore {
    public static classFieldMetadata: Map<string, ClassFieldMetadata[]> = new Map();

    public static addClassFieldMeta(className: string, field: string, type: string, alias: string): void {
        const classFields = this.classFieldMetadata.get(className, []);
        classFields.push(new ClassFieldMetadata(field, alias, type));
        this.classFieldMetadata.put(className, classFields);
    }
}

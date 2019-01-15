import { IModel } from '../common/IModel';
import { ValidationMetadataStore } from './metadata/ValidationMetadataStore';
import { ValidationResults } from './ValidationResults';
import { IConstructor } from '../common/IConstructor';

function* prototypes(object: InstanceType<IConstructor<{}>>): IterableIterator<object> {
    let prototype = object;
    do {
        prototype = Object.getPrototypeOf(prototype);
        if (prototype && typeof prototype === 'object') {
            yield prototype;
        }
    } while (prototype);
}

export async function validate(
    model: NonNullable<IModel>,
    modelClass: IConstructor<IModel>,
): Promise<ValidationResults> {
    const validationRules = ValidationMetadataStore.getFieldValidation(modelClass);
    for (const prototype of prototypes(model)) {
        validationRules.push(...ValidationMetadataStore.getFieldValidation(prototype));
    }
    const results = new ValidationResults();
    for (const ruleMeta of validationRules) {
        const { fieldName, validation, type } = ruleMeta;
        const result = await validation.evaluate(model[fieldName], model, fieldName, type);
        if (result) {
            results.addResult(fieldName, result);
        }
        results.valid = result.valid;
    }
    return results;
}

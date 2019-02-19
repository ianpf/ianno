import { Constructor } from './common/Constructor';
import { Model } from './common/Model';
import { ValidationMetadataStore } from './metadata/ValidationMetadataStore';
import { ValidationResults } from './ValidationResults';

export async function validate(
    model: NonNullable<Model>,
    modelClass: Constructor<Model>,
): Promise<ValidationResults> {
    const validationRules = ValidationMetadataStore.getFieldValidation(modelClass);
    const results = new ValidationResults();
    for (const ruleMeta of validationRules) {
        const { fieldName, validation, type } = ruleMeta;
        let result = await validation.evaluate(model[fieldName], fieldName, model, type);
        result = result instanceof Array ? result : [result];
        result = result.filter((item) => !item.valid);
        if (result.length > 0) {
            results.addResults(result);
        }
    }
    return results;
}

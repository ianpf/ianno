import { IModel } from '../common/IModel';
import { ValidationMetadataStore } from './metadata/ValidationMetadataStore';
import { ValidationResults } from './ValidationResults';
import { IConstructor } from '../common/IConstructor';

export async function validate(
    model: NonNullable<IModel>,
    modelClass: IConstructor<IModel>,
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

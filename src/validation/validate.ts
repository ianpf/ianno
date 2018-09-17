import { IModel } from "../common/IModel";
import { ValidationMetadataStore } from "./metadata/ValidationMetadataStore";
import {ValidationResults} from './ValidationResults';
import {IConstructor} from '../common/IConstructor';

export async function validate(model: IModel, modelClass: IConstructor<IModel>) {
    const validationRules = ValidationMetadataStore.getFieldValidation(modelClass);
    const results = new ValidationResults();
    for (const ruleMeta of validationRules) {
        const {fieldName, validation} = ruleMeta;
        const {valid, message} = await validation.evaluate(model[fieldName], model, fieldName);
        if (message) results.addMessage(message);
        results.valid = valid;
    }
    return results;
}

import { IModel } from "../common/IModel";
import { ValidationMetadataStore } from "./metadata/ValidationMetadataStore";



async function validate(model: IModel) {
    const validationRules = ValidationMetadataStore.getFieldValidation(model);
    for (const ruleMeta of validationRules) {
        const {fieldName, validation} = ruleMeta;
        const {valid, message} = await validation.evaluate(model[fieldName], model, fieldName);

    }
}

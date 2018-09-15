import { IModel } from "../common/IModel";
import { ValidationMetadataStore } from "./metadata/ValidationMetadataStore";


function validate(model: IModel) {
    const validationRules = ValidationMetadataStore.getFieldValidation(model);
    for (const rule of validationRules)
}
import React from 'react';
import { ValidationRule, ValidationResults } from '@ianno/validation/src/validation';

interface Prop {
  validation: Many<ValidationRule>;
}

interface State {
  result: ValidationResults;
}

export class ValidationErrors extends React.Component<Prop, State> {

}

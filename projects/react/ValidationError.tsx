import React from 'react';
import { ValidationRule, ValidationResults } from '@ianno/validation';

interface Prop {
  validation: Many<ValidationRule>;
  value: any;
}

interface State {
  result: ValidationResults;
}

export class ValidationErrors extends React.Component<Prop, State> {
  public componentDidUpdate() {
    const rules = this.props.validation instanceof Array ? this.props.validation : [this.props.validation];
    for (const rule of rules) {
      rule.evaluate();
    }
  }
  public render() {
    return (
      <div>
        <ul className={'validation-results'}>
          {
            this.state.result.getErrors().map((item) => {
              return (
                <li className={'validation-results-item'}>
                  {item.message}
                </li>
              );
            })
          }
        </ul>
        {this.props.children}
      </div>
    );
  }
}

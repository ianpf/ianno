import { ValidationRule, ValidationResults } from '@ianno/validation';
import * as React from 'react';

interface Props {
  validation: Array<ValidationRule>;
  value: any;
}

interface State {
  results: ValidationResults;
}

export class ValidationErrors extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: new ValidationResults([]),
    };
  }

  public async componentDidMount() {
    const rules = this.props.validation instanceof Array ? this.props.validation : [this.props.validation];
    const results = new ValidationResults();
    for (const rule of rules) {
      const result = await rule.evaluate(this.props.value, 'blankField');
      results.addResults(result);
    }
    this.setState({
      results,
    });
  }
  public componentDidUpdate() {
    const rules = this.props.validation instanceof Array ? this.props.validation : [this.props.validation];
    for (const rule of rules) {
      rule.evaluate(this.props.value, 'blankField');
    }
  }
  public render() {
    return (
      <div>
        <ul className={'validation-results'}>
          {
            this.state.results.getErrors().map((item, index) => {
              return (
                <li className={'validation-results-item'} key={item.fieldName + index}>
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

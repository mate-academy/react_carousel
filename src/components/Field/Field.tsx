import { PureComponent } from 'react';
import { Field as FieldTypes } from '../../types/Field';

import './Field.scss';

export class Field extends PureComponent<FieldTypes, {}> {
  render() {
    const {
      name,
      type,
      value,
      checked,
      className,
      onChange,
    } = this.props;

    const renderInput = type === 'number'
      ? (
        <input
          id={name}
          type={type}
          onChange={onChange}
          className="Field"
          value={value}
        />
      )
      : (
        <input
          id={name}
          type={type}
          onChange={onChange}
          className="Field"
          checked={checked}
        />
      );

    return (
      <div className={className}>
        <label htmlFor={name}>
          {name}
        </label>
        {renderInput}
      </div>
    );
  }
}

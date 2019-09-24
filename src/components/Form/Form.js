import React from 'react';
import PropTypes from 'prop-types';

import './Form.scss';
import Input from '../Input/Input';

const Form = ({ onChange }) => (
  <form className="form">
    <Input
      label="Image width (px):"
      name="itemWidth"
      type="number"
      onBlur={onChange}
    />
    <Input
      label="Step:"
      name="step"
      type="number"
      onChange={onChange}
    />
    <Input
      label="Animation Duration:"
      name="animationDuration"
      type="number"
      onBlur={onChange}
    />
    <Input
      label="Infinite:"
      name="infinite"
      type="checkbox"
      onClick={onChange}
    />
  </form>
);

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Form;

import React from 'react';
import './Button.scss';
import { ButtonTypes } from '../../constants/proptypes';

const Button = ({ text, onClick }) => (
  <button type="button" onClick={onClick}>{text}</button>
);

Button.propTypes = ButtonTypes;

export default Button;

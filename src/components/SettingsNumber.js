import React from 'react';
import PropTypes from 'prop-types';

const SettingsNumber = ({ id, type, name, value, handler }) => (
  <label htmlFor={id} className="settings__field-label">
    <span className="settings__fild-name">{`${name}: `}</span>
    <input
      id={id}
      type={type}
      value={value}
      className="settings__field"
      onChange={e => handler(id, e.target.value)}
    />
  </label>
);

SettingsNumber.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};

export default SettingsNumber;

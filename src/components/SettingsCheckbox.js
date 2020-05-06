import React from 'react';
import PropTypes from 'prop-types';

const SettingsCheckbox = ({ id, type, name, value, handler }) => (
  <label htmlFor={id} className="settings__field-label">
    <span>{`${name}: `}</span>
    <input
      id={id}
      type={type}
      checked={value}
      className="settings__field"
      onChange={e => handler(id, e.target.checked)}
    />
  </label>
);

SettingsCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
};

export default SettingsCheckbox;

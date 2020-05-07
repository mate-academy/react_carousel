import React from 'react';
import PropTypes from 'prop-types';

const SettingsForm = ({ infinite, onChangeSettings }) => (
  <form className="form">
    <div>
      <select
        className="form__item form__select"
        name="itemWidth"
        onChange={onChangeSettings}
      >
        <option value="" hidden>image size</option>
        <option value="75">75px</option>
        <option value="100">100px</option>
        <option value="200">200px</option>
      </select>
      <select
        className="form__item form__select"
        name="step"
        onChange={onChangeSettings}
      >
        <option value="" hidden>step</option>
        <option value="1">1</option>
        <option value="3">3</option>
      </select>
      <select
        className="form__item form__select"
        name="frameSize"
        onChange={onChangeSettings}
      >
        <option value="" hidden>frame size</option>
        <option value="1">1</option>
        <option value="3">3</option>
      </select>
    </div>
    <label>
      endless scrolling:
      <input
        type="checkbox"
        checked={infinite}
        onChange={onChangeSettings}
      />
    </label>
  </form>
);

export default SettingsForm;

SettingsForm.propTypes = {
  infinite: PropTypes.bool.isRequired,
  onChangeSettings: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

const Settings = ({ option, frameSize, step, infinite, onChangeSetting }) => (
  <div className="ui inverted orange segment setting">
    <div className="ui inverted equal width form mini">
      <div className="fields">
        <div className="field setting__frame">
          Number of emojis in the frame
          <select
            name="frameSize"
            value={frameSize}
            onChange={onChangeSetting}
            className="setting__select"
          >
            {option.map((num, idx) => (
              <option key={num} value={idx + 1}>{num}</option>
            ))}
          </select>
        </div>
        <div className="field setting__step">
          Slide step
          <select
            name="step"
            value={step}
            onChange={onChangeSetting}
            className="setting__select"
          >
            {option.slice(0, frameSize).map((num, idx) => (
              <option key={num} value={idx + 1}>{num}</option>
            ))}
          </select>
        </div>
        <div className="field setting__infinite">
          Infinite
          <div className="ui checkbox">
            <input
              onChange={onChangeSetting}
              checked={infinite}
              id="infinite"
              name="infinite"
              type="checkbox"
              className="hidden"
            />
            <label htmlFor="infinite" aria-label={infinite} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Settings.propTypes = {
  option: PropTypes.arrayOf(PropTypes.string).isRequired,
  frameSize: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  infinite: PropTypes.bool.isRequired,
  onChangeSetting: PropTypes.func.isRequired,
};

export default Settings;

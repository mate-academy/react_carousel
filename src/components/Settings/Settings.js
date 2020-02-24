import React from 'react';
import './Settings.css';
import PropTypes from 'prop-types';

export class Settings extends React.Component {
  state = {
    settingsObj: {
      step: 1,
      frameSize: 1,
      itemWidth: 130,
      animationDuration: 600,
      infinite: true,
    },
    forbiddenSettings: true,
  };

  handlerCheckbox = (e) => {
    const isChecked = e.target.checked;

    this.setState(prev => ({
      settingsObj: {
        ...prev.settingsObj,
        step: isChecked ? 1 : prev.settingsObj.step,
        frameSize: isChecked ? 1 : prev.settingsObj.frameSize,
        infinite: isChecked,
      },
      forbiddenSettings: isChecked,
    }));
  };

  handlerChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState(prev => ({
      settingsObj: {
        ...prev.settingsObj,
        [name]: +value,
      },
    }));
  };

  handlerSubmit = (e) => {
    e.preventDefault();
    this.props.submitFunc(this.state.settingsObj);
  };

  render() {
    const { className } = this.props;
    const { settingsObj, forbiddenSettings } = this.state;

    return (
      <div className={className}>
        <h4 className="Settings__title">Input your settings</h4>
        <form
          action="#"
          onSubmit={this.handlerSubmit}

        >
          <fieldset className="form-group">
            <label htmlFor="customRange1">Step</label>
            <span className="Settings__value">
              Value:
              {settingsObj.step}
            </span>
            <input
              min="1"
              max="5"
              id="customRange1"
              onChange={this.handlerChange}
              value={settingsObj.step}
              className="Settings__input custom-range"
              name="step"
              type="range"
            />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="customRange2">Frame Size</label>
            <span className="Settings__value">
              Value:
              {settingsObj.frameSize}
            </span>
            <input
              min="1"
              max="5"
              value={settingsObj.frameSize}
              id="customRange2"
              onChange={this.handlerChange}
              className="Settings__input custom-range"
              name="frameSize"
              type="range"
            />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="customRange3">Item Width</label>
            <span className="Settings__value">
              Value:
              {settingsObj.itemWidth}
            </span>
            <input
              min="100"
              max="150"
              step="10"
              id="customRange3"
              value={settingsObj.itemWidth}
              onChange={this.handlerChange}
              className="Settings__input custom-range"
              name="itemWidth"
              type="range"
            />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="customRange4">Animation Duration</label>
            <span className="Settings__value">
              Value:
              {settingsObj.animationDuration}
            </span>
            <input
              min="100"
              max="2000"
              step="200"
              id="customRange4"
              value={settingsObj.animationDuration}
              onChange={this.handlerChange}
              className="Settings__input custom-range"
              name="animationDuration"
              type="range"
            />
          </fieldset>
          <div className="custom-control custom-switch">
            <input
              onChange={this.handlerCheckbox}
              type="checkbox"
              className="custom-control-input"
              name="infinite"
              id="customSwitch1"
              checked={settingsObj.infinite}
            />
            <label
              className="custom-control-label"
              htmlFor="customSwitch1"
            >
              Infinite
            </label>
          </div>
          <button
            className="Settings__btn"
            type="submit"
          >
            Change Settings
          </button>
        </form>

        {forbiddenSettings
        && (
          <p className="Settings__forbidden">
          These settings are only available outside of infinity mode
          </p>
        )
        }
      </div>
    );
  }
}

Settings.propTypes = {
  submitFunc: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

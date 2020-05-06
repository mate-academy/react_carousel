import React from 'react';
import PropTypes from 'prop-types';
import SettingsNumber from './SettingsNumber';
import SettingsCheckbox from './SettingsCheckbox';
import './Settings.css';

const CarouselSettings = ({ setSettings, settings }) => (
  <form className="settings">
    <SettingsNumber
      id="step"
      name="Images by step (qty)"
      type="number"
      value={settings.step}
      handler={setSettings}
    />
    <SettingsNumber
      id="frameSize"
      name="Size of Frame (qty)"
      type="number"
      value={settings.frameSize}
      handler={setSettings}
    />
    <SettingsNumber
      id="itemWidth"
      name="Width of Item (px)"
      type="number"
      value={settings.itemWidth}
      handler={setSettings}
    />
    <SettingsNumber
      id="itemHeight"
      name="Height of Item (px)"
      type="number"
      value={settings.itemHeight}
      handler={setSettings}
    />
    <SettingsNumber
      id="animationDuration"
      name="Animation Duration (ms)"
      type="number"
      value={settings.animationDuration}
      handler={setSettings}
    />
    <SettingsCheckbox
      id="infinity"
      name="Is Infinity"
      type="checkbox"
      value={settings.infinity}
      handler={setSettings}
    />
  </form>
);

CarouselSettings.propTypes = {
  setSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    step: PropTypes.number.isRequired,
    frameSize: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    animationDuration: PropTypes.number.isRequired,
    infinity: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CarouselSettings;

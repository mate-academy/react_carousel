import React from 'react';
import { CaroSettings } from '../../Types';
import './Carusel-setings.scss';

type Props = {
  changeInput: (e: React.FormEvent<HTMLInputElement>, param:string) => void,
  settings: CaroSettings;

};

const CarouselSetings: React.FC<Props> = ({ changeInput, settings }) => {
  return (
    <div className="settings">
      <span>Image width </span>
      <div className="input_wrap">
        <input
          value={settings.width}
          type="range"
          min="50"
          max="360"
          onChange={(e) => {
            changeInput(e, 'width');
          }}
        />
        <span>{settings.width}</span>
      </div>
      <span>Number of pictures </span>
      <div className="input_wrap">
        <input
          value={settings.frameSize}
          type="range"
          min="1"
          max="10"
          step="1"
          list="img"
          onChange={(e) => {
            changeInput(e, 'frameSize');
          }}
        />
        <span>{settings.frameSize}</span>
      </div>
      <span>Scroll Step </span>
      <div className="input_wrap">
        <input
          value={settings.step}
          type="range"
          min="1"
          max="10"
          onChange={(e) => {
            changeInput(e, 'step');
          }}
        />
        <span>{settings.step}</span>
      </div>

      <span>Animation Speed</span>
      <div className="input_wrap">
        <input
          value={settings.speed}
          type="range"
          min="100"
          max="2000"
          onChange={(e) => {
            changeInput(e, 'speed');
          }}
        />
        <span>{settings.speed}</span>
      </div>
    </div>
  );
};

export default CarouselSetings;

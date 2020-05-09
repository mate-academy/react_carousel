import React, { PureComponent } from 'react';
import './CarouselSettings.scss';
import PropTypes from 'prop-types';

export default class CarouselSettings extends PureComponent {
  render() {
    const {
      images,
      onChangeItemWidth,
      itemWidth,
      onchangeFrameSize,
      onChangeStep,
      onChangeAnimationDuration,
      onChangeFinite,
    } = this.props;

    return (
      <form className="form">
        <label htmlFor="frameSize">Frame Size</label>
        <select
          className="form__select"
          id="frameSize"
          onChange={onchangeFrameSize}
        >
          {images.map((image, i) => (
            <option key={image} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <label htmlFor="itemWidth">Item Width</label>
        <input
          type="range"
          min="50"
          max="300"
          step="10"
          value={itemWidth}
          onChange={onChangeItemWidth}
        />

        <label htmlFor="step">Step</label>
        <select
          className="form__select"
          id="step"
          onChange={onChangeStep}
        >
          {images.map((image, i) => (
            <option key={image} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <label htmlFor="duration">Animation Duration</label>
        <input
          type="number"
          className="form__input"
          name="duration"
          id="duration"
          onChange={onChangeAnimationDuration}
          placeholder="1000"
        />

        <label htmlFor="infinite">Infinite</label>
        <input
          type="checkbox"
          className="form__input"
          name="infinite"
          id="infinite"
          onChange={onChangeFinite}
        />
      </form>
    );
  }
}

CarouselSettings.propTypes = {
  images: PropTypes.arrayOf.isRequired,
  onChangeItemWidth: PropTypes.func.isRequired,
  itemWidth: PropTypes.func.isRequired,
  onchangeFrameSize: PropTypes.func.isRequired,
  onChangeStep: PropTypes.func.isRequired,
  onChangeAnimationDuration: PropTypes.func.isRequired,
  onChangeFinite: PropTypes.func.isRequired,
};

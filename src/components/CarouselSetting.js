/* eslint-disable no-return-assign */
import React from 'react';
import { CarouselTypes, CarouselDefault } from './CarouselTypes';

import './CarouselSetting.scss';

export class CarouselSetting extends React.Component {
  validUrl = (str) => {
    // eslint-disable-next-line max-len
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (regexp.test(str)) {
      return true;
    }

    return false;
  }

  handleAddImages = (event) => {
    const newImage = event.target.previousSibling;

    if (this.validUrl(newImage.value)) {
      const updateImages = [...this.props.images, newImage.value];

      this.props.handleGetValue(updateImages, 'images');
    }

    this.validUrl(newImage.value)
      ? newImage.className = 'add-image'
      : newImage.className = 'add-image invalid';
    newImage.value = '';
  }

  render() {
    const {
      imagesLength,
      frameSize,
      step,
      itemWidth,
      animationDuration,
      indexFrame,
      handleGetValue,
    } = this.props;

    return (
      <div className="CarouselSetting">
        <form>
          <label htmlFor="image">Image</label>
          <div className="range">
            <input
              className="add-image"
              type="text"
              id="image"
              placeholder="Input image src..."
            />
            <input
              className="add-image"
              type="button"
              value="+"
              id="image"
              onClick={event => this.handleAddImages(event)}
            />
          </div>

          <label htmlFor="step">Step</label>
          <div className="range">
            <input
              type="range"
              id="step"
              min="1"
              max="5"
              step="1"
              value={step}
              onChange={
                (event) => {
                  handleGetValue(event.target.value, 'step');
                  if (event.target.value > frameSize) {
                    handleGetValue(
                      event.target.value,
                      'frameSize',
                    );
                  }
                }
              }
            />
          </div>

          <label htmlFor="frameSize">Frame Size</label>
          <div className="range">
            <input
              type="range"
              id="frameSize"
              min="1"
              max="5"
              step="1"
              value={frameSize}
              onChange={
                (event) => {
                  handleGetValue(
                    event.target.value,
                    'frameSize',
                  );

                  if (event.target.value < step) {
                    handleGetValue(
                      event.target.value,
                      'step',
                    );
                  }
                }
              }
            />
          </div>

          <label htmlFor="itemWidth">Item Width</label>
          <div className="range">
            <input
              type="range"
              id="itemWidth"
              min="100"
              max="260"
              step="10"
              value={itemWidth}
              onChange={
                (event) => {
                  handleGetValue(
                    event.target.value,
                    'itemWidth',
                  );
                  handleGetValue(
                    Math.min(
                      event.target.value * step * indexFrame,
                      event.target.value * (imagesLength - frameSize),
                    ),
                    'currentPosition',
                  );
                }
              }
            />
          </div>

          <label htmlFor="animationDuration">Animation Duration</label>
          <div className="range">
            <input
              type="range"
              id="animationDuration"
              min="100"
              max="1500"
              step="100"
              value={animationDuration}
              onChange={
                event => handleGetValue(
                  event.target.value,
                  'animationDuration',
                )
              }
            />
          </div>

          <label htmlFor="infinite">Infinite</label>
          <div className="range">
            <label>
              <input
                type="checkbox"
                id="infinite"
                onChange={
                  event => handleGetValue(
                    event.target.checked,
                    'infinite',
                  )}
              />
              True
            </label>
          </div>
        </form>
      </div>
    );
  }
}

CarouselSetting.propTypes = CarouselTypes;
CarouselSetting.defaultProps = CarouselDefault;

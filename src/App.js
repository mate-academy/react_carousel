import React from 'react';
import './App.css';
import Carousel from './components/Carousel';
import CarouselSettings from './components/Settings';
import imagesFromServer from './api/images.json';

const defaultSettings = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  itemHeight: 130,
  animationDuration: 1000,
  infinity: true,
};

class App extends React.PureComponent {
  state = {
    images: [...imagesFromServer],
    settings: { ...defaultSettings },
    restRight: imagesFromServer.length - defaultSettings.step,
    restLeft: 0,
    offset: 0,
    shift: 0,
  };

  calculateOffset = (rest) => {
    const { step, itemWidth, infinity } = this.state.settings;

    const correctedRest = (rest < 0) ? 0 : rest;

    if (infinity) {
      return step * itemWidth;
    }

    return (correctedRest < 3)
      ? correctedRest * itemWidth
      : step * itemWidth;
  }

  handleScroll = (direction) => {
    const { settings, restLeft, restRight } = this.state;
    const { step, itemWidth, infinity } = settings;
    const isToRight = direction < 0;
    const isToLeft = direction > 0;
    const leftOffset = this.calculateOffset(restLeft);
    const rightOffset = this.calculateOffset(restRight);

    if (restRight < step && isToRight && infinity) {
      this.setState(state => ({
        ...state,
        images: [
          ...state.images,
          ...imagesFromServer.map((item, i) => ({
            ...item,
            id: +new Date() + i,
          })),
        ],
        restRight: state.restRight + imagesFromServer.length - step,
        restLeft: state.restLeft + step,
        leftI: state.leftI + step,
        offset: state.offset + rightOffset * direction,
      }));

      return;
    }

    if (restLeft < step && isToLeft && infinity) {
      this.setState(state => ({
        ...state,
        images: [
          ...imagesFromServer.map((item, i) => ({
            ...item,
            id: +new Date() + i,
          })),
          ...state.images,
        ],
        restLeft: state.restLeft + imagesFromServer.length - step,
        restRight: state.restRight + step,
        offset: state.offset + leftOffset * direction,
        shift: state.shift - imagesFromServer.length * itemWidth,
      }));

      return;
    }

    if (isToLeft) {
      this.setState(state => ({
        ...state,
        restLeft: (state.restLeft - step > 0) ? state.restLeft - step : 0,
        restRight: state.restRight + leftOffset / itemWidth,
        offset: state.offset + leftOffset * direction,
      }));
    }

    if (isToRight) {
      this.setState(state => ({
        ...state,
        restRight: (state.restRight - step > 0) ? state.restRight - step : 0,
        restLeft: state.restLeft + rightOffset / itemWidth,
        offset: state.offset + rightOffset * direction,
      }));
    }
  }

  setSettings = (field, value) => {
    const { settings } = this.state;
    let correctedValue = value;

    if (value === 'false') {
      correctedValue = false;
    } else if (value === 'true') {
      correctedValue = true;
    } else if (Number.isInteger(parseInt(value, 10))) {
      correctedValue = parseInt(value, 10) || 1;
    }

    if (field === 'step' && correctedValue > settings.frameSize) {
      correctedValue = settings.frameSize;
    }

    if (field === 'infinity') {
      this.setState(state => ({
        images: [...imagesFromServer],
        settings: {
          ...state.settings,
          [field]: correctedValue,
        },
        restRight: imagesFromServer.length - defaultSettings.step,
        restLeft: 0,
        offset: 0,
        shift: 0,
      }));

      return;
    }

    this.setState(state => ({
      settings: {
        ...state.settings,
        [field]: correctedValue,
        restRight: (field === 'step')
          ? imagesFromServer.length - correctedValue
          : state.settings.step,
      },
    }));
  }

  render() {
    const { settings, images, offset, shift } = this.state;

    return (
      <div className="app">
        <h1>{`Carousel with ${imagesFromServer.length} images`}</h1>

        <CarouselSettings
          setSettings={this.setSettings}
          settings={settings}
        />
        <Carousel
          images={images}
          settings={settings}
          handleScroll={this.handleScroll}
          offset={offset}
          shift={shift}
        />
      </div>
    );
  }
}

export default App;

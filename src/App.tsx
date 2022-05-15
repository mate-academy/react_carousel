import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type Settings = {
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  isAnimation: boolean,
  isInfinite: boolean;
  shift: number,
  shiftInner: number,
  isScrollLeft: boolean,
};

type State = {
  images: string[];
  settings: Settings;
};

const defaultLength = 10;

class App extends React.Component<{}, State> {
  state: State = {
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],
    settings: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      isAnimation: true,
      isInfinite: false,
      shift: 0,
      shiftInner: 0,
      isScrollLeft: false,
    },
  };

  componentDidUpdate() {
    if (!this.state.settings.isAnimation && !this.state.settings.isInfinite) {
      const newSettings = this.state.settings;

      this.setState({
        settings: {
          ...newSettings,
          isAnimation: true,
          shift: 0,
          shiftInner: 0,
        },
      });
    }

    if (this.state.settings.isScrollLeft
      && this.state.settings.isInfinite
      && this.state.images.length === defaultLength) {
      const prevImage = this.state.images.splice(0, this.state.settings.step);
      const newImages = [...this.state.images, ...prevImage];
      const shift = this.state.settings.itemWidth * this.state.settings.step;

      setTimeout(() => {
        this.setState(({ settings }) => {
          return ({
            images: newImages,
            settings: {
              ...settings,
              shift: settings.shift + shift,
              shiftInner: settings.shiftInner,
              isScrollLeft: false,
              isAnimation: false,
            },
          });
        });
      }, this.state.settings.animationDuration);
    }
  }

  scrollLeft = () => {
    if (this.state.settings.isInfinite && !this.state.settings.isScrollLeft) {
      this.setState(({ settings }) => {
        const shift = settings.itemWidth * settings.step;

        return ({
          settings: {
            ...settings,
            shift: settings.shift - shift,
            shiftInner: settings.shiftInner,
            isScrollLeft: true,
            isAnimation: true,
          },
        });
      });
    }

    if (!this.state.settings.isInfinite) {
      this.setState(({ images, settings }) => {
        const shift = settings.itemWidth * settings.step;
        let addShift = settings.shift - shift;

        if (settings.shift - shift
            < -(images.length - 1) * settings.itemWidth) {
          addShift = -(images.length - settings.frameSize) * settings.itemWidth;
        }

        return ({
          images,
          settings: {
            ...settings,
            shift: addShift,
          },
        });
      });
    }
  };

  scrollRight = () => {
    if (this.state.settings.isInfinite) {
      this.setState(({ images, settings }) => {
        const prevImage = images.splice(-settings.step);
        const newImages = [...prevImage, ...images];
        const shift = settings.itemWidth * settings.step;

        return ({
          images: newImages,
          settings: {
            ...settings,
            shift: settings.shift - shift,
            shiftInner: settings.shiftInner + shift,
            isAnimation: false,
          },
        });
      });
    }

    if (!this.state.settings.isInfinite) {
      this.setState(({ images, settings }) => {
        const shift = settings.itemWidth * settings.step;

        let addShift = settings.shift + shift;

        if (settings.shift + shift > 0) {
          addShift = 0;
        }

        return ({
          images,
          settings: {
            ...settings,
            shift: addShift,
          },
        });
      });
    }
  };

  updateSettings
  <T extends keyof Settings>(parameter: T, newValue: Settings[T]) {
    this.setState(({ settings }) => ({
      settings: {
        ...settings,
        [parameter]: newValue,
      },
    }));
  }

  render() {
    const { images } = this.state;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      isAnimation,
      isInfinite,
      shift,
      shiftInner,
    } = this.state.settings;

    return (
      <div className="app">
        <h1>
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          isAnimation={isAnimation}
          shift={shift}
          shiftInner={shiftInner}
        />
        <div className="carousel__buttons">
          <button
            type="button"
            className="carousel__prev-button"
            onClick={this.scrollRight}
            disabled={
              !isInfinite
              && shift >= 0
            }
          >
            {'<'}
          </button>
          <button
            type="button"
            className="carousel__next-button"
            onClick={this.scrollLeft}
            disabled={
              !isInfinite
              && shift < -(images.length - frameSize - 1) * itemWidth
            }
          >
            {'>'}
          </button>
        </div>
        <fieldset className="app__settings">
          <label className="app__setting">
            Step:
            <input
              className="app__step"
              type="number"
              min="1"
              max={images.length}
              defaultValue={step}
              onChange={
                (({ target }) => this
                  .updateSettings('step', Number(target.value)))
              }
            />
          </label>

          <label className="app__setting">
            Frame size:
            <input
              className="app__frame-size"
              type="number"
              min="1"
              max={images.length}
              defaultValue={frameSize}
              onChange={
                (({ target }) => this
                  .updateSettings('frameSize', Number(target.value)))
              }
            />
          </label>

          <label className="app__setting">
            Item width:
            <input
              className="app__item-width"
              type="number"
              min="80"
              max="180"
              step="10"
              defaultValue={itemWidth}
              onChange={
                (({ target }) => this
                  .updateSettings('itemWidth', Number(target.value)))
              }
            />
          </label>

          <label className="app__setting">
            Anitmation duration:
            <input
              className="app__animation-duration"
              type="number"
              min="0"
              max="2000"
              step="500"
              defaultValue={animationDuration}
              onChange={
                (({ target }) => this
                  .updateSettings('animationDuration', Number(target.value)))
              }
            />
          </label>

          <label className="app__setting">
            Infinite:
            <input
              className="app__infinite"
              type="checkbox"
              defaultChecked={isInfinite}
              onChange={
                (({ target }) => this
                  .updateSettings('isInfinite', target.checked))
              }
            />
            {
              isInfinite
                ? 'Yes'
                : 'No'
            }
          </label>
        </fieldset>
      </div>
    );
  }
}

export default App;

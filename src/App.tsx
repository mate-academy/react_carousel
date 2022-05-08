import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type Settings = {
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type SettingsUpdater = {
  frameSize?: number;
  itemWidth?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

type State = {
  images: string[];
  settings: Settings;
};

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
      frameSize: 3,
      itemWidth: 130,
      step: 3,
      animationDuration: 1000,
      infinite: true,
    },
  };

  updateSettings = (newSettings: SettingsUpdater) => {
    this.setState(({ settings }) => (
      {
        settings: {
          ...settings,
          ...newSettings,
        },
      }
    ));
  };

  render() {
    const {
      images,
      settings,
    } = this.state;

    const {
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = settings;

    return (
      <div className="App">
        <ul className="SettingsList App__settings">
          <li className="SettingsList__item">
            <label htmlFor="itemWidth">
              Item width:
            </label>

            <input
              className="SettingsList__value"
              type="number"
              min="100"
              max="200"
              step="10"
              defaultValue={itemWidth}
              id="itemWidth"
              onChange={
                ({ target }) => this.updateSettings(
                  {
                    itemWidth: Number(target.value),
                  },
                )
              }
            />
          </li>

          <li className="SettingsList__item">
            <label htmlFor="frameSize">
              Frame size:
            </label>

            <input
              className="SettingsList__value"
              type="number"
              min="1"
              max={images.length}
              defaultValue={frameSize}
              id="frameSize"
              onChange={
                ({ target }) => this.updateSettings(
                  {
                    frameSize: Number(target.value),
                  },
                )
              }
            />
          </li>

          <li className="SettingsList__item">
            <label htmlFor="step">
              Step:
            </label>

            <input
              className="SettingsList__value"
              type="number"
              min="1"
              max={images.length}
              defaultValue={step}
              id="step"
              onChange={
                ({ target }) => this.updateSettings(
                  {
                    step: Number(target.value),
                  },
                )
              }
            />
          </li>

          <li className="SettingsList__item">
            <label htmlFor="animationDuration">
              Anitmation duration:
            </label>

            <input
              className="SettingsList__value"
              type="number"
              min="500"
              max="2000"
              step="500"
              defaultValue={animationDuration}
              id="animationDuration"
              onChange={
                ({ target }) => this.updateSettings(
                  {
                    animationDuration: Number(target.value),
                  },
                )
              }
            />
          </li>

          <li className="SettingsList__item">
            <label htmlFor="infinite">
              Infinite:
            </label>

            <input
              className="SettingsList__checkbox"
              type="checkbox"
              defaultChecked={infinite}
              id="infinite"
              onChange={
                ({ target }) => this.updateSettings(
                  {
                    infinite: target.checked,
                  },
                )
              }
            />

            <label
              htmlFor="infinite"
              className="SettingsList__value SettingsList__checkboxValue"
            >
              {}
            </label>
          </li>
        </ul>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

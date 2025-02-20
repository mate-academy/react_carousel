/* eslint-disable prettier/prettier */
import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  settings: {
    itemWidth: number;
    frameSize: number;
    step: number;
    animationDuration: number;
    infinite: boolean;
  };
}

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
      itemWidth: 130,
      frameSize: 3,
      step: 3,
      animationDuration: 1000,
      infinite: false,
    },
  };

  handleSettingChange =
    (settingName: keyof State['settings']) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value =
        event.target.type === 'checkbox'
          ? event.target.checked
          : Number(event.target.value);

        this.setState(prevState => ({
          settings: {
            ...prevState.settings,
            [settingName]: value,
          },
        }));
      };

  render() {
    const { images, settings } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="settings">
          <div className="settings__item">
            <label htmlFor="itemId">Item Width:</label>
            <input
              id="itemId"
              type="number"
              value={settings.itemWidth}
              onChange={this.handleSettingChange('itemWidth')}
              min="50"
              max="300"
            />
          </div>

          <div className="settings__item">
            <label htmlFor="frameId">Frame Size:</label>
            <input
              id="frameId"
              type="number"
              value={settings.frameSize}
              onChange={this.handleSettingChange('frameSize')}
              min="1"
              max="10"
            />
          </div>

          <div className="settings__item">
            <label htmlFor="stepId">Step:</label>
            <input
              id="stepId"
              type="number"
              value={settings.step}
              onChange={this.handleSettingChange('step')}
              min="1"
              max="10"
            />
          </div>

          <div className="settings__item">
            <label htmlFor="animDur">Animation Duration (ms):</label>
            <input
              id="animDur"
              type="number"
              value={settings.animationDuration}
              onChange={this.handleSettingChange('animationDuration')}
              min="0"
              max="5000"
              step="100"
            />
          </div>

          <div className="settings__item">
            <label htmlFor="infiniteId">
              <input
                id="infiniteId"
                type="checkbox"
                checked={settings.infinite}
                onChange={this.handleSettingChange('infinite')}
              />
              Infinite Scroll
            </label>
          </div>
        </div>

        <Carousel
          images={images}
          {...settings}
        />
      </div>
    );
  }
}

export default App;

import React from 'react';

import './App.scss';

import { Carousel } from './components/Carousel';
import { SettingsPanel } from './components/SettingsPanel';

import { Settings } from './types/Settings';

const defaultSettings: Settings = {
  step: 1,
  itemWidth: 130,
  animationDuration: 1000,
  frameSize: 3,
  infinite: false,
};

type State = {
  images: string[],
  settings: Settings,
};

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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
      ...defaultSettings,
    },
  };

  saveSettings = (
    property: keyof Settings,
    value: string,
  ) => {
    this.setState(state => ({
      settings: {
        ...state.settings,
        [property]: property === 'infinite'
          ? Boolean(value)
          : Number(value),
      },
    }));
  };

  render() {
    const { images, settings } = this.state;
    const imagesCount = images.length;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${imagesCount} images`}
        </h1>

        <Carousel
          images={images}
          settings={settings}
        />

        <SettingsPanel
          save={this.saveSettings}
          settings={settings}
        />
      </div>
    );
  }
}

export default App;

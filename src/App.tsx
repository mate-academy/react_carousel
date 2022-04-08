import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import CarouselInputs from './components/CarouselInputs/CarouselInputs';
import { Setting } from './type/type';

interface State {
  images: string[],
  setting: Setting,
}

class App extends React.Component<{}, State> {
  state = {
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
    setting: {
      step: 3,
      frameSize: 3,
      itemWidth: 50,
      animationDuration: 1000,
      infinite: false,
    },
  };

  updateValues = (e: React.ChangeEvent<HTMLInputElement>, keyName: keyof Setting): void => {
    const { value, checked } = e.currentTarget;

    this.setState(({ setting }) => {
      const newSetting = { ...setting };

      if (keyName === 'infinite') {
        newSetting[keyName] = checked;
      }

      if (keyName !== 'infinite') {
        newSetting[keyName] = +value;
      }

      return { setting: newSetting };
    });
  };

  render() {
    const { images, setting } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <Carousel
          image={images}
          settings={setting}
        />

        <CarouselInputs
          settings={setting}
          change={(e, key) => {
            this.updateValues(e, key);
          }}
          length={images.length}
        />
      </div>
    );
  }
}

export default App;

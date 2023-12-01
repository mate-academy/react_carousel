import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import SettingsMenu from './components/SettingsMenu/SettingsMenu';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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

    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  setImages = (newImages: string[]) => {
    this.setState({ images: newImages });
  };

  setStep = (newStep: number) => {
    this.setState({ step: newStep });
  };

  setFrameSize = (newFrameSize: number) => {
    this.setState({ frameSize: newFrameSize });
  };

  setItemWidth = (newItemWidth: number) => {
    this.setState({ itemWidth: newItemWidth });
  };

  setAnimationDuration = (newAnimationDuration: number) => {
    this.setState({ animationDuration: newAnimationDuration });
  };

  setInfinite = (newInfinite: boolean) => {
    this.setState({ infinite: newInfinite });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    const {
      setStep,
      setFrameSize,
      setItemWidth,
      setAnimationDuration,
      setInfinite,
    } = this;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1
          className="App__title"
          data-cy="title"
        >
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>

        <div className="App__content">
          <SettingsMenu
            setStep={setStep}
            setFrameSize={setFrameSize}
            setItemWidth={setItemWidth}
            setAnimationDuration={setAnimationDuration}
            setInfinite={setInfinite}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />
        </div>
      </div>
    );
  }
}

export default App;

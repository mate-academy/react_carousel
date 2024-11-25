import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import Form from './components/Form/Form';

interface State {
  images: string[];
  isInfinite: boolean;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
    isInfinite: false,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  handleToggleInfinite = () => {
    this.setState(prevState => ({ isInfinite: !prevState.isInfinite }));
  };

  handleInputChange = (key: keyof State) => (value: number) => {
    this.setState({ [key]: value } as Pick<State, keyof State>);
  };

  render() {
    const {
      images,
      isInfinite,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="title">
          Carousel with {images.length} images
        </h1>

        <Form
          isInfinite={isInfinite}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          onToggleInfinite={this.handleToggleInfinite}
          onInputChange={this.handleInputChange}
        />

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={isInfinite}
        />
      </div>
    );
  }
}

export default App;

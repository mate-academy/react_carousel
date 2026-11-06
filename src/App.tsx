import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

type NumericStateKey = 'itemWidth' | 'frameSize' | 'step' | 'animationDuration';

class App extends React.Component<{}, State> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newValue = Number(value);
    const name = event.target.name as NumericStateKey;

    this.setState({
      [name]: newValue,
    } as Pick<State, NumericStateKey>);
  };

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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;

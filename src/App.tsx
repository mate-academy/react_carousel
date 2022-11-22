import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  // step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  // infinite: boolean;
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

  handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState(state => ({
      ...state,
      [name]: +value,
    }));
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

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title"> Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="App__form">
          <label>
            {'Item Width '}
            <input
              className="App__form__field"
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleValue}
            />
          </label>

          <label>
            {'Frame Size '}
            <input
              className="App__form__field"
              type="number"
              name="frameSize"
              min="1"
              max={images.length - 1}
              value={frameSize}
              onChange={this.handleValue}
            />
          </label>

          <label>
            {'Step '}
            <input
              className="App__form__field"
              type="number"
              name="step"
              min="1"
              max={frameSize}
              value={step}
              onChange={this.handleValue}
            />
          </label>

          <label>
            {'Animation Duration '}
            <input
              className="App__form__field"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleValue}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;

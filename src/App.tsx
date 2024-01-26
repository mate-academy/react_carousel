import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleInputChange = (key: keyof State, value: number | boolean) => {
    this.setState({ [key]: value } as unknown as Pick<State, keyof State>);
  };

  render() {
    const {
      images, itemWidth, frameSize, step, animationDuration, infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          data-cy="title"
          className="App__title"
        >
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>

        <div className="InputForm">
          <label
            className="InputForm__option"
          >
            <p className="InputForm__option--name">
              Item Width:
            </p>
            <input
              className="InputForm__option--frame"
              type="number"
              value={itemWidth}
              onChange={(e) => this.handleInputChange(
                'itemWidth', parseInt(e.target.value, 10),
              )}
            />
          </label>

          <label
            className="InputForm__option"
          >
            <p className="InputForm__option--name">
              Frame Size:
            </p>

            <input
              className="InputForm__option--frame"
              type="number"
              value={frameSize}
              onChange={(e) => this.handleInputChange(
                'frameSize', parseInt(e.target.value, 10),
              )}
            />
          </label>

          <label
            className="InputForm__option"
          >
            <p className="InputForm__option--name">
              Step:
            </p>

            <input
              className="InputForm__option--frame"
              type="number"
              value={step}
              onChange={(e) => this.handleInputChange(
                'step', parseInt(e.target.value, 10),
              )}
            />
          </label>

          <label
            className="InputForm__option"
          >
            <p className="InputForm__option--name">
              Animation Duration (ms):
            </p>

            <input
              className="InputForm__option--frame"
              type="number"
              value={animationDuration}
              onChange={(e) => this.handleInputChange(
                'animationDuration', parseInt(e.target.value, 10),
              )}
            />
          </label>

          <label
            className="InputForm__option"
          >
            <p className="InputForm__option--name">
              Infinite:
            </p>

            <input
              className="InputForm__option--checkbox"
              type="checkbox"
              checked={infinite}
              onChange={(e) => this.handleInputChange(
                'infinite', e.target.checked,
              )}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          frameSize={frameSize}
          step={step}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

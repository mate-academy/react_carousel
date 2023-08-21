import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  smileWidth: number;
  frameSize: number;
  step: number;
  speedOfAnimation: number;
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

    smileWidth: 130,
    frameSize: 3,
    step: 3,
    speedOfAnimation: 1000,
    infinite: false,
  };

  updateState = <K extends keyof State>(key: K, value: number | boolean) => {
    this.setState({ [key]: value } as Pick<State, K>);
  };

  renderInputField = (
    label: string,
    name: string,
    value: number | boolean,
    min?: number,
    max?: number,
  ) => {
    const determineInputType = (choice: string) => {
      return typeof value === 'number' ? choice : 'checkbox';
    };

    return (
      <label htmlFor={name} className="control-panel__label">
        {label}
        <input
          type={determineInputType('number')}
          name={name}
          value={value.toString()}
          min={min}
          max={max}
          onChange={(e) => {
            const parsedValue = typeof value === 'number'
              ? +e.target.value
              : e.target.checked;

            this.updateState(name as keyof State, parsedValue);
          }}
          className={`control-panel__${determineInputType('input')}`}
        />
      </label>
    );
  };

  render() {
    const {
      images,
      smileWidth,
      step,
      frameSize,
      speedOfAnimation,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 className="carousel__title" data-cy="title">
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>

        <Carousel
          images={images}
          smileWidth={smileWidth}
          frameSize={frameSize}
          step={step}
          speedOfAnimation={speedOfAnimation}
          infinite={infinite}
        />

        <div className="control-panel">
          {this.renderInputField(
            'Item width',
            'smileWidth',
            smileWidth,
            130,
          )}

          {this.renderInputField(
            'Frame size',
            'frameSize',
            frameSize,
            1,
            10,
          )}

          {this.renderInputField(
            'Step',
            'step',
            step,
            1,
            10,
          )}

          {this.renderInputField(
            'Speed of an animation',
            'speedOfAnimation',
            speedOfAnimation,
            1,
          )}

          {this.renderInputField(
            'Infinite',
            'infinite',
            infinite,
          )}
        </div>
      </div>
    );
  }
}

export default App;

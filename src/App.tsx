import React from 'react';
import Carousel from './components/Carousel';
import './App.scss';
import 'bulma/css/bulma.min.css';

type State = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    itemWidth: 100,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: true,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    const key = target.id;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.valueAsNumber;

    this.setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App container">
        <h1>{`Carousel with ${images.length} images`}</h1>

        <Carousel
          {...this.state}
        />

        <form action="#" className="field is-grouped">
          <div className="control">
            <label htmlFor="itemWidth" className="label">
              {'Item Width: '}
              <output htmlFor="itemWidth">{itemWidth}</output>
              <input
                className="input is-small is-rounded"
                id="itemWidth"
                type="range"
                min="50"
                max="260"
                step="1"
                value={itemWidth}
                onChange={this.handleInputChange}
              />
            </label>
          </div>

          <div className="control">
            <label htmlFor="frameSize" className="label">
              {'Frame Size: '}
              <output htmlFor="frameSize">{frameSize}</output>
              <input
                className="input is-small is-rounded"
                id="frameSize"
                type="range"
                min="1"
                max="4"
                step="1"
                value={frameSize}
                onChange={this.handleInputChange}
              />
            </label>
          </div>

          <div className="control">
            <label htmlFor="animationDuration" className="label">
              {'Animation Duration: '}
              <output htmlFor="animationDuration">{animationDuration}</output>
              <input
                className="input is-small is-rounded"
                id="animationDuration"
                type="range"
                min="1000"
                max="9000"
                step="500"
                value={animationDuration}
                onChange={this.handleInputChange}
              />
            </label>
          </div>

          <div className="control">
            <label htmlFor="step" className="label">
              {'Step: '}
              <output htmlFor="step" id="sliderMediumTooltip">{step}</output>
              <input
                className="input is-small is-rounded"
                id="step"
                type="range"
                min="1"
                max="4"
                step="1"
                value={step}
                onChange={this.handleInputChange}
              />
            </label>
          </div>

          <div className="control">
            <label htmlFor="infinite" className="label">
              {'infinite: '}
              <input
                type="checkbox"
                className="is-small is-rounded is-block mx-auto"
                id="infinite"
                checked={infinite}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default App;

/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
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
    itemWidth: 130,
    frameSize: 2,
    step: 3,
    animationDuration: 1000,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value,
    } = event.target;

    switch (name) {
      case 'itemWidth':
        this.setState({
          itemWidth: +value,
        });
        break;

      case 'frameSize':
        this.setState({
          frameSize: +value,
        });
        break;

      case 'step':
        this.setState({
          step: +value,
        });
        break;

      case 'animationDuration':
        this.setState({
          animationDuration: +value,
        });
        break;

      default:
        break;
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <form className="App__form">
          <label>
            {'Item Width: '}
            <input
              type="number"
              className="App__form-field"
              name="itemWidth"
              value={itemWidth}
              min="100"
              max="200"
              onChange={this.handleChange}
            />
          </label>

          <label>
            {'Frame Size: '}
            <input
              type="number"
              className="App__form-field"
              name="frameSize"
              value={frameSize}
              min="1"
              max="10"
              onChange={this.handleChange}
            />
          </label>

          <label>
            {'Step: '}
            <input
              type="number"
              className="App__form-field"
              name="step"
              value={step}
              min="1"
              max="5"
              onChange={this.handleChange}
            />
          </label>

          <label>
            {'Animation Duration: '}
            <input
              type="number"
              className="App__form-field"
              name="animationDuration"
              value={animationDuration}
              min="800"
              max="3000"
              step="100"
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;

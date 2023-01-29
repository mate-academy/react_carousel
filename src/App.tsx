import React, { ChangeEvent } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

  handler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    switch (name) {
      case 'step':
        this.setState({
          [name]: +value,
        });
        break;
      case 'frameSize':
        this.setState({
          [name]: +value,
        });
        break;
      case 'itemWidth':
        this.setState({
          [name]: +value,
        });
        break;
      case 'animationDuration':
        this.setState({
          [name]: +value,
        });
        break;
      case 'infinite':
        this.setState(prevState => ({
          [name]: !prevState.infinite,
        }));
        break;
      default:
        break;
    }
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
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form className="Form">
          <label className="Form__label">
            Step
            <input
              type="number"
              name="step"
              className="From__input"
              value={step}
              min="1"
              max="10"
              onChange={this.handler}
            />
          </label>

          <label className="Form__label">
            Frame Size
            <input
              type="number"
              name="frameSize"
              className="Form__input"
              value={frameSize}
              min="1"
              max="10"
              onChange={this.handler}
            />
          </label>

          <label className="Form__label">
            Item Width
            <input
              type="number"
              name="itemWidth"
              className="From__input"
              value={itemWidth}
              min="0"
              onChange={this.handler}
            />
          </label>

          <label className="Form__label">
            Animation Duration
            <input
              type="number"
              name="animationDuration"
              className="From__input"
              value={animationDuration}
              min="0"
              onChange={this.handler}
            />
          </label>

          <label className="Form__label">
            Infinite
            <input
              type="checkbox"
              name="infinite"
              className="From__input"
              onChange={this.handler}
            />
          </label>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Bubble } from './components/Bubble';

type State = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, min, max, checked,
    } = event.target;

    if ((+value >= +min && +value <= +max) || (name === 'infinite')) {
      switch (name) {
        case 'itemWidth':
          this.setState({ itemWidth: +value });
          break;

        case 'frameSize':
          this.setState({ frameSize: +value });
          break;

        case 'step':
          this.setState({ step: +value });
          break;

        case 'animationDuration':
          this.setState({ animationDuration: +value });
          break;

        case 'infinite':
          this.setState({ infinite: checked });
          break;

        default:
          return 0;
      }
    }

    return this.state;
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
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="Carousel__setting">
          <label htmlFor="step">
            Step:
            <input
              min={1}
              max={3}
              defaultValue={step}
              name="step"
              type="number"
              onInput={this.handleChange}
            />
          </label>
          <label htmlFor="frameSize">
            Frame size:
            <input
              min={1}
              max={10}
              name="frameSize"
              type="number"
              defaultValue={frameSize}
              onInput={this.handleChange}
            />
          </label>
          <label htmlFor="itemWidth">
            Item width:
            <input
              min={30}
              max={300}
              step={10}
              defaultValue={130}
              name="itemWidth"
              type="number"
              onInput={this.handleChange}
            />
          </label>
          <label htmlFor="animationDuration">
            Animation Duration:
            <input
              min={500}
              max={2000}
              defaultValue={animationDuration}
              name="animationDuration"
              type="number"
              onInput={this.handleChange}
            />

          </label>
          <label htmlFor="infinite">
            infinite:
            <input
              name="infinite"
              type="checkbox"
              className="Carousel__checkbox"
              checked={infinite}
              onChange={this.handleChange}
            />
          </label>
        </form>

        <Bubble />
      </div>
    );
  }
}

export default App;

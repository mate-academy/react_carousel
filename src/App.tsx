import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  imgWidth: number,
  animationDur: number,
  infinite: boolean,
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
    imgWidth: 130,
    animationDur: 1000,
    infinite: false,

  };

  inputHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case 'itemWidth': {
        if (+event.currentTarget.value > 0) {
          this.setState({ imgWidth: +event.currentTarget.value });
        }

        this.setState({ imgWidth: 130 });

        return;
      }

      case 'frameSize': {
        if (+event.currentTarget.value
          && +event.currentTarget.value <= this.state.images.length) {
          this.setState({ frameSize: +event.currentTarget.value });
        }

        this.setState({ frameSize: 3 });

        return;
      }

      case 'step': {
        if (+event.currentTarget.value > 0) {
          this.setState({ step: +event.currentTarget.value });
        }

        this.setState({ step: 3 });

        return;
      }

      case 'animationDuration': {
        if (+event.currentTarget.value > 500) {
          this.setState({ animationDur: +event.currentTarget.value });
        }

        this.setState({ animationDur: 1000 });

        break;
      }

      default:
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      imgWidth,
      animationDur,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={imgWidth}
          animationDuration={animationDur}
          infinite={infinite}
        />
        <div className="inputs-container">
          <label htmlFor="itemWidth">
            Image size:
            <input
              type="number"
              name="itemWidth"
              id="itemWidth"
              min={50}
              placeholder="130"
              onBlur={this.inputHandler}
            />
          </label>
          <label htmlFor="frameSize">
            Frame size:
            <input
              type="number"
              name="frameSize"
              id="frameSize"
              min={1}
              placeholder="3"
              onBlur={this.inputHandler}
            />
          </label>
          <label htmlFor="step">
            Step:
            <input
              type="number"
              name="step"
              id="step"
              min={1}
              placeholder="3"
              onBlur={this.inputHandler}
            />
          </label>
          <label htmlFor="animationDuration">
            Animation duration:
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              placeholder="1000"
              onBlur={this.inputHandler}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  emojiWidth: number;
  frameSize: number;
  step: number;
  animationDur: number;
  infinite: boolean;
}

enum Inputs {
  emojiWidth = 'emojiWidth',
  frameSize = 'frameSize',
  step = 'step',
  animationDur = 'animationDur',
  infinite = 'infinite',
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
    emojiWidth: 130,
    frameSize: 3,
    step: 3,
    animationDur: 1000,
    infinite: false,
  };

  minDuration = 300;

  onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.name === Inputs.emojiWidth) {
      if (+event.target.value > 0) {
        this.setState({
          emojiWidth: +event.target.value,
        });

        return;
      }

      this.setState({
        emojiWidth: 130,
      });
    }

    if (event.target.name === Inputs.frameSize) {
      if (+event.target.value > 0
        && +event.target.value <= this.state.images.length) {
        this.setState({
          frameSize: +event.target.value,
        });

        return;
      }

      this.setState({
        frameSize: 3,
      });
    }

    if (event.target.name === Inputs.step) {
      if (+event.target.value > 0) {
        this.setState({
          step: +event.target.value,
        });

        return;
      }

      this.setState({
        step: 3,
      });
    }

    if (event.target.name === Inputs.animationDur) {
      if (+event.target.value > this.minDuration) {
        this.setState({
          animationDur: +event.target.value,
        });

        return;
      }

      this.setState({
        animationDur: this.minDuration,
      });
    }

    if (event.target.name === Inputs.infinite) {
      if (event.target.checked) {
        this.setState({
          infinite: true,
        });

        return;
      }

      this.setState({
        infinite: false,
      });
    }
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title'>Carousel with {images.length} images</h1>

        <Carousel
          images={this.state.images}
          emojiWidth={this.state.emojiWidth}
          frameSize={this.state.frameSize}
          step={this.state.step}
          animationDur={this.state.animationDur}
          infinite={this.state.infinite}
        />

        <div className="inputs">
          <div className="inputsWrapper">
            <div className="inputWrap">
              <label htmlFor="emojiWidth">Emoji width: </label>

              <input
                type="number"
                placeholder="130"
                name="emojiWidth"
                min={50}
                max={300}
                onBlur={this.onBlur}
                id="emojiWidth"
              />
            </div>
            <div className="inputWrap">
              <label htmlFor="frameSize">Frame size: </label>

              <input
                type="number"
                placeholder="3"
                name="frameSize"
                min={1}
                onBlur={this.onBlur}
                id="frameSize"
              />
            </div>
            <div className="inputWrap">
              <label htmlFor="step">Step: </label>

              <input
                type="number"
                placeholder="3"
                name="step"
                min={1}
                onBlur={this.onBlur}
                id="step"
              />
            </div>
            <div className="inputWrap">
              <label htmlFor="animationDur">Animation duration: </label>

              <input
                type="number"
                placeholder="1000"
                name="animationDur"
                onBlur={this.onBlur}
                id="animationDur"
              />
            </div>
            <div className="inputWrap">
              <input
                type="checkbox"
                name="infinite"
                id="infinite"
                onBlur={this.onBlur}
              />

              <label htmlFor="infinite">Infinite</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

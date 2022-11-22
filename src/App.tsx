import React from 'react';
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
  state: Readonly<State> = {
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
        <div className="App__wrapper">
          <h1 className="App__title" data-cy="title">
            {`Carousel with ${images.length} images`}
          </h1>
          <form className="App__form">
            <label className="App__form-field">
              Frame size:
              <input
                type="range"
                min={1}
                max={5}
                value={frameSize}
                onChange={(event) => {
                  const input = event.currentTarget;

                  this.setState({ frameSize: +input.value });
                  if (input.nextElementSibling) {
                    input.nextElementSibling.textContent = `${input.value} ea.`;
                  }

                  this.render();
                }}
              />
              <span>{`${frameSize} ea.`}</span>
            </label>
            <label className="App__form-field">
              Item width:
              <input
                type="range"
                min={100}
                max={250}
                value={itemWidth}
                onChange={(event) => {
                  const input = event.currentTarget;

                  this.setState({ itemWidth: +input.value });
                  if (input.nextElementSibling) {
                    input.nextElementSibling.textContent = `${input.value} px`;
                  }
                }}
              />
              <span>{`${itemWidth} px`}</span>
            </label>
            <label className="App__form-field">
              Animation duration:
              <input
                type="range"
                min={300}
                max={2000}
                value={animationDuration}
                onChange={(event) => {
                  const input = event.currentTarget;

                  this.setState({ animationDuration: +input.value });
                  if (input.nextElementSibling) {
                    input.nextElementSibling.textContent = `${input.value} ms`;
                  }
                }}
              />
              <span>{`${animationDuration} ms`}</span>
            </label>
            <label className="App__form-field">
              Slide step:
              <input
                type="range"
                min={1}
                max={5}
                value={step}
                onChange={(event) => {
                  const input = event.currentTarget;

                  this.setState({ step: +input.value });
                  if (input.nextElementSibling) {
                    input.nextElementSibling.textContent = `${input.value} ea.`;
                  }
                }}
              />
              <span>{`${step} ea.`}</span>
            </label>
            <label className="App__form-field">
              Make it infinite:
              <input
                type="checkbox"
                checked={this.state.infinite}
                onChange={(event) => {
                  this.setState({ infinite: event.currentTarget.checked });
                }}
              />
            </label>
          </form>
        </div>
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

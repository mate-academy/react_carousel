import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  translateX: number;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
    translateX: 0,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  setTranslateX = (value: number) => this.setState({ translateX: value });

  setWidth = (width: number) => {
    this.setState({ itemWidth: width });
  };

  setFrameSize = (size: number) => {
    this.setState({ frameSize: size });
  };

  setStep = (num: number) => {
    this.setState({ step: num });
  };

  setAnimationDuration = (duration: number) => {
    this.setState({ animationDuration: duration });
  };

  render() {
    const {
      images,
      translateX,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App p-6 grid">
        {/* eslint-disable-next-line */}
        <h1 className="title is-3 cell cell is-col-span-2" data-cy="title">
          Carousel with {images.length} images
        </h1>
        <div
          className="
          input__container
          is-flex is-flex-direction-column
          cell is-col-start-1 is-row-start-2"
        >
          <div className="block">
            <label htmlFor="itemId">Width:</label>
            <input
              className="input mt-2"
              type="number"
              id="itemId"
              name="width"
              min={130}
              placeholder="min 130 (px)"
              onChange={event => {
                if (+event.target.value < 130) {
                  return;
                }

                this.setTranslateX(0);
                this.setWidth(+event.target.value);
              }}
            />
          </div>
          <div className="block">
            <label htmlFor="frameId">Number of pictures to display:</label>
            <input
              className="input mt-2"
              type="number"
              id="frameId"
              name="frameNumber"
              min={1}
              placeholder="3"
              onChange={event => {
                if (+event.target.value < 1 || +event.target.value > 10) {
                  return;
                }

                this.setTranslateX(0);
                this.setFrameSize(+event.target.value);
              }}
            />
          </div>
          <div className="block">
            <label htmlFor="stepId">Step:</label>
            <input
              className="input mt-2"
              type="number"
              id="stepId"
              name="step"
              min={1}
              placeholder="3"
              onChange={event => {
                if (+event.target.value < 1 || +event.target.value > 9) {
                  return;
                }

                this.setTranslateX(0);
                this.setStep(+event.target.value);
              }}
            />
          </div>
          <div className="block">
            <label htmlFor="animationId">Animation Duration:</label>
            <input
              className="input mt-2"
              type="number"
              id="animationId"
              min={1}
              name="animationDuration"
              placeholder="1000 (ms)"
              onChange={event => {
                if (+event.target.value < 1) {
                  return;
                }

                this.setAnimationDuration(+event.target.value);
              }}
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          translateX={translateX}
          setTranslateX={this.setTranslateX}
        />
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  animationDuration: number,
  imageSize: number,
  frameSize: number,
  step: number,
  infinite: boolean,
}

export class App extends React.Component<{}, State> {
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
    animationDuration: 1000,
    imageSize: 130,
    frameSize: 3,
    step: 3,
    infinite: false,
  };

  render() {
    const {
      images,
      imageSize,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
          data-cy="title"
        >
          Carousel with
          {' '}
          {images.length}
          {' '}
          images
        </h1>
        <form action="#" className="App__form">
          <fieldset className="App__form-fieldset">
            <legend className="App__form-description">
              Customize carousel
            </legend>

            <div className="App__form-item">
              <div className="App__form-item-name">
                <label
                  htmlFor="itemId"
                  className="App__form-item-label"
                >
                  Items width
                </label>
              </div>

              <div className="App__form-item-value">
                <input
                  type="number"
                  id="itemId"
                  defaultValue={imageSize}
                  min={50}
                  max={500}
                  step={10}
                  className="App__form-item-input"
                  onChange={(ev) => {
                    const { value } = ev.currentTarget;

                    this.setState({ imageSize: +value });
                  }}
                />
              </div>
            </div>

            <div className="App__form-item">
              <div className="App__form-item-name">
                <label
                  htmlFor="frameId"
                  className="App__form-item-label"
                >
                  Frame size
                </label>
              </div>

              <div className="App__form-item-value">
                <input
                  type="number"
                  id="frameId"
                  defaultValue={frameSize}
                  min={1}
                  max={images.length}
                  step={1}
                  className="App__form-item-input"
                  onChange={(ev) => {
                    const { value } = ev.currentTarget;

                    this.setState({ frameSize: +value });
                  }}
                />
              </div>
            </div>

            <div className="App__form-item">
              <div className="App__form-item-name">
                <label
                  htmlFor="stepId"
                  className="App__form-item-label"
                >
                  Step
                </label>
              </div>

              <div className="App__form-item-value">
                <input
                  type="number"
                  id="stepId"
                  defaultValue={step}
                  min={1}
                  max={images.length}
                  step={1}
                  className="App__form-item-input"
                  onChange={(ev) => {
                    const { value } = ev.currentTarget;

                    this.setState({ step: +value });
                  }}
                />
              </div>
            </div>

            <div className="App__form-item">
              <div className="App__form-item-name">
                <label
                  htmlFor="duration"
                  className="App__form-item-label"
                >
                  Duration
                </label>
              </div>

              <div className="App__form-item-value">
                <input
                  type="number"
                  id="duration"
                  min={300}
                  max={5000}
                  step={100}
                  defaultValue={animationDuration}
                  className="App__form-item-input"
                  onChange={(ev) => {
                    const { value } = ev.currentTarget;

                    this.setState({ animationDuration: +value });
                  }}
                />
              </div>
            </div>

            <div className="App__form-item">
              <div className="App__form-item-name">
                <label
                  htmlFor="infinite"
                  className="App__form-item-label"
                >
                  Infinite
                </label>
              </div>

              <div className="App__form-item-value">
                <input
                  type="checkbox"
                  id="infinite"
                  className="App__form-item-checkbox"
                  onChange={(ev) => {
                    const { checked } = ev.currentTarget;

                    this.setState({ infinite: checked });
                  }}
                />
              </div>
            </div>
          </fieldset>
        </form>

        <Carousel
          images={images}
          imageSize={imageSize}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

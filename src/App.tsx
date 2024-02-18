import React from "react";
import "./App.scss";
import Carousel from "./components/Carousel";
import { State } from "./types/State";

class App extends React.Component<{}, State> {
  state = {
    images: [
      "./img/1.png",
      "./img/2.png",
      "./img/3.png",
      "./img/4.png",
      "./img/5.png",
      "./img/6.png",
      "./img/7.png",
      "./img/8.png",
      "./img/9.png",
      "./img/10.png",
    ],
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleStepChange = (el: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ step: +el.target.value });

  handleframesizeChange = (el: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ frameSize: +el.target.value });

  handleItemWidthChange = (el: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ itemWidth: +el.target.value });

  handleAnimationDurationChange = (el: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ animationDuration: +el.target.value });

  handleInfiniteChange = (el: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ infinite: el.target.checked });

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite }
    = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">
          Carousel with {images.length} images
        </h1>
        <div className="App__inputContainer">
          <div className="App__inputContainer__item">
            <label htmlFor="stepID" className="App__inputContainer__label">
              STEP
            </label>
            <input
              className="App__inputContainer__input"
              defaultValue={step}
              id="stepID"
              type="number"
              min={1}
              max={10}
              step={1}
              onChange={this.handleStepChange}
            />
          </div>

          <div className="App__inputContainer__item">
            <label htmlFor="framesizeID" className="App__inputContainer__label">
              FRAMESIZE
            </label>
            <input
              defaultValue={frameSize}
              className="App__inputContainer__input"
              id="framesizeID"
              type="number"
              min={1}
              max={10}
              step={1}
              onChange={this.handleframesizeChange}
            />
          </div>

          <div className="App__inputContainer__item">
            <label htmlFor="itemWidthID" className="App__inputContainer__label">
              ITEMWIDTH
            </label>
            <input
              defaultValue={itemWidth}
              className="App__inputContainer__input"
              id="itemWidthID"
              type="number"
              min={50}
              step={10}
              onChange={this.handleItemWidthChange}
            />
          </div>

          <div className="App__inputContainer__item">
            <label
              htmlFor="animationDurationID"
              className="App__inputContainer__label"
            >
              ANIMATIONDURATION
            </label>
            <input
              defaultValue={animationDuration}
              className="App__inputContainer__input"
              id="animationDurationID"
              type="number"
              min={100}
              max={3000}
              step={100}
              onChange={this.handleAnimationDurationChange}
            />
          </div>

          <div className="App__inputContainer__item">
            <label htmlFor="infiniteID" className="App__inputContainer__label">
              INFINITE
            </label>
            <input
              id="infiniteID"
              className="App__inputContainer__input"
              type="checkbox"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </div>
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

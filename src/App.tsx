import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;
    const changeWidth = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ itemWidth: +e.target.value });
    const changeFrameSize = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ frameSize: +e.target.value });
    const changeStep = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ step: +e.target.value });
    const changeAnimationDuration = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ animationDuration: +e.target.value });
    const toggleInfinite = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ infinite: e.target.checked });

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="PropsForm">
          <label className="PropsForm__label" htmlFor="imgWidth">
            Image Width:&nbsp;
            <input
              className="PropsForm__input"
              type="number"
              id="imgWidth"
              step={10}
              min={10}
              max={260}
              value={itemWidth}
              onChange={changeWidth}
            ></input>
            <br />
          </label>
          <label className="PropsForm__label" htmlFor="frameSize">
            Frame Size:&nbsp;
            <input
              className="PropsForm__input"
              type="number"
              id="frameSize"
              step={1}
              min={1}
              max={images.length}
              value={frameSize}
              onChange={changeFrameSize}
            ></input>
            <br />
          </label>
          <label className="PropsForm__label" htmlFor="step">
            Step:&nbsp;
            <input
              className="PropsForm__input"
              type="number"
              id="step"
              min={1}
              max={10}
              value={step}
              onChange={changeStep}
            ></input>
            <br />
          </label>
          <label className="PropsForm__label" htmlFor="animationDuration">
            Animation Duration:&nbsp;
            <input
              className="PropsForm__input"
              type="number"
              id="animationDuration"
              step={50}
              min={0}
              max={2500}
              value={animationDuration}
              onChange={changeAnimationDuration}
            ></input>
            <br />
          </label>
          <label className="PropsForm__label" htmlFor="infinite">
            Infinite:&nbsp;
            <input
              type="checkbox"
              id="infinite"
              checked={infinite}
              onChange={toggleInfinite}
            />
            <br />
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

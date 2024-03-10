import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './state';

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
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images } = this.state;
    const { itemWidth } = this.state;
    const { frameSize } = this.state;
    const { step } = this.state;
    const { animationDuration } = this.state;
    const { infinite } = this.state;

    const changeStep = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ step: +e.target.value });

    const changeframeSize = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ frameSize: +e.target.value });

    const changeItemWidth = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ itemWidth: +e.target.value });

    const changeDuration = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ animationDuration: +e.target.value });

    const switchInfinite = (e: ChangeEvent<HTMLInputElement>) =>
      this.setState({ infinite: e.target.checked });

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" >Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="App__form">
          <label htmlFor="stepId" className="App__label">
            Step:
            <input
              type="number"
              id="stepId"
              className="App__input"
              value={step}
              min={0}
              max={images.length}
              onChange={changeStep}
            />
          </label>

          <label htmlFor="frameId" className="App__label">
            Carousel capacity:
            <input
              type="number"
              id="frameId"
              className="App__input"
              min={1}
              value={frameSize}
              max={images.length}
              onChange={changeframeSize}
            />
          </label>

          <label htmlFor="itemId" className="App__label">
            Item width:
            <input
              type="number"
              className="App__input"
              id="itemId"
              value={itemWidth}
              step={5}
              min={30}
              max={200}
              onChange={changeItemWidth}
            />
          </label>

          <label htmlFor="animationDurationId" className="App__label">
            Animation duration:
            <input
              type="number"
              className="App__input"
              id="animationDurationId"
              value={animationDuration}
              step={100}
              onChange={changeDuration}
            />
          </label>

          <label htmlFor="infiniteId" className="App__label">
            Infinite carousel:
            <input
              className="App__input"
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={switchInfinite}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;

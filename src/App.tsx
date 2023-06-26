import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="field">
          <label
            htmlFor="step"
            className="field__label"
          >
            <span className="field__name">Step:</span>
            <input
              id="step"
              type="text"
              className="field__input"
              value={step}
              min={1}
              max={images.length}
              onChange={(e) => {
                this.setState({
                  step: +e.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="frame-size"
            className="field__label"
          >
            <span className="field__name">Frame size: </span>
            <input
              id="frame-size"
              type="number"
              className="field__input"
              value={frameSize}
              min={1}
              max={images.length}
              onChange={(e) => {
                this.setState({
                  frameSize: +e.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="item-width"
            className="field__label"
          >
            <span className="field__name">Item Width:</span>
            <input
              id="item-width"
              type="number"
              className="field__input"
              value={itemWidth}
              min={130}
              max={390}
              onChange={(e) => {
                this.setState({
                  itemWidth: +e.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="animation"
            className="field__label"
          >
            <span className="field__name">Animation:</span>
            <input
              id="animation"
              type="number"
              className="field__input"
              value={animationDuration}
              min={500}
              max={5000}
              onChange={(e) => {
                this.setState({
                  animationDuration: +e.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="infinite"
            className="field__label"
          >
            <span className="field__name">Infinite:</span>
            <input
              id="infinite"
              type="checkbox"
              className="field__input"
              onChange={(e) => {
                this.setState({
                  infinite: e.target.checked,
                });
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;

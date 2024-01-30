import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    const handleWithChange = (el: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ itemWidth: Number(el.target.value) });
    };

    const handleFrameSizeChange = (el: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ frameSize: Number(el.target.value) });
    };

    const handleStepChange = (el: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ step: Number(el.target.value) });
    };

    const handleAnimationChange = (el: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ animationDuration: Number(el.target.value) });
    };

    const handleCheckInfinite = (el: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ infinite: (el.target.checked) });
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="container">
          <div className="App__carousel__controler">
            <label
              className="App__carousel__controler__label"
              htmlFor="itemId"
            >
              Item width:
            </label>
            <input
              className="App__carousel__controler__input"
              type="number"
              id="itemId"
              min={0}
              step={10}
              value={itemWidth}
              onChange={handleWithChange}
            />
          </div>

          <div className="App__carousel__controler">
            <label
              className="App__carousel__controler__label"
              htmlFor="frameId"
            >
              Frame size:
            </label>
            <input
              className="App__carousel__controler__input"
              type="number"
              id="frameId"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={handleFrameSizeChange}
            />
          </div>

          <div className="App__carousel__controler">
            <label
              className="App__carousel__controler__label"
              htmlFor="stepId"
            >
              Step:
            </label>
            <input
              className="App__carousel__controler__input"
              type="number"
              id="stepId"
              min={1}
              value={step}
              onChange={handleStepChange}
            />
          </div>

          <div className="App__carousel__controler">
            <label
              className="App__carousel__controler__label"
              htmlFor="animationId"
            >
              Animation duration:
            </label>
            <input
              className="App__carousel__controler__input"
              type="number"
              id="animationId"
              min={100}
              step={100}
              value={animationDuration}
              onChange={handleAnimationChange}
            />
          </div>

          <div className="App__carousel__controler">
            <label
              className="App__carousel__controler__label"
              htmlFor="infiniteId"
            >
              Infinite:
            </label>
            <input
              className="App__carousel__controler__input"
              type="checkbox"
              id="infiniteId"
              checked={infinite}
              onChange={handleCheckInfinite}
            />
          </div>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

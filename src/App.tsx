import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ itemWidth: Number(e.target.value) });
    };

    const handleFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ frameSize: Number(e.target.value) });
    };

    const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ step: Number(e.target.value) });
    };

    const handleAnimationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ animationDuration: Number(e.target.value) });
    };

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ infinite: (e.target.checked) });
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="container">
          <div className="App__carousel__controler">
            <label htmlFor="itemId">Item width:</label>
            <input
              className="App__carousel__controler__input"
              type="number"
              id="itemId"
              min={0}
              step={15}
              value={itemWidth}
              onChange={handleWidthChange}
            />
          </div>

          <div className="App__carousel__controler">
            <label htmlFor="frameId">Frame size:</label>
            <input
              className="App__carousel__controler__input"
              type="number"
              id="frameId"
              min={1}
              max={10}
              value={frameSize}
              onChange={handleFrameSize}
            />
          </div>

          <div className="App__carousel__controler">
            <label htmlFor="stepId">Step:</label>
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
            <label htmlFor="animation">Animation duration:</label>
            <input
              className="App__carousel__controler__input"
              type="number"
              id="animation"
              min={1}
              value={animationDuration}
              onChange={handleAnimationChange}
            />
          </div>

          <div className="App__carousel__controler">
            <label htmlFor="infinite">Infinite</label>
            <input
              className="App__carousel__controler__input"
              type="checkbox"
              id="infinite"
              checked={infinite}
              onChange={handleCheckChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

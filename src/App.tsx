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
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;
    const handleStateChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldName: string,
    ) => {
      this.setState(prevState => ({
        ...prevState,
        [fieldName]: +e.target.value,
      }));
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="Carousel__parametres">
          <label className="Carousel__label" htmlFor="itemId">
            Item Width
            <input
              type="number"
              name="itemWidth"
              id="itemId"
              defaultValue={itemWidth}
              min={130}
              max={420}
              step={10}
              onChange={e => {
                handleStateChange(e, 'itemWidth');
              }}
            />
          </label>

          <label className="Carousel__label" htmlFor="frameId">
            Size of a Frame
            <input
              type="number"
              name="frameSize"
              id="frameId"
              defaultValue={frameSize}
              min={1}
              max={Math.min(
                images.length,
                Math.floor((window.innerWidth - 40) / itemWidth),
              )}
              step={1}
              onChange={e => {
                handleStateChange(e, 'frameSize');
              }}
            />
          </label>

          <label className="Carousel__label" htmlFor="stepId">
            Step of Scroll
            <input
              type="number"
              name="step"
              id="stepId"
              defaultValue={step}
              min={1}
              max={images.length}
              step={1}
              onChange={e => {
                handleStateChange(e, 'step');
              }}
            />
          </label>

          <label className="Carousel__label" htmlFor="animationDuration">
            Animation Duration
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              defaultValue={animationDuration}
              min={100}
              max={9000}
              step={100}
              onChange={e => {
                handleStateChange(e, 'animationDuration');
              }}
            />
          </label>

          <label className="Carousel__label" htmlFor="infinite">
            Infinite Scrolling
            <input
              type="checkbox"
              name="infinite"
              id="infinite"
              checked={infinite}
              onClick={() => {
                this.setState(prevState => ({
                  ...prevState,
                  infinite: !infinite,
                }));
              }}
            />
          </label>
          <div>{infinite}</div>
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

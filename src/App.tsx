import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

  changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      ...state,
      [e.target.name]: +e.target.value,
    }));
  };

  infiniteHandler = () => {
    this.setState(state => ({
      infinite: !state.infinite,
    }));
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
        <h1
          data-cy="title"
          className="App__title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form action="" method="get" className="Form">
          <div className="Form__inputs">
            <label htmlFor="widthId">
              Item width:
            </label>
            <input
              id="widthId"
              type="number"
              className="Form__input"
              name="itemWidth"
              value={itemWidth}
              min="0"
              onChange={this.changeValueHandler}
            />
          </div>

          <div className="Form__inputs">
            <label htmlFor="frameId">
              Frame size:
            </label>
            <input
              id="frameId"
              type="number"
              className="Form__input"
              name="frameSize"
              value={frameSize}
              min="1"
              max={images.length}
              onChange={this.changeValueHandler}
            />
          </div>

          <div className="Form__inputs">
            <label htmlFor="stepId">
              Step:
            </label>
            <input
              id="stepId"
              type="number"
              className="Form__input"
              name="step"
              value={step}
              min="1"
              max={images.length - frameSize}
              onChange={this.changeValueHandler}
            />
          </div>

          <div className="Form__inputs">
            <label htmlFor="animationId">
              Animation duration:
            </label>
            <input
              id="animationId"
              type="number"
              className="Form__input"
              name="animationDuration"
              value={animationDuration}
              onChange={this.changeValueHandler}
            />
          </div>

          <div className="Form__inputs">
            <label htmlFor="infiniteId">
              Infinite
            </label>
            <input
              id="infiniteId"
              type="checkbox"
              className="Form__input"
              name="infinite"
              checked={infinite}
              onChange={this.infiniteHandler}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;

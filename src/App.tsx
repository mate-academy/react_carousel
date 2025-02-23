import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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
    infinity: false,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinity } =
      this.state;

    const changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        itemWidth: +event.target.value,
      });
    };

    const changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        frameSize: +event.target.value,
      });
    };

    const changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        step: +event.target.value,
      });
    };

    const changeAnimationDuration = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      this.setState({
        animationDuration: +event.target.value,
      });
    };

    const changeInfinity = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        infinity: event.target.checked,
      });
    };

    return (
      <div className="App">
        <h1 className="App__title" data-cy="title">
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinity={infinity}
        />

        <form className="App__form form" action="GET">
          <label htmlFor="itemId" className="form__description">
            Item width
          </label>
          <input
            id="itemId"
            className="form__input"
            value={itemWidth}
            min={0}
            step={10}
            type="number"
            onChange={changeItemWidth}
          />

          <label htmlFor="frameId" className="form__description">
            Frame size
          </label>
          <input
            id="frameId"
            className="form__input"
            value={frameSize}
            min={1}
            max={images.length}
            type="number"
            onChange={changeFrameSize}
          />

          <label htmlFor="stepId" className="form__description">
            Step
          </label>
          <input
            id="stepId"
            className="form__input"
            value={step}
            min={1}
            type="number"
            onChange={changeStep}
          />

          <label htmlFor="durationId" className="form__description">
            Animation Duration
          </label>
          <input
            id="durationId"
            className="form__input"
            value={animationDuration}
            step={100}
            min={0}
            type="number"
            onChange={changeAnimationDuration}
          />

          <label htmlFor="infinityId" className="form__description">
            Infinity
          </label>
          <input
            id="infinityId"
            className="form__input form__input--check"
            type="checkbox"
            checked={infinity}
            onChange={changeInfinity}
          />
        </form>
      </div>
    );
  }
}

export default App;

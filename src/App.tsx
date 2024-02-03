import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
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
    const { images } = this.state;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    const changeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);

      this.setState((prevState) => ({
        ...prevState,
        itemWidth: newValue,
      }));
    };

    const changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);

      this.setState((prevState) => ({
        ...prevState,
        frameSize: newValue,
      }));
    };

    const changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);

      this.setState((prevState) => ({
        ...prevState,
        step: newValue,
      }));
    };

    const changeAnimationDuration
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);

      this.setState((prevState) => ({
        ...prevState,
        animationDuration: newValue,
      }));
    };

    const changeInfinite
      = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.checked);

        this.setState((prevState) => ({
          ...prevState,
          infinite: newValue,
        }));
      };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
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
        <div className="App__labels">
          <label className="App__input">
            <b className="App__margin">Item Width:</b>
            <input
              type="number"
              value={itemWidth}
              onChange={changeWidth}
            />
          </label>

          <label className="App__input">
            <b className="App__margin">Frame Size:</b>
            <input
              type="number"
              value={frameSize}
              onChange={changeFrameSize}
            />
          </label>

          <label className="App__input">
            <b className="App__margin">Step</b>
            <input
              type="number"
              value={step}
              onChange={changeStep}
            />
          </label>

          <label className="App__input">
            <b className="App__margin">Animation Duration:</b>
            <input
              type="number"
              value={animationDuration}
              onChange={changeAnimationDuration}
            />
          </label>

          <label className="App__checkbox">
            <b className="App__margin"> Infinite:</b>
            <input
              type="checkbox"
              checked={infinite}
              defaultChecked
              onChange={changeInfinite}
            />
          </label>

        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={1000}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

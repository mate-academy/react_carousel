import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  stepSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.currentTarget.value });
  };

  frameSizeSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.currentTarget.value });
  };

  itemWidthSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.currentTarget.value });
  };

  animationDurationSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.currentTarget.value });
  };

  infiniteSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.currentTarget.checked });
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
        <h1 data-cy="title">
          {'Carousel with '}
          {images.length}
          {' images'}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="form" action="#">
          <label className="label" htmlFor="stepName">Step:</label>
          <input
            type="number"
            id="step_id"
            className="step__input"
            defaultValue={step}
            onChange={this.stepSet}
            min="1"
            max={images.length}
          />

          <label className="label" htmlFor="frameSizeName">FrameSize:</label>
          <input
            type="number"
            id="size_id"
            className="size__input"
            defaultValue={frameSize}
            onChange={this.frameSizeSet}
            min="1"
            max={images.length}
          />

          <label className="label" htmlFor="itemWidthName">Width:</label>
          <input
            type="number"
            id="width_id"
            className="width__input"
            defaultValue={itemWidth}
            onChange={this.itemWidthSet}
            min="130"
          />

          <label className="label" htmlFor="animationName">Animation:</label>
          <input
            type="number"
            id="animation_id"
            className="animation__input"
            defaultValue={animationDuration}
            onChange={this.animationDurationSet}
            min="1000"
          />

          <input
            type="checkbox"
            id="infinite_id"
            className="infinite__input"
            onChange={this.infiniteSet}
          />
        </form>
      </div>
    );
  }
}

export default App;

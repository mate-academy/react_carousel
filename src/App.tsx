import React from 'react';
import './App.scss';
import './Reset.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
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
  };

  handleChangeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({
      itemWidth: +event.currentTarget.value,
    })
  );

  handleChangeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({
      frameSize: +event.currentTarget.value,
    })
  );

  handleChangeStepValue = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({
      step: +event.currentTarget.value,
    })
  );

  handleChangeAnimDuration = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({
      animationDuration: +event.currentTarget.value,
    })
  );

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form action="#" className="App__parameters">
          <label htmlFor="itemId">
            {'ItemWidth: '}
            <input
              id="itemId"
              type="number"
              name="itemWidth"
              className="App__input"
              min="1"
              defaultValue={itemWidth}
              onChange={this.handleChangeItemWidth}
            />
          </label>

          <label htmlFor="frameId">
            {'FrameSize: '}
            <input
              id="frameId"
              type="number"
              name="frameSize"
              className="App__input"
              min="1"
              max="10"
              defaultValue={frameSize}
              onChange={this.handleChangeFrameSize}
            />
          </label>

          <label htmlFor="stepId">
            {'Step: '}
            <input
              id="stepId"
              type="number"
              name="step"
              className="App__input"
              min="1"
              max="10"
              defaultValue={step}
              onChange={this.handleChangeStepValue}
            />
          </label>

          <label>
            {'AnimationDuration: '}
            <input
              type="number"
              name="animationDuration"
              className="App__input"
              min="1"
              max="10000"
              defaultValue={animationDuration}
              onChange={this.handleChangeAnimDuration}
            />
          </label>
        </form>

        <Carousel
          images={images}
          itemSize={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  userNumInputs: {
    step: number,
    frameSize: number,
    itemWidth: number,
    animationDuration: number,
  },
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
    userNumInputs: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
    },
    infinite: false,
  };

  handleInputChange(
    value: string,
    key: (keyof State['userNumInputs']),
  ) {
    return this.setState((prev) => ({
      userNumInputs: {
        ...prev.userNumInputs,
        [key]: +value,
      },
    }));
  }

  handleCheckboxChange() {
    return this.setState(prev => ({ infinite: !prev.infinite }));
  }

  render() {
    const {
      images,
      userNumInputs,
      infinite,
    } = this.state;

    return (
      <div className="app">
        <h1
          className="app__title"
          data-cy="title"
        >
          Carousel with
          {images.length}
          images
        </h1>
        <Carousel
          images={images}
          step={userNumInputs.step}
          frameSize={userNumInputs.frameSize}
          itemWidth={userNumInputs.itemWidth}
          animationDuration={userNumInputs.animationDuration}
          infinite={infinite}
        />

        <form className="app__form">
          <label className="app__input">
            <span>Step</span>

            <input
              name="step"
              type="number"
              defaultValue={userNumInputs.step}
              onChange={
                event => this.handleInputChange(event.target.value, 'step')
              }
              min={0}
              step={1}
            />
          </label>

          <label className="app__input">
            <span>Frame size</span>

            <input
              name="frameSize"
              type="number"
              defaultValue={userNumInputs.frameSize}
              onChange={
                event => this.handleInputChange(event.target.value, 'frameSize')
              }
              min={0}
              step={1}
            />
          </label>

          <label className="app__input">
            <span>Item width</span>

            <input
              name="itemWidth"
              type="number"
              defaultValue={userNumInputs.itemWidth}
              onChange={
                event => this.handleInputChange(event.target.value, 'itemWidth')
              }
              min={0}
              step={10}
            />
          </label>

          <label className="app__input">
            <span>Animation duration</span>

            <input
              name="animationDuration"
              type="number"
              defaultValue={userNumInputs.animationDuration}
              onChange={
                event => this.handleInputChange(
                  event.target.value, 'animationDuration',
                )
              }
              min={0}
              step={100}
            />
          </label>

          <label>
            Infinite
            <input
              name="Infinite"
              type="checkbox"
              onChange={() => (this.handleCheckboxChange())}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;

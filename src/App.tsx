import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import images from './api/images';

interface State {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false, 
  };

  changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      ...state,
      [event.target.name]: +event.target.value,
    }));
  }

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="App__title"> Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite} 
        />

        <form className="App__form">
          <label htmlFor="stepId">
            Step:&#160;
            <input
              type="number"
              name="step"
              id="stepId"
              min={1}
              step={1}
              max={images.length}
              value={step}
              onChange={this.changeValue}
            />
          </label>
          <label htmlFor="frameId">
            FrameSize:&#160;
            <input
              type="number"
              name="frameSize"
              id="frameId"
              min={1}
              step={1}
              max={images.length}
              value={frameSize}
              onChange={this.changeValue}
            />
          </label>
          <label htmlFor="itemId">
            ItemWidth:&#160;
            <input
              type="number"
              name="itemWidth"
              id="itemId"
              min={30}
              step={10}
              max={300}
              value={itemWidth}
              onChange={this.changeValue}
            />
          </label>
          <label htmlFor="animationId">
            AnimationDuration:&#160;
            <input
              type="number"
              name="animationDuration"
              id="animationId"
              min={100}
              step={100}
              max={5000}
              value={animationDuration}
              onChange={this.changeValue}
            />
          </label>
          <label htmlFor="infinite">
            Infinite:&#160;
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              onChange={(event) => {
                this.setState({
                  infinite: event.target.checked,
                });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;

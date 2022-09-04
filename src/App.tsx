import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, min, max,
    } = event.currentTarget;
    const defaultValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value)),
    );

    this.setState((state) => (({
      ...state,
      [name]: +defaultValue,
    })));
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

    const maxItemWidth = 1300;
    const maxDisplayedItems = Math.floor(maxItemWidth / itemWidth);

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {this.state.images.length} images</h1>
        <fieldset>
          <label htmlFor="itemId">Item width</label>
          <input
            id="itemId"
            name="itemWidth"
            type="number"
            value={itemWidth}
            onChange={this.onChangeHandler}
            min={1}
            max={maxItemWidth}
          />

          <label htmlFor="frameId">Frame size</label>
          <input
            id="frameId"
            name="frameSize"
            type="number"
            value={frameSize}
            onChange={this.onChangeHandler}
            min={1}
            max={maxDisplayedItems}
          />
          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            name="step"
            type="number"
            value={step}
            onChange={this.onChangeHandler}
            min={1}
            max={images.length}
          />
          <label htmlFor="animationDuration">Animation duration</label>
          <input
            name="animationDuration"
            type="number"
            value={animationDuration}
            onChange={this.onChangeHandler}
            step={1000}
            min={1}
            max={1000 * images.length}
          />
          <label>
            Infinite
            <input
              name="animationDuration"
              type="checkbox"
              onChange={(event) => this.setState({
                infinite: event.currentTarget.checked,
              })}
              checked={infinite}
            />
          </label>
        </fieldset>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

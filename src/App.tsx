import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

type State = {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
};

export class App extends React.Component<{}, State> {
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
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  maxItemWidth = () => {
    const { frameSize, images } = this.state;

    return -(images.length - frameSize) * 100;
  };

  changeInfiniteValue = () => {
    this.setState(() => ({
      infinite: true,
    }));
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form action="get">
          <label
            htmlFor="itemWidth"
            className="App_label"
          >
            <span>Width:</span>
            <input
              id="itemWidth"
              className="App_input"
              type="number"
              defaultValue={130}
              onChange={({ target }) => (
                this.setState({ itemWidth: +(target.value) })
              )}
            />
          </label>
          <br />
          <label
            htmlFor="frameSize"
            className="App_label"
          >
            <span>Framesize:</span>
            <input
              id="frameSize"
              min="1"
              max="5"
              className="App_input"
              type="number"
              defaultValue={3}
              onChange={({ target }) => (
                this.setState({ frameSize: +(target.value) })
              )}
            />
          </label>
          <br />
          <label
            htmlFor="step"
            className="App_label"
          >
            <span>Step:</span>
            <input
              id="step"
              className="App_input"
              type="number"
              defaultValue={3}
              onChange={({ target }) => (
                this.setState({ step: +(target.value) })
              )}
            />
          </label>
          <br />
          <label
            htmlFor="animationDuration"
            className="App_label"
          >
            <span>Duration:</span>
            <input
              id="animationDuration"
              className="App_input"
              type="number"
              defaultValue={1000}
              onChange={({ target }) => (
                this.setState({ animationDuration: +(target.value) })
              )}
            />
          </label>
          <br />
          <label
            htmlFor="infinite"
            className="App_label"
          >
            <span>Infinite:</span>
            <input
              className="App_input"
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.changeInfiniteValue}
            />
          </label>
        </form>
        <Carousel
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          images={images}
          animationDuration={animationDuration}
          maxValue={this.maxItemWidth()}
        />
      </div>
    );
  }
}

export default App;

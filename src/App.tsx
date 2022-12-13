import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

type State = {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
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
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form action="get" className="App_form">
          <label
            htmlFor="itemId"
            className="App_label"
          >
            <span>Width:</span>
            <input
              id="itemId"
              className="App_input"
              min={50}
              max={400}
              type="number"
              defaultValue={itemWidth}
              onChange={(event) => (
                this.setState({ itemWidth: +(event.target.value) })
              )}
            />
          </label>
          <br />
          <label
            htmlFor="frameId"
            className="App_label"
          >
            <span>Framesize:</span>
            <input
              id="frameId"
              min={1}
              max={10}
              className="App_input"
              type="number"
              defaultValue={frameSize}
              onChange={(event) => (
                this.setState({ frameSize: +(event.target.value) })
              )}
            />
          </label>
          <br />
          <label
            htmlFor="stepId"
            className="App_label"
          >
            <span>Step:</span>
            <input
              id="stepId"
              className="App_input"
              min={1}
              max={10}
              type="number"
              defaultValue={step}
              onChange={(event) => (
                this.setState({ step: +(event.target.value) })
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
              min={0}
              max={10000}
              className="App_input"
              type="number"
              defaultValue={animationDuration}
              onChange={(event) => (
                this.setState({ animationDuration: +(event.target.value) })
              )}
            />
          </label>
        </form>
        <Carousel
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          images={images}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;

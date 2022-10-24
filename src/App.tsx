import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
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
        <h1 data-cy="title">
          Carousel with
          {` ${images.length} `}
          images
        </h1>

        <form className="Inputs">
          <label>
            Image width:
            <input
              type="number"
              name="itemWidth"
              id="width"
              min={130}
              max={360}
              value={itemWidth}
              onChange={e => {
                this.setState({ itemWidth: +e.target.value });
              }}
            />
          </label>

          <label>
            Frame size:
            <input
              type="number"
              name="frameSize"
              id="frameSize"
              min={1}
              max={10}
              value={frameSize}
              onChange={e => {
                this.setState({ frameSize: +e.target.value });
              }}
            />
          </label>

          <label>
            Step:
            <input
              type="number"
              name="step"
              id="step"
              min={1}
              max={10}
              value={step}
              onChange={e => {
                this.setState({ step: +e.target.value });
              }}
            />
          </label>

          <label>
            Animation duration:
            <input
              type="number"
              name="animationDuration"
              id="duration"
              min={100}
              max={2000}
              value={animationDuration}
              onChange={e => {
                this.setState({ animationDuration: +e.target.value });
              }}
            />
          </label>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;

import { Component } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: string,
  frameSize: string,
  step: string,
  animationDuration: string,
  infinite: boolean,
}

class App extends Component<{}, State> {
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
    itemWidth: '130',
    frameSize: '3',
    step: '3',
    animationDuration: '1000',
    infinite: false,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__input-blocks">
          <label htmlFor="item-width" className="App__input-block">
            Set item width:
            <input
              type="number"
              name="itemWidth"
              id="item-width"
              value={this.state.itemWidth}
              onChange={(event) => {
                this.setState({ itemWidth: event.target.value });
              }}
            />
          </label>

          <label htmlFor="frame-size" className="App__input-block">
            Set frame size:
            <input
              type="number"
              name="frameSize"
              id="frame-size"
              max={10}
              min={1}
              value={this.state.frameSize}
              onChange={(event) => {
                this.setState({ frameSize: event.target.value });
              }}
            />
          </label>

          <label htmlFor="step" className="App__input-block">
            Set step:
            <input
              type="number"
              name="step"
              id="step"
              max={10}
              min={1}
              value={this.state.step}
              onChange={(event) => {
                this.setState({ step: event.target.value });
              }}
            />
          </label>

          <label htmlFor="animation-duration" className="App__input-block">
            Set animation duration:
            <input
              type="number"
              name="animationDuration"
              id="animation-duration"
              value={this.state.animationDuration}
              onChange={(event) => {
                this.setState({ animationDuration: event.target.value });
              }}
            />
          </label>

          <label htmlFor="infinite" className="App__input-block">
            Infinite carousel:
            <input
              type="checkbox"
              name="infinite"
              id="infinite"
              checked={this.state.infinite}
              onChange={() => {
                this.setState(prevState => {
                  return {
                    infinite: !prevState.infinite,
                  };
                });
              }}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

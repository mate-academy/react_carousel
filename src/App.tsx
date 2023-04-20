import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
}

const images = [
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
];

class App extends React.Component<{}, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  stateUpdate = (name: string, value: number | string) => {
    this.setState((state) => {
      return { ...state, [name]: value };
    });
  };

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <>
        <div className="App">
          {/* eslint-disable-next-line */}
          <h1 data-cy="title">Carousel with {images.length} images</h1>

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />
        </div>

        <form
          action="#"
          className="form"
        >
          <div>
            <input
              type="number"
              name="step"
              placeholder="Step"
              className="form-item"
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            />
          </div>

          <div>
            <input
              type="number"
              name="frameSize"
              placeholder="Frame size"
              className="form-item"
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            />
          </div>

          <div>
            <input
              type="number"
              name="itemWidth"
              placeholder="Item width"
              className="form-item"
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            />
          </div>

          <div>
            <input
              type="number"
              name="animationDuration"
              placeholder="Animation duration"
              className="form-item"
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            />
          </div>

          <div>
            <select
              name="infinite"
              placeholder="Infinite"
              className="form-item"
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            >
              <option value="true"> true </option>
              <option value="false"> false </option>
            </select>
          </div>
        </form>
      </>
    );
  }
}

export default App;

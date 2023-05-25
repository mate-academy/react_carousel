import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: string
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
    infinite: 'false',
  };

  stateUpdate = (name: string, value: number | string) => {
    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  removeNegatives = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '-') {
      event.preventDefault();
    }
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
          <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

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
          <label className="form-labels">
            <div>Step</div>

            <input
              type="number"
              name="step"
              defaultValue={step}
              min={0}
              className="form-item"
              onKeyDown={this.removeNegatives}
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            />
          </label>

          <label className="form-labels">
            <div>Frame size</div>

            <input
              type="number"
              name="frameSize"
              defaultValue={frameSize}
              min={0}
              className="form-item"
              onKeyDown={this.removeNegatives}
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            />
          </label>

          <label className="form-labels">
            <div>Item width</div>

            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              min={0}
              className="form-item"
              onKeyDown={this.removeNegatives}
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            />
          </label>

          <label className="form-labels">
            <div>Animation duration</div>

            <input
              type="number"
              name="animationDuration"
              defaultValue={animationDuration}
              min={0}
              className="form-item"
              onKeyDown={this.removeNegatives}
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            />
          </label>

          <label className="form-labels">
            <div>Infinite animation</div>

            <select
              name="infinite"
              defaultValue="false"
              className="form-item"
              onChange={(event) => (
                this.stateUpdate(event.target.name, event.target.value)
              )}
            >
              <option value="true"> true </option>
              <option value="false"> false </option>
            </select>
          </label>
        </form>
      </>
    );
  }
}

export default App;

import React, { ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { State } from './utils/types';

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

  render() {
    const { step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    const setValue =
      (property: keyof State) => (event: ChangeEvent<HTMLInputElement>) =>
        this.setState(prevState => ({
          ...prevState,
          [property]: event.target.value,
        }));

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {this.state.images.length} images</h1>

        <Carousel {...this.state} />

        <form className="App__form">
          <label className="App__form--label" htmlFor="frameId">
            Frame Size:
            <input
              onChange={setValue('frameSize')}
              type="number"
              id="frameId"
              className="App__form--input"
              value={frameSize}
            />
          </label>

          <label className="App__form--label" htmlFor="animationId">
            Animation Duration:
            <input
              onChange={setValue('animationDuration')}
              type="number"
              id="animationId"
              className="App__form--input"
              value={animationDuration}
            />
          </label>

          <label className="App__form--label" htmlFor="itemId">
            Item Width:
            <input
              onChange={setValue('itemWidth')}
              type="number"
              id="itemId"
              className="App__form--input"
              value={itemWidth}
            />
          </label>

          <label className="App__form--label" htmlFor="stepId">
            Step:
            <input
              onChange={setValue('step')}
              type="number"
              id="stepId"
              className="App__form--input"
              value={step}
            />
          </label>

          <label className="App__form--label" htmlFor="infiniteId">
            Infinite?:
            <input
              onChange={event =>
                this.setState({ infinite: event.target.checked })
              }
              id="infiniteId"
              type="checkbox"
              className="App__form--checkbox"
              checked={infinite}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;

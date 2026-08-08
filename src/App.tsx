import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
}

class App extends React.Component<{}, State> {
  state = {
    images: Array.from(
      { length: 10 },
      (_, index) =>  (index + 1).toString(),
    ),
    step: 3,
    itemWidth: 130,
    frameSize: 3,
  };

  render() {
    const { images, step, itemWidth, frameSize} = this.state;


    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>
        {/* eslint-disable-next-line */}
          {/* ЕЛЕМЕНТИ УПРАВЛІННЯ - те, що шукають тести */}
      <div>
        <label htmlFor="stepId">Step: </label>
        <input
          id="stepId"
          data-cy="step"
          type="number"
          value={step}
          onChange={(e) => this.setState({ step: Number(e.target.value) })}
        />
      </div>

      <div>
        <label htmlFor="itemId">Item Width: </label>
        <input
          id="itemId"
          data-cy="item"
          type="number"
          value={itemWidth}
          onChange={(e) => this.setState({ itemWidth: Number(e.target.value) })}
        />
      </div>

      <div>
        <label htmlFor="frameId">Frame Size: </label>
        <input
          id="frameId"
          data-cy="frame"
          type="number"
          value={frameSize}
          onChange={(e) => this.setState({ frameSize: Number(e.target.value) })}
        />
        </div>

        <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
      />
      </div>
    );
  }
}

export default App;

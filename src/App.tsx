import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type NumKey = 'itemWidth' | 'frameSize' | 'step' | 'animationDuration';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
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
    infinite: false,
  };

  handleNumber(key: NumKey) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const parsed = Number.isNaN(value) ? 0 : value;

      this.setState({ [key]: parsed } as Pick<State, typeof key>);
    };
  }

  handleInfiniteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: e.target.checked });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>

        <div className="controls">
          <label htmlFor="itemId">itemWidth</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={this.handleNumber('itemWidth')}
            min={1}
          />

          <label htmlFor="frameId">frameSize</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={this.handleNumber('frameSize')}
            min={1}
            max={images.length}
          />

          <label htmlFor="stepId">step</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={this.handleNumber('step')}
            min={1}
            max={images.length}
          />

          <label htmlFor="animationId">animationDuration</label>
          <input
            id="animationId"
            type="number"
            value={animationDuration}
            onChange={this.handleNumber('animationDuration')}
            min={0}
          />

          <label htmlFor="infiniteId">infinite</label>
          <input
            id="infiniteId"
            type="checkbox"
            checked={infinite}
            onChange={this.handleInfiniteChange}
          />
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

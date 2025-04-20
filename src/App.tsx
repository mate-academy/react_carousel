import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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
    infinite: false,
  };

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof State,
  ) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : Number(e.target.value);

    this.setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="input-group">
          <label htmlFor="itemId">Item width:</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => this.handleInputChange(e, 'itemWidth')}
          />
          <label htmlFor="frameId">Frame size:</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => this.handleInputChange(e, 'frameSize')}
          />
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => this.handleInputChange(e, 'step')}
          />
          <label htmlFor="animationId">Animation duration:</label>
          <input
            id="animationId"
            type="number"
            value={animationDuration}
            onChange={e => this.handleInputChange(e, 'animationDuration')}
          />
          <div className="checkbox-group">
            <label htmlFor="infinite">Infinite:</label>
            <input
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={e => this.handleInputChange(e, 'infinite')}
            />
          </div>
        </div>

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

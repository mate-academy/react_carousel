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

  handleInputChange =
    (key: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === 'checkbox'
          ? e.target.checked
          : Number(e.target.value);

      this.setState({
        [key]: value as State[keyof State],
      } as Pick<State, keyof State>);
    };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__controls">
          <div className="App__control-group">
            <label htmlFor="itemId">Item Width (px):</label>
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={this.handleInputChange('itemWidth')}
              min="50"
              max="300"
            />
          </div>

          <div className="App__control-group">
            <label htmlFor="frameId">Frame Size (items):</label>
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={this.handleInputChange('frameSize')}
              min="1"
              max={images.length}
            />
          </div>

          <div className="App__control-group">
            <label htmlFor="stepId">Step (items per click):</label>
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={this.handleInputChange('step')}
              min="1"
              max={images.length}
            />
          </div>

          <div className="App__control-group">
            <label htmlFor="animationDuration">Animation Duration (ms):</label>
            <input
              id="animationDuration"
              type="number"
              value={animationDuration}
              onChange={this.handleInputChange('animationDuration')}
              min="100"
              max="3000"
              step="100"
            />
          </div>

          <div className="App__control-group">
            <label htmlFor="infinite">
              <input
                id="infinite"
                type="checkbox"
                checked={infinite}
                onChange={this.handleInputChange('infinite')}
              />
              Infinite Loop
            </label>
          </div>
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

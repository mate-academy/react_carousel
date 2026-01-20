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

  componentDidMount(): void {
    document.title = 'Carousel';
  }

  handleInputChange(field: keyof Omit<State, 'images' | 'infinite'>) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      this.setState(prevState => ({
        ...prevState,
        [field]: value,
      }));
    };
  }

  handleToggle(field: 'infinite') {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;

      this.setState(prevState => ({
        ...prevState,
        [field]: checked,
      }));
    };
  }

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__controls">
          <label htmlFor="itemId">
            <span>Item Width:</span>
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={this.handleInputChange('itemWidth')}
              min="50"
            />
          </label>

          <label htmlFor="frameId">
            <span>Frame Size:</span>
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={this.handleInputChange('frameSize')}
              min="1"
            />
          </label>

          <label htmlFor="stepId">
            <span>Step:</span>
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={this.handleInputChange('step')}
              min="1"
            />
          </label>

          <label htmlFor="durationId">
            <span>Animation Duration:</span>
            <input
              id="durationId"
              type="number"
              value={animationDuration}
              onChange={this.handleInputChange('animationDuration')}
              min="0"
            />
          </label>

          <label htmlFor="infiniteId">
            <span>Infinite:</span>
            <input
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={this.handleToggle('infinite')}
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

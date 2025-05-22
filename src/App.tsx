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

type NumericField = 'itemWidth' | 'frameSize' | 'step' | 'animationDuration';

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

  handleChange =
    (field: NumericField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      this.setState({ [field]: value } as Pick<State, NumericField>);
    };

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__controls">
          <label htmlFor="itemId">
            Item width:
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={this.handleChange('itemWidth')}
            />
          </label>

          <label htmlFor="frameId">
            Frame size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={this.handleChange('frameSize')}
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={this.handleChange('step')}
            />
          </label>

          <label htmlFor="durationId">
            Animation duration (ms):
            <input
              id="durationId"
              type="number"
              value={animationDuration}
              onChange={this.handleChange('animationDuration')}
            />
          </label>

          <label htmlFor="infiniteId">
            Infinite:
            <input
              id="infiniteId"
              type="checkbox"
              checked={this.state.infinite}
              onChange={this.handleCheckboxChange}
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

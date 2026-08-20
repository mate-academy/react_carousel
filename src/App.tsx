import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { ICarousel } from './model/model';

type State = ICarousel;
type NumericField = 'step' | 'frameSize' | 'itemWidth' | 'animationDuration';

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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleChange =
    (field: NumericField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      this.setState({
        [field]: value === '' ? '' : +value,
      } as Pick<State, NumericField>);
    };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="title">
          Carousel with {images.length} images
        </h1>
        <div className="controls">
          <label className="label" htmlFor="stepId">
            Step:
            <input
              className="input"
              type="number"
              value={step}
              onChange={this.handleChange('step')}
              id="stepId"
            />
          </label>

          <label className="label" htmlFor="frameId">
            Frame size:
            <input
              className="input"
              type="number"
              value={frameSize}
              onChange={this.handleChange('frameSize')}
              id="frameId"
            />
          </label>

          <label className="label" htmlFor="itemId">
            Item width:
            <input
              className="input"
              type="number"
              value={itemWidth}
              onChange={this.handleChange('itemWidth')}
              id="itemId"
            />
          </label>

          <label className="label" htmlFor="animationId">
            Animation duration (ms):
            <input
              className="input"
              type="number"
              value={animationDuration}
              onChange={this.handleChange('animationDuration')}
              id="animationId"
            />
          </label>

          <label className="label">
            Infinite:
            <input
              className="input"
              type="checkbox"
              checked={infinite}
              onChange={() => this.setState({ infinite: !this.state.infinite })}
            />
          </label>
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

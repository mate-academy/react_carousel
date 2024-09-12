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

  handleChange = (field: keyof State, value: number | boolean) => {
    this.setState({ [field]: value } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 className="App__title" data-cy="title">
          Carousel with {images.length} images
        </h1>

        <fieldset className="App__settings">
          <legend className="App__legend">Settings</legend>
          <label htmlFor="itemId" className="App__label">
            {'Item width: '}
            <input
              className="App__input"
              type="number"
              id="itemId"
              min={10}
              max={260}
              step={10}
              onChange={e => this.handleChange('itemWidth', +e.target.value)}
              value={itemWidth}
            />
          </label>

          <label htmlFor="frameId" className="App__label">
            {'Frame size: '}
            <input
              className="App__input"
              type="number"
              id="frameId"
              min={1}
              max={images.length}
              step={1}
              onChange={event =>
                this.handleChange('frameSize', +event.target.value)
              }
              value={frameSize}
            />
          </label>

          <label htmlFor="stepId" className="App__label">
            {'Step: '}
            <input
              className="App__input"
              type="number"
              id="stepId"
              min={1}
              max={images.length}
              step={1}
              onChange={event => this.handleChange('step', +event.target.value)}
              value={step}
            />
          </label>

          <label htmlFor="animationId" className="App__label">
            {'Animation duration: '}
            <input
              className="App__input"
              type="number"
              id="animationId"
              min="100"
              max="5000"
              step={100}
              onChange={event =>
                this.handleChange('animationDuration', +event.target.value)
              }
              value={animationDuration}
            />
          </label>

          <label className="App__label">
            <input
              className="App__checkbox"
              id="infinite"
              type="checkbox"
              onChange={() => this.handleChange('infinite', !infinite)}
              checked={infinite}
            />
            <span className="App__checkbox-span">Infinite:</span>
          </label>
        </fieldset>

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

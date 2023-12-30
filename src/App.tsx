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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, type, checked,
    } = event.target;

    if (type === 'checkbox') {
      this.setState({ [name]: checked } as unknown as Pick<State, keyof State>);
    } else {
      this.setState({ [name]: +value } as Pick<State, keyof State>);
    }
  };

  render() {
    const {
      images, itemWidth, frameSize, step, animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          Carousel with
          {images.length}
          images
        </h1>

        <form className="form" action="#" method="post">
          <label className="form__label" htmlFor="itemId">
            Item Width:&nbsp;

            <input
              className="form__input"
              type="number"
              name="itemWidth"
              id="itemId"
              min={130}
              step={10}
              value={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>

          <label className="form__label" htmlFor="frameId">
            Frame Size:&nbsp;

            <input
              className="form__input"
              type="number"
              name="frameSize"
              id="frameId"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={this.handleInputChange}
            />
          </label>

          <label className="form__label" htmlFor="stepId">
            Step:&nbsp;

            <input
              className="form__input"
              type="number"
              name="step"
              id="stepId"
              min={1}
              value={step}
              onChange={this.handleInputChange}
            />
          </label>

          <label className="form__label" htmlFor="animationDurationId">
            Animation Duration:&nbsp;

            <input
              className="form__input"
              type="number"
              name="animationDuration"
              id="animationDurationId"
              min={500}
              max={10000}
              step={500}
              value={animationDuration}
              onChange={this.handleInputChange}
            />
          </label>

          <label className="form__label" htmlFor="infiniteId">
            Infinite:&nbsp;

            <input
              className="form__input"
              type="checkbox"
              name="infinite"
              id="infiniteId"
              checked={infinite}
              onChange={this.handleInputChange}
            />
          </label>
        </form>

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

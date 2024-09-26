import React from 'react';
import 'bulma';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const property: string = e.target.name;

    if (property === 'infinite') {
      this.setState({
        [property]: e.target.checked,
      });

      return;
    }

    this.setState({
      [property]: +e.target.value,
    } as any);
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      // eslint-disable-next-line
    } = this.state;

    return (
      <div
        className="App box"
        style={{
          width: `${frameSize * itemWidth + 100}px`,
          height: `${itemWidth + 500}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <h1 className="title" data-cy="title">
          Carousel with {images.length} images
        </h1>

        <form action="">
          <label htmlFor="itemWidth" className="App__form__label">
            Item Width
            <input
              type="number"
              className="input is-rounded App__form__input"
              name="itemWidth"
              id="itemWidth"
              min="100"
              max="250"
              step="5"
              value={itemWidth}
              onChange={this.handlerOnChange}
            />
          </label>

          <label htmlFor="frameSize" className="App__form__label">
            Frame Size
            <input
              type="number"
              className="input is-rounded App__form__input"
              name="frameSize"
              id="frameSize"
              min={1}
              max={images.length}
              step={1}
              value={frameSize}
              onChange={this.handlerOnChange}
            />
          </label>

          <label htmlFor="step" className="App__form__label">
            Step
            <input
              type="number"
              className="input is-rounded App__form__input"
              name="step"
              id="step"
              min={1}
              max={images.length}
              value={step}
              onChange={this.handlerOnChange}
            />
          </label>

          <label htmlFor="animationDuration" className="App__form__label">
            Animation Duration
            <input
              type="number"
              className="input is-rounded App__form__input"
              name="animationDuration"
              id="animationDuration"
              min={250}
              max={5000}
              step={250}
              value={animationDuration}
              onChange={this.handlerOnChange}
            />
          </label>

          <label htmlFor="infinite" className="App__form__label">
            Infinite
            <input
              type="checkbox"
              className="App__form__input checkbox"
              name="infinite"
              id="infinite"
              checked={infinite}
              onChange={this.handlerOnChange}
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

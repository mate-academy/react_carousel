import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

  render() {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images `}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          infinite={infinite}
          animationDuration={animationDuration}
        />
        <form className="form">
          <label htmlFor="stepId">
            <input
              type="range"
              value={step}
              id="stepId"
              min={1}
              max={9}
              onChange={(e) => this.setState({ step: +e.currentTarget.value })}
            />
            {'Slide Step '}
            <span className="form__input-value">{step}</span>
          </label>

          <label htmlFor="itemId">
            <input
              id="itemId"
              type="range"
              min={50}
              max={390}
              step={2}
              value={itemWidth}
              onChange={(e) => this.setState({
                itemWidth: +e.currentTarget.value,
              })}
            />
            {'Image Width '}
            <span className="form__input-value">{itemWidth}</span>
          </label>

          <label>
            <input
              type="range"
              min={500}
              max={5000}
              step={1000}
              value={animationDuration}
              onChange={(e) => this.setState({
                animationDuration: +e.currentTarget.value,
              })}
            />
            {'Animation Duration '}
            <span className="form__input-value">{animationDuration}</span>
          </label>

          <label htmlFor="frameId">
            <input
              id="frameId"
              type="range"
              value={frameSize}
              min={1}
              max={images.length + 1}
              step={1}
              onChange={(e) => this.setState({
                frameSize: +e.currentTarget.value,
              })}
            />
            {'Frame Size '}
            <span className="form__input-value">{ frameSize * itemWidth}</span>
          </label>

          <label
            htmlFor="checkbox"
            className="checkbox-label"
          >
            <input
              className="form__input-checkbox"
              type="checkbox"
              id="checkbox"
              checked={infinite}
              onChange={
                () => this.setState(
                  prevState => ({ infinite: !prevState.infinite }),
                )
              }
            />
            <div className={`form__input-fake-checkbox ${infinite ? 'png' : ''}`}> </div>
            infinite
          </label>
        </form>
      </div>
    );
  }
}

export default App;

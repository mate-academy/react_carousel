import React from 'react';
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'stepId':
        this.setState({ step: +event.target.value });
        break;
      case 'frameId':
        this.setState({ frameSize: +event.target.value });
        break;
      case 'itemId':
        this.setState({ itemWidth: +event.target.value });
        break;
      case 'animationDuration':
        this.setState({ animationDuration: +event.target.value });
        break;
      case 'infinite':
        this.setState((prevState) => ({
          infinite: !prevState.infinite,
        }));
        break;

      default:
        break;
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    const { handleInputChange } = this;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form action="#" className="App__form">
          <label className="App__label" htmlFor="itemId">
            Item Width
            <input
              type="number"
              id="itemId"
              name="itemId"
              min="50"
              max="200"
              className="App__input"
              step="5"
              value={itemWidth}
              onChange={handleInputChange}
            />
          </label>
          <label className="App__label" htmlFor="frameId">
            Frame size
            <input
              type="number"
              id="frameId"
              name="frameId"
              min="1"
              max="10"
              className="App__input"
              value={frameSize}
              onChange={handleInputChange}
            />
          </label>
          <label className="App__label" htmlFor="stepId">
            Step
            <input
              type="number"
              id="stepId"
              name="stepId"
              min="1"
              max="9"
              className="App__input"
              value={step}
              onChange={handleInputChange}
            />
          </label>
          <label className="App__label" htmlFor="animationDuration">
            Animation duration
            <input
              type="number"
              id="animationDuration"
              name="animationDuration"
              className="App__input"
              value={animationDuration}
              onChange={handleInputChange}
            />
          </label>
          <label className="App__label App__label--infinite" htmlFor="infinite">
            Infinite
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              className="App__input"
              defaultChecked={infinite}
              onChange={handleInputChange}
            />
          </label>
        </form>

        <Carousel
          images={images}
          step={step}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

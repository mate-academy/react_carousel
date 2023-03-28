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

    step: 2,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
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

    const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentState = event.currentTarget.id;
      const stateValue = +event.currentTarget.value;

      switch (currentState) {
        case 'itemWidth':
          this.setState({ itemWidth: +stateValue });
          break;
        case 'frameSize':
          this.setState({ frameSize: +stateValue });
          break;
        case 'step':
          this.setState({ step: +stateValue });
          break;
        case 'animationDuration':
          this.setState({ animationDuration: +stateValue });
          break;
        case 'infinite':
          this.setState((prevState) => ({
            infinite: !prevState.infinite,
          }));
          break;
        default:
          this.setState({ animationDuration: +stateValue });
      }
    };

    return (
      <div className="App">
        <h1 data-cy="title">
          Carousel with
          &nbsp;
          {images.length}
          &nbsp;
          images
        </h1>

        <form className="App__form">
          <label htmlFor="itemWidth">
            <span>ItemWidth:</span>
            <input
              className="App__input"
              min={100}
              max={200}
              step={10}
              type="number"
              id="itemWidth"
              defaultValue={itemWidth}
              onChange={handleInputs}
            />
          </label>

          <label htmlFor="frameSize">
            <span>FrameSize:</span>
            <input
              className="App__input"
              min={1}
              max={images.length}
              type="number"
              id="frameSize"
              defaultValue={frameSize}
              onChange={handleInputs}
            />
          </label>

          <label htmlFor="step">
            <span>Step:</span>
            <input
              className="App__input"
              min={1}
              max={images.length}
              type="number"
              id="step"
              defaultValue={step}
              onChange={handleInputs}
            />
          </label>

          <label htmlFor="duration">
            <span>AnimationDuration:</span>
            <input
              className="App__input"
              min={100}
              max={3000}
              step={100}
              type="number"
              id="animationDuration"
              defaultValue={animationDuration}
              onChange={handleInputs}
            />
          </label>

          <label htmlFor="infinite">
            <span>Infinite:</span>
            <input
              className="App__input"
              type="checkbox"
              id="infinite"
              onChange={handleInputs}
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

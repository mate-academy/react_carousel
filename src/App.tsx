import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
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
    infinity: false,
  };

  handleItemWidthChange(value: number) {
    this.setState({ itemWidth: value });
  }

  handleFrameSizeChange(value: number) {
    this.setState({ frameSize: value });
  }

  handleStepChange(value: number) {
    this.setState({ step: value });
  }

  handleAnimationDurationChange = (value: number) => {
    this.setState({ animationDuration: value });
  };

  render() {
    const { images } = this.state;
    const { itemWidth } = this.state;
    const { frameSize } = this.state;
    const { step } = this.state;
    const { animationDuration } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="container">
          <label htmlFor="itemId">
            Enter item width
            <input
              id="itemId"
              className="container__input"
              type="text"
              value={itemWidth}
              onChange={event =>
                this.handleItemWidthChange(Number(event.target.value))
              }
            />
          </label>
          <label htmlFor="frameId">
            Enter number of images
            <input
              id="frameId"
              className="container__input"
              type="text"
              value={frameSize}
              onChange={event =>
                this.handleFrameSizeChange(Number(event.target.value))
              }
            />
          </label>
          <label htmlFor="stepId">
            Enter scrolled images per click
            <input
              id="stepId"
              className="container__input"
              type="text"
              value={step}
              onChange={event =>
                this.handleStepChange(Number(event.target.value))
              }
            />
          </label>
          <label>
            Enter time to show the new images
            <input
              className="container__input"
              type="text"
              value={animationDuration}
              onChange={event =>
                this.handleAnimationDurationChange(Number(event.target.value))
              }
            />
          </label>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinity={false}
        />
      </div>
    );
  }
}

export default App;

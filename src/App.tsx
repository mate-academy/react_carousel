import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
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
  };

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof State,
  ) => {
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const { images, animationDuration, frameSize, itemWidth, step } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__label-wrapper">
          <label htmlFor="itemId">
            <span>Enter images width in pixels</span>
            <input
              type="number"
              id="itemId"
              value={itemWidth}
              name="itemWidth"
              placeholder="Images width: 130"
              onChange={event =>
                this.handleInputChange(event, event.target.name as keyof State)
              }
            />
          </label>

          <label htmlFor="frameId">
            <span>Enter number of images displayed at once</span>
            <input
              type="number"
              id="frameId"
              defaultValue={frameSize}
              name="frameSize"
              placeholder="Display images: 3"
              onChange={event =>
                this.handleInputChange(event, event.target.name as keyof State)
              }
            />
          </label>

          <label htmlFor="stepId">
            <span>Number of images scrolled per click</span>
            <input
              type="number"
              id="stepId"
              defaultValue={step}
              name="step"
              placeholder="Scroll: 3"
              onChange={event =>
                this.handleInputChange(event, event.target.name as keyof State)
              }
            />
          </label>

          <label htmlFor="animation">
            <span>Number of images scrolled per click in miliseconds</span>
            <input
              type="number"
              id="animation"
              defaultValue={animationDuration}
              name="animationDuration"
              placeholder="Duration: 1000"
              onChange={event =>
                this.handleInputChange(event, event.target.name as keyof State)
              }
            />
          </label>
        </div>

        <div className="App__carousel">
          <Carousel
            images={images}
            animationDuration={animationDuration}
            frameSize={frameSize}
            itemWidth={itemWidth}
            step={step}
          />
        </div>
      </div>
    );
  }
}

export default App;

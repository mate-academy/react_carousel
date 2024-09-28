import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: +value,
    }));
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <form className="form">
          <label htmlFor="itemId" className="form__input">
            Item Width:{' '}
            <input
              type="number"
              id="itemWidth"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleInputChange}
              placeholder="Item Width"
            />
          </label>
          <label htmlFor="frameId" className="form__input">
            Frame Size:{' '}
            <input
              type="number"
              id="frameSize"
              name="frameSize"
              value={frameSize}
              onChange={this.handleInputChange}
              placeholder="Frame Size"
            />
          </label>
          <label htmlFor="stepId" className="form__input">
            Step:{' '}
            <input
              type="number"
              id="step"
              name="step"
              value={step}
              onChange={this.handleInputChange}
              placeholder="Step"
            />
          </label>
          <label htmlFor="animationDuration" className="form__input">
            Animation Duration:{' '}
            <input
              type="number"
              id="animationDuration"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleInputChange}
              placeholder="Animation Duration"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;

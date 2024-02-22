import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animDuration: number;
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
    animDuration: 1000,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: +value } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animDuration } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="App__title">Carousel with {images.length} images</h1>
        <form action="" className="App__form">
          <label>
            Item Width: <br />
            <input
              name="itemWidth"
              type="number"
              defaultValue={itemWidth}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Frame Size: <br />
            <input
              name="frameSize"
              type="number"
              defaultValue={frameSize}
              min={1}
              max={3}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Step: <br />
            <input
              defaultValue={step}
              type="number"
              name="step"
              onChange={this.handleInputChange}
              min={1}
              max={images.length}
            />
          </label>
          <label>
            Animation Duration: <br />
            <input
              defaultValue={animDuration}
              type="number"
              name="animationDuration"
              onChange={this.handleInputChange}
            />
          </label>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;

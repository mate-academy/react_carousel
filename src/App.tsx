import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  currentStep: number;
  currentItemWidth: number;
  currentFrameWidth: number;
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

    currentStep: 3,
    currentItemWidth: 130,
    currentFrameWidth: 3,
  };

  render() {
    const { images } = this.state;
    const { currentStep } = this.state;
    const { currentItemWidth } = this.state;
    const { currentFrameWidth } = this.state;

    return (
      <div className="App">
        <div className="App__title-block">
          <h1 className="App__header" data-cy="title">
            Carousel with
            {images.length}
            images
          </h1>
          <div className="App__inputs-container">
            <label htmlFor="stepId">Step</label>
            <input
              type="text"
              className="App__input"
              id="stepId"
              defaultValue={currentStep}
              onChange={
                (event) => this.setState({ currentStep: +event.target.value })
              }
            />

            <label htmlFor="itemId">Item</label>
            <input
              type="text"
              className="App__input"
              id="itemId"
              defaultValue={currentItemWidth}
              onChange={
                (event) => this.setState(
                  { currentItemWidth: +event.target.value },
                )
              }
            />

            <label htmlFor="frameId">Frame</label>
            <input
              type="text"
              className="App__input"
              id="frameId"
              defaultValue={currentFrameWidth}
              onChange={
                (event) => this.setState(
                  { currentFrameWidth: +event.target.value },
                )
              }
            />
          </div>

        </div>

        <Carousel
          images={images}
          step={currentStep}
          frameSize={currentFrameWidth}
          itemWidth={currentItemWidth}
          animationDuration={1000}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;

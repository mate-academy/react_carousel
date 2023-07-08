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

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <div>
          <h1 className="App__title" data-cy="title">
            {`Carousel with ${images.length} images`}
          </h1>

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
          />

          <div className="App__inputs">
            <label className="App__input-label">
              <input
                type="number"
                className="App__input"
                name="step"
                defaultValue={step}
                min={1}
                max={10}
                step={1}
                onChange={
                  (event) => this.setState({ step: +event.target.value })
                }
              />
              Step
            </label>

            <label className="App__input-label">
              <input
                type="number"
                className="App__input"
                name="frameSize"
                defaultValue={frameSize}
                min={1}
                max={10}
                step={1}
                onChange={
                  (event) => this.setState({ frameSize: +event.target.value })
                }
              />
              Count of Smiley
            </label>

            <label className="App__input-label">
              <input
                type="number"
                className="App__input"
                name="itemWidth"
                defaultValue={itemWidth}
                min={70}
                max={150}
                step={20}
                onChange={
                  (event) => this.setState({ itemWidth: +event.target.value })
                }
              />
              Smiley Width
            </label>

            <label className="App__input-label">
              <input
                type="number"
                className="App__input"
                name="animationDuration"
                defaultValue={animationDuration}
                min={200}
                max={2000}
                step={200}
                onChange={
                  (event) => this.setState(
                    { animationDuration: +event.target.value },
                  )
                }
              />
              Animation Duration
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

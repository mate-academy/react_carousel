import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

  addCustomPropetries = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    this.setState({
      step: Number(data.get('step')),
      frameSize: Number(data.get('frameSize')),
      itemWidth: Number(data.get('itemWidth')),
      animationDuration: Number(data.get('animationDuration')),
    });

    event.currentTarget.reset();
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
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <form className="App__form" onSubmit={this.addCustomPropetries}>
          <label className="App__label" htmlFor="itemId">
            Write the size of the image:
            <input
              type="number"
              id="itemId"
              name="itemWidth"
              className="App__input"
              defaultValue={130}
            />
          </label>

          <label className="App__label" htmlFor="frameId">
            Write the number of images displayed at the same time:
            <input
              type="number"
              id="frameId"
              name="frameSize"
              className="App__input"
              defaultValue={3}
              min={1}
              max={10}
            />
          </label>

          <label className="App__label" htmlFor="stepId">
            Write the number of images scrolled per click:
            <input
              type="number"
              id="stepId"
              name="step"
              className="App__input"
              defaultValue={3}
              min={1}
              max={10}
            />
          </label>

          <label className="App__label">
            Write time in ms to show the new portion of images:
            <input
              type="number"
              name="animationDuration"
              className="App__input"
              defaultValue={1000}
            />
          </label>

          <button type="submit" className="App__button">Apply changes</button>
        </form>
      </div>
    );
  }
}

export default App;

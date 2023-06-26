/* eslint-disable max-len */
import React from 'react';
import './App.scss';
import Carousel from '../Carousel/Carousel';

interface AppState {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
}

class App extends React.Component<{}, AppState> {
  state: Readonly<AppState> = {
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

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="App__form">
          <label>
            {' Item width: '}
            <input
              type="number"
              defaultValue={itemWidth}
              min={50}
              max={200}
              step={10}
              onChange={(ev) => this.setState({ itemWidth: +ev.target.value })}
            />
          </label>

          <label>
            {'Frame size: '}
            <input
              type="number"
              defaultValue={3}
              min={1}
              max={10}
              onChange={(ev) => this.setState({ frameSize: +ev.target.value })}
            />
          </label>

          <label>
            {'Step: '}
            <input
              type="number"
              defaultValue={3}
              min={1}
              max={images.length}
              onChange={(ev) => this.setState({ step: +ev.target.value })}
            />
          </label>

          <label>
            {'Animation duration: '}
            <input
              type="number"
              defaultValue={500}
              min={500}
              max={5000}
              step={100}
              onChange={(ev) => this.setState({ animationDuration: +ev.target.value })}
            />
          </label>

          <label>
            {'Infinite: '}
            <input
              type="checkbox"
              onClick={() => this.setState({ infinite: !infinite })}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;

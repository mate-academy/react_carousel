import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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
    const width = itemWidth * frameSize + 10 * (frameSize - 1);

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
          infinite={infinite}
        />

        <form className="Options" style={{ width: `${width}px` }}>
          <h2 className="Options__title">Options</h2>

          <label>
            {'Images width: '}
            <input
              className="Options__field"
              type="number"
              min="50"
              max="500"
              defaultValue={itemWidth}
              onChange={(event) => {
                this.setState({ itemWidth: +event.currentTarget.value });
              }}
            />
          </label>

          <label>
            {'Number of images displayed: '}
            <input
              className="Options__field"
              type="number"
              min="1"
              max="10"
              defaultValue={frameSize}
              onChange={(event) => {
                this.setState({ frameSize: +event.currentTarget.value });
              }}
            />
          </label>

          <label>
            {'Number of images scrolled per click: '}
            <input
              className="Options__field"
              type="number"
              min="1"
              max="10"
              defaultValue={step}
              onChange={(event) => {
                this.setState({ step: +event.currentTarget.value });
              }}
            />
          </label>

          <label>
            {'Time in ms to show the new images: '}
            <input
              className="Options__field"
              type="number"
              min="100"
              max="10000"
              defaultValue={animationDuration}
              onChange={(event) => {
                this.setState({
                  animationDuration: +event.currentTarget.value,
                });
              }}
            />
          </label>

          <label>
            {'Carousel cyclic: '}
            <input
              type="checkbox"
              name="infinite"
              defaultChecked={infinite}
              onChange={(event) => {
                this.setState({ infinite: event.currentTarget.checked });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;

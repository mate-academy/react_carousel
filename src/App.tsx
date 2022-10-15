import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  infinite: boolean,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
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
    infinite: false,
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
      infinite,
    } = this.state;

    const stepInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
      if (typeof Number(event.currentTarget.value) === 'number') {
        if (Number(event.currentTarget.value) < images.length
          && Number(event.currentTarget.value) > 0) {
          this.setState({ step: Number(event.currentTarget.value) });
        }
      }
    };

    const infinitInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
      if (event.currentTarget.checked) {
        this.setState({ infinite: true });
      } else {
        this.setState({ infinite: false });
      }
    };

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="inputs">
          <div className="current-info">
            <span className="current-info__title">
              Current values:
            </span>

            <ul className="current-info__list">
              <li>
                Images:
                {images.length}
              </li>

              <li>
                Step:
                {step}
              </li>

              <li>
                Frame size:
                {frameSize}
              </li>

              <li>
                Item width:
                {itemWidth}
              </li>

              <li>
                Animation duration:
                {animationDuration}
              </li>
            </ul>
          </div>

          <label>
            Step:
            <input
              value={step}
              type="number"
              onChange={stepInputHandler}
            />
          </label>

          <label>
            Infinite:
            <input
              type="checkbox"
              onChange={infinitInputHandler}
            />
          </label>

          <label>
            {`Size of slider (from 1 to ${images.length})`}

            <input
              name="frameSize"
              min="1"
              max={images.length}
              value={frameSize}
              type="range"
              onChange={(event) => {
                if (typeof Number(event.target.value) === 'number') {
                  this.setState({ frameSize: Number(event.target.value) });
                }
              }}
            />
          </label>

          <label>
            Size of items (from 50 to 200)

            <input
              name="itemWidth"
              min="50"
              max="200"
              value={itemWidth}
              type="range"
              onChange={(event) => {
                if (typeof Number(event.target.value) === 'number') {
                  this.setState({ itemWidth: Number(event.target.value) });
                }
              }}
            />
          </label>

          <label>
            Animation duration (from 0.5s to 3s)

            <input
              name="frameSize"
              min="500"
              max="3000"
              step="100"
              value={animationDuration}
              type="range"
              onChange={(event) => {
                if (typeof Number(event.target.value) === 'number') {
                  this.setState({
                    animationDuration: Number(event.target.value),
                  });
                }
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
  };

  maxWidth = 200;

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    const { name } = event.target;

    switch (name) {
      case 'itemwidth': {
        this.setState(
          {
            itemWidth: value >= this.maxWidth
              ? this.maxWidth
              : value,
          },
        );
        break;
      }

      case 'framesize': {
        if (value >= 12) {
          value = 12;
        }

        this.setState(
          {
            frameSize: value < 0 ? 0 : value,
          },
        );
        break;
      }

      case 'step': {
        this.setState(
          {
            step: value >= 6
              ? 6
              : value,
          },
        );
        break;
      }

      default:
        break;
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
        />

        <div className="settings">
          <label>
            {`Width (Max: ${this.maxWidth})`}
            <input
              onChange={this.onChange}
              type="number"
              name="itemwidth"
              value={itemWidth}
            />
          </label>

          <label>
            Framesize (max 12):
            <input
              type="number"
              name="framesize"
              value={frameSize}
              onChange={this.onChange}
            />
          </label>

          <label>
            Step (max 6)
            <input
              type="number"
              name="step"
              value={step}
              onChange={this.onChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;

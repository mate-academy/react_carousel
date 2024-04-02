import React, { FocusEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface AppState {
  itemWidth: number | undefined;
  frameSize: number | undefined;
  step: number | undefined;
  animationDuration: number | undefined;
  images: string[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      itemWidth: 290,
      frameSize: 3,
      step: 3,
      animationDuration: 1000,
      images: [
        './img/2.png',
        './img/1.jpg',
        './img/9.jpg',
        './img/4.png',
        './img/6.jpg',
        './img/8.jpg',
        './img/3.jpg',
        './img/5.jpg',
        './img/7.jpg',
        './img/10.jpg',
      ],
    };
  }

  handleChange =
    (key: keyof AppState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value === '' ? '' : Number(event.target.value);

      this.setState(prevState => ({
        ...prevState,
        [key]: value,
      }));
    };

  handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.value = '';
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <div className="settings">
          <label>
            Item Width:
            <input
              type="number"
              value={itemWidth}
              onChange={this.handleChange('itemWidth')}
              onFocus={this.handleFocus}
              placeholder="type the value.."
            />
          </label>
          <label>
            Frame Size:
            <input
              type="number"
              value={frameSize}
              onChange={this.handleChange('frameSize')}
              onFocus={this.handleFocus}
              placeholder="type the value.."
            />
          </label>
          <label>
            Step:
            <input
              type="number"
              value={step}
              onChange={this.handleChange('step')}
              onFocus={this.handleFocus}
              placeholder="type the value.."
            />
          </label>
          <label>
            Animation Duration:
            <input
              type="number"
              value={animationDuration}
              onChange={this.handleChange('animationDuration')}
              onFocus={this.handleFocus}
              placeholder="type the value.."
            />
          </label>
        </div>

        <h1 className="title" data-cy>
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;

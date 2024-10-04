import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animDuration: 1000,
  };

  render() {
    const { images, step, frameSize, itemWidth, animDuration } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="field">
          <label htmlFor="itemId">Item Width:</label>
          <input
            id="itemId"
            type="text"
            value={itemWidth}
            onChange={event =>
              this.setState({ itemWidth: Number(event.target.value) })
            }
          />
        </div>

        <div className="field">
          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="text"
            value={frameSize}
            onChange={event =>
              this.setState({ frameSize: Number(event.target.value) })
            }
          />
        </div>

        <div className="field">
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="text"
            value={step}
            onChange={event =>
              this.setState({ step: Number(event.target.value) })
            }
          />
        </div>

        <div className="field">
          <label htmlFor="animDurationInput">Animation Duration (ms):</label>
          <input
            id="animDurationInput"
            type="text"
            value={animDuration}
            onChange={event =>
              this.setState({ animDuration: Number(event.target.value) })
            }
          />
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animDuration}
        />
      </div>
    );
  }
}

export default App;

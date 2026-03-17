import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
        <div className="input-container">
          <label htmlFor="itemId">itemWidth</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={event =>
              this.setState({ itemWidth: Number(event.target.value) })
            }
          />

          <label htmlFor="frameId">frameSize</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={event =>
              this.setState({ frameSize: Number(event.target.value) })
            }
          />

          <label htmlFor="stepId">step</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={event =>
              this.setState({ step: Number(event.target.value) })
            }
          />

          <label htmlFor="animationId">animationDuration</label>
          <input
            id="animationId"
            type="number"
            value={animationDuration}
            onChange={event =>
              this.setState({
                animationDuration: Number(event.target.value),
              })
            }
          />
        </div>
      </div>
    );
  }
}

export default App;

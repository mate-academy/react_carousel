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
  state: State = {
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
        <h1 data-cy="title">Carousel</h1>

        <div className="controls">
          <label>
            Item width:
            <input
              type="number"
              value={itemWidth}
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            />
          </label>

          <label>
            Frame size:
            <input
              type="number"
              value={frameSize}
              onChange={e => this.setState({ frameSize: +e.target.value })}
            />
          </label>

          <label>
            Step:
            <input
              type="number"
              value={step}
              onChange={e => this.setState({ step: +e.target.value })}
            />
          </label>

          <label>
            Animation duration (ms):
            <input
              type="number"
              value={animationDuration}
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;

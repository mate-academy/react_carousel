import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const itemWidthDefault = 130;
const frameSizeDefault = 3;
const stepDefault = 3;
const animationDurationDefault = 1000;
const infiniteDefault = false;

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
    step: stepDefault,
    frameSize: frameSizeDefault,
    itemWidth: itemWidthDefault,
    animationDuration: animationDurationDefault,
    infinite: infiniteDefault,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          Carousel{images.length > 0 && ` with ${images.length} images`}
        </h1>

        <div className="App__inputs">
          <label htmlFor="itemId">Item width</label>
          <input
            type="number"
            name="itemWidth"
            id="itemId"
            value={itemWidth}
            onChange={e =>
              this.setState((previousState: State) => ({
                ...previousState,
                itemWidth: Number(e.target.value),
              }))
            }
            min={1}
          />
          <br />

          <label htmlFor="frameId">Frame Size</label>
          <input
            type="number"
            name="frameSize"
            id="frameId"
            value={frameSize}
            onChange={e =>
              this.setState((previousState: State) => ({
                ...previousState,
                frameSize: Number(e.target.value),
              }))
            }
            min={1}
            max={images.length - step}
          />
          <br />

          <label htmlFor="stepId">Step</label>
          <input
            type="number"
            name="step"
            id="stepId"
            value={step}
            onChange={e =>
              this.setState((previousState: State) => ({
                ...previousState,
                step: Number(e.target.value),
              }))
            }
            min={1}
            max={images.length - frameSize}
          />
          <br />

          <label htmlFor="animationDuration">Animation duration</label>
          <input
            type="number"
            name="animationDuration"
            id="animationDuration"
            value={animationDuration}
            onChange={e =>
              this.setState((previousState: State) => ({
                ...previousState,
                animationDuration: Number(e.target.value),
              }))
            }
            min={1}
          />
          <br />

          <div>
            <label htmlFor="infinite">Infite</label>
            <input
              type="checkbox"
              name="infinite"
              id="infinite"
              checked={infinite}
              onChange={() =>
                this.setState((previousState: State) => ({
                  ...previousState,
                  infinite: !infinite,
                }))
              }
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

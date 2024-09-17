import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="setState">
          <div>
            <label htmlFor="itemId">Set Item Width:&nbsp;</label>
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={e => this.setState({ itemWidth: +e.target.value })}
            ></input>
          </div>
          <div>
            <label htmlFor="frameId">Set Frame Size:&nbsp;</label>
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={e => this.setState({ frameSize: +e.target.value })}
            ></input>
          </div>
          <div>
            <label htmlFor="stepId">Set Step:&nbsp;</label>
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={e => this.setState({ step: +e.target.value })}
            ></input>
          </div>
          <div>
            <label htmlFor="animationDuration">
              Set Animation Duration:&nbsp;
            </label>
            <input
              id="animationDuration"
              type="number"
              value={animationDuration}
              onChange={e =>
                this.setState({ animationDuration: +e.target.value })
              }
            ></input>
          </div>
          <div>
            <label htmlFor="infinite">Set Infinite:&nbsp;</label>
            <input
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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

    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form
          action=""
          style={{
            width: `${itemWidth + itemWidth}px`,

            display: 'flex',
            flexDirection: 'column',
            margin: 10,
          }}
        >
          <label htmlFor="itemId">Item Width:</label>
          <input
            id="itemId"
            type="number"
            value={this.state.itemWidth}
            onChange={e => this.setState({ itemWidth: Number(e.target.value) })}
          />

          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="number"
            value={this.state.frameSize}
            onChange={e => this.setState({ frameSize: Number(e.target.value) })}
          />

          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={this.state.step}
            onChange={e => this.setState({ step: Number(e.target.value) })}
          />
        </form>

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

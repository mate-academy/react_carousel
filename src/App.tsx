import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          type="number"
          placeholder="Step"
          onChange={event =>
            this.setState({ step: Number(event.target.value) })
          }
          value={this.state.step}
          min={1}
        />

        <label htmlFor="frameId">Size of frame</label>
        <input
          id="frameId"
          type="number"
          placeholder="Size of frame"
          onChange={event =>
            this.setState({ frameSize: Number(event.target.value) })
          }
          value={this.state.frameSize}
          min={1}
        />

        <label htmlFor="itemId">Width of item</label>
        <input
          id="itemId"
          type="number"
          placeholder="Width of item"
          onChange={event =>
            this.setState({ itemWidth: Number(event.target.value) })
          }
          value={this.state.itemWidth}
          min={130}
          step={10}
        />

        <Carousel
          images={images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={1000}
        />
      </div>
    );
  }
}

export default App;

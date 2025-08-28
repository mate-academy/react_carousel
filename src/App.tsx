import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
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
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="form">
          <label htmlFor="width">Width: </label>
          <input
            type="number"
            id="width"
            value={this.state.itemWidth}
            onChange={e => this.setState({ itemWidth: Number(e.target.value) })}
          />
          <label htmlFor="frameSize">FrameSize: </label>
          <input
            type="number"
            id="frameSize"
            value={this.state.frameSize}
            onChange={e => this.setState({ frameSize: Number(e.target.value) })}
          />
          <label htmlFor="step">Step: </label>
          <input
            type="number"
            id="step"
            value={this.state.step}
            onChange={e => this.setState({ step: Number(e.target.value) })}
          />
          <label htmlFor="animationDuration">Animation Duration: </label>
          <input
            type="number"
            id="animationDuration"
            value={this.state.animationDuration}
            onChange={e =>
              this.setState({ animationDuration: Number(e.target.value) })
            }
          />
        </form>

        <Carousel
          images={images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          step={this.state.step}
          animationDuration={this.state.animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;

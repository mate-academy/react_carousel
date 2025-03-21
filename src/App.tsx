import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <label htmlFor="itemId">
          itemWidth
          <input
            value={itemWidth}
            id="itemId"
            onChange={el =>
              this.setState({ itemWidth: Number(el.target.value) })
            }
            name="itemWidth"
            type="number"
          />
        </label>
        <label htmlFor="frameId">
          {' '}
          frameSize
          <input
            value={frameSize}
            id="frameId"
            onChange={el =>
              this.setState({ frameSize: Number(el.target.value) })
            }
            name="frameSize"
            min={0}
            max={images.length}
            type="number"
          />
        </label>
        <label htmlFor="stepId">
          {' '}
          step
          <input
            value={step}
            onChange={el => this.setState({ step: Number(el.target.value) })}
            name="step"
            id="stepId"
            min={0}
            type="number"
          />
        </label>
        <label htmlFor="animationDurationId">
          {' '}
          animationDuration
          <input
            value={animationDuration}
            id="animationDurationId"
            onChange={el =>
              this.setState({ animationDuration: Number(el.target.value) })
            }
            name="animationDuration"
            type="number"
          />
        </label>
        <label htmlFor="infiniteId">
          {' '}
          infinite
          <input
            checked={this.state.infinite}
            id="infiniteId"
            onChange={el => this.setState({ infinite: el.target.checked })}
            name="infinite"
            type="checkbox"
          />
        </label>

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

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
    infinite: false,
  };

  handleChange = <K extends keyof State>(field: K, value: State[K]) => {
    this.setState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>

        <label htmlFor="itemId">Item width</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={e => this.handleChange('itemWidth', +e.target.value)}
        />

        <label htmlFor="frameId">Frame size</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={e => this.handleChange('frameSize', +e.target.value)}
        />

        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={e => this.handleChange('step', +e.target.value)}
        />

        <label htmlFor="durationId">Animation Duration</label>
        <input
          id="durationId"
          type="number"
          value={animationDuration}
          onChange={e =>
            this.handleChange('animationDuration', +e.target.value)
          }
        />

        <label htmlFor="infiniteId">Infinite</label>
        <input
          id="infiniteId"
          type="checkbox"
          checked={infinite}
          onChange={e => this.handleChange('infinite', e.target.checked)}
        />

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;

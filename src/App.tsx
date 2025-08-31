import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  currentStep: number;
  itemWidth: number;
  currentSize: number;
  currentDuration: number;
  currentInfinite: boolean;
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
    currentStep: 3,
    currentSize: 3,
    itemWidth: 130,
    currentDuration: 1000,
    currentInfinite: false,
  };

  componentDidMount() {
    document.title = 'React Carousel';
  }

  render() {
    const {
      images,
      currentStep,
      itemWidth,
      currentSize,
      currentDuration,
      currentInfinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={[...this.state.images]}
          step={currentStep}
          frameSize={currentSize}
          itemWidth={itemWidth}
          animationDuration={currentDuration}
          infinite={currentInfinite}
        />

        <label htmlFor="stepId">itemStep</label>
        <input
          id="stepId"
          type="number"
          min="1"
          max={images.length}
          defaultValue={currentStep}
          onChange={e => {
            const val = Number(e.target.value);

            this.setState({
              currentStep: Math.min(Math.max(1, val), images.length),
            });
          }}
        />

        <label htmlFor="frameId">frameSize</label>
        <input
          id="frameId"
          type="number"
          min="1"
          max={images.length}
          defaultValue={currentSize}
          onChange={e => {
            const val = Number(e.target.value);

            this.setState({
              currentSize: Math.min(Math.max(1, val), images.length),
            });
          }}
        />

        <label htmlFor="itemId">itemWidth</label>
        <input
          id="itemId"
          type="number"
          min="1"
          defaultValue={itemWidth}
          onChange={e => {
            const val = Number(e.target.value);

            this.setState({ itemWidth: Math.max(1, val) });
          }}
        />

        <label htmlFor="animationDuration">Animation Duration</label>
        <input
          id="animationDuration"
          type="number"
          min="1"
          defaultValue={currentDuration}
          onChange={e => {
            const val = Number(e.target.value);

            this.setState({ currentDuration: Math.max(1, val) });
          }}
        />

        <label htmlFor="isInfinite">Infinite</label>
        <input
          id="isInfinite"
          type="checkbox"
          checked={currentInfinite}
          onChange={e => this.setState({ currentInfinite: e.target.checked })}
        />
      </div>
    );
  }
}

export default App;

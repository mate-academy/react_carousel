import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: string;
  frameSize: string;
  itemWidth: string;
  animationDuration: string;
  isInfinite: boolean;
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
    step: '3',
    frameSize: '3',
    itemWidth: '130',
    animationDuration: '1000',
    isInfinite: true,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [id]: Number(value),
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      isInfinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={isInfinite}

        />

        <form className="imput-container">
          <div className="imput-container__items">
            <label htmlFor="itemId">Item-width</label>
            <input
              type="number"
              name="itemWidth"
              id="itemId"
              value={itemWidth}
              onChange={e =>
                this.setState({ ...this.state, itemWidth: e.target.value })
              }
            />
          </div>

          <div className="imput-container__items">
            <label htmlFor="frameId">Frame-size</label>
            <input
              type="number"
              name="frameSize"
              id="frameId"
              value={frameSize}
              onChange={e =>
                this.setState({ ...this.state, frameSize: e.target.value })
              }
            />
          </div>

          <div className="imput-container__items">
            <label htmlFor="stepId">Step</label>
            <input
              type="number"
              name="step"
              id="stepId"
              value={step}
              onChange={e =>
                this.setState({ ...this.state, step: e.target.value })
              }
            />
          </div>

          <div className="imput-container__items">
            <label htmlFor="animationDuration">Animation-duration</label>
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              value={animationDuration}
              onChange={e =>
                this.setState({
                  ...this.state,
                  animationDuration: e.target.value,
                })
              }
            />
          </div>

          <div className="imput-container__items">
            <label htmlFor="isInfinite">Infinite</label>
            <input
              type="checkbox"
              name="Infinite"
              id="Infinite"
              checked={isInfinite}
              onChange={e =>
                this.setState({ ...this.state, isInfinite: e.target.checked })
              }
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;

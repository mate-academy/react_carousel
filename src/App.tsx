import React from 'react';
import Carousel from './components/Carousel';

import './App.scss';

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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    const handleChangeStep = (e: React.FormEvent<HTMLInputElement>) => {
      this.setState({ step: Number(e.currentTarget.value) });
    };

    const handleChangeFrameSize = (e: React.FormEvent<HTMLInputElement>) => {
      this.setState({ frameSize: Number(e.currentTarget.value) });
    };

    const handleChangeItemWidth = (e: React.FormEvent<HTMLInputElement>) => {
      this.setState({ itemWidth: Number(e.currentTarget.value) });
    };

    const handleChangeAnimationDuration
      = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ animationDuration: Number(e.currentTarget.value) });
      };

    const handleChangeInfinite = (e: React.FormEvent<HTMLInputElement>) => {
      this.setState({ infinite: e.currentTarget.checked });
    };

    return (
      <div className="App">
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <form className="App__settings">
          <fieldset>
            <legend>Settings:</legend>
            <div>
              <label htmlFor="step">Step:</label>
              <input
                id="step"
                name="step"
                type="number"
                min="1"
                max={images.length - 1}
                value={step}
                onChange={handleChangeStep}
              />
            </div>

            <div>
              <label htmlFor="step">Frame size:</label>
              <input
                id="frameSize"
                name="frameSize"
                type="number"
                min="1"
                max={images.length}
                value={frameSize}
                onChange={handleChangeFrameSize}
              />
            </div>

            <div>
              <label htmlFor="step">Item width:</label>
              <input
                id="itemWidth"
                name="itemWidth"
                type="number"
                min="1"
                value={itemWidth}
                onChange={handleChangeItemWidth}
              />
            </div>

            <div>
              <label htmlFor="step">Animation duration:</label>
              <input
                id="animationDuration"
                name="animationDuration"
                type="number"
                min="0"
                value={animationDuration}
                onChange={handleChangeAnimationDuration}
              />
            </div>

            <div>
              <label htmlFor="step">Infinite:</label>
              <input
                id="infinite"
                name="infinite"
                type="checkbox"
                checked={infinite}
                onChange={handleChangeInfinite}
              />
            </div>
          </fieldset>
        </form>

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

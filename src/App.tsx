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

    const onChangeItemWidth = (e: React.FormEvent<HTMLInputElement>) => {
      this.setState({
        itemWidth: parseInt(e.currentTarget.value, 10),
      });
    };

    const onChangeFrameSize = (e: React.FormEvent<HTMLInputElement>) => {
      this.setState({
        frameSize: parseInt(e.currentTarget.value, 10),
      });
    };

    const onChangeSteps = (e: React.FormEvent<HTMLInputElement>) => {
      this.setState({
        step: parseInt(e.currentTarget.value, 10),
      });
    };

    const onChangeAnimation = (e: React.FormEvent<HTMLInputElement>) => {
      this.setState({
        animationDuration: parseInt(e.currentTarget.value, 10),
      });
    };

    const onChangeInfinite = () => {
      this.setState({
        infinite: !infinite,
      });
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form className="form App__form" onSubmit={e => e.preventDefault()}>
          <label className="form__label" htmlFor="itemId">
            Smiles&#39; size:{' '}
            <input
              className="form__input"
              id="itemId"
              name="itemWidth"
              type="number"
              step={1}
              min={50}
              value={itemWidth}
              onChange={onChangeItemWidth}
            />
          </label>
          <label className="form__label" htmlFor="frameId">
            Smiles on page:{' '}
            <input
              className="form__input"
              id="frameId"
              type="number"
              value={frameSize}
              step={1}
              min={1}
              max={images.length}
              onChange={onChangeFrameSize}
            />
          </label>
          <label className="form__label" htmlFor="stepId">
            Steps on click:{' '}
            <input
              className="form__input"
              id="stepId"
              type="number"
              value={step}
              step={1}
              min={1}
              max={images.length}
              onChange={onChangeSteps}
            />
          </label>
          <label className="form__label" htmlFor="fnimationDuration">
            Animation duration:{' '}
            <input
              className="form__input"
              id="fnimationDuration"
              type="number"
              step={1}
              min={300}
              value={animationDuration}
              onChange={onChangeAnimation}
            />
          </label>
          <label className="form__label" htmlFor="infinite">
            Infinite:{' '}
            <input
              className="form__input"
              id="infinite"
              type="checkbox"
              onChange={onChangeInfinite}
            />
          </label>
        </form>

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

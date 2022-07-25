import React from 'react';
import './App.scss';
import { ValuesType } from './Types/ValuesType';
import Carousel from './components/Carousel';

class App extends React.Component<{}, ValuesType> {
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

  setItemWidth = (value: number) => {
    this.setState({ itemWidth: value });
  };

  setFrameSize = (value: number) => {
    this.setState({ frameSize: value });
  };

  setStep = (value: number) => {
    this.setState({ step: value });
  };

  setAimationDuration = (value: number) => {
    this.setState({ animationDuration: value });
  };

  changeCheckbox = () => {
    this.setState((prevState) => ({ infinite: !prevState.infinite }));
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

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          action="#"
          method="get"
          className="Form"
        >
          <h3>Choose own carousel size</h3>

          <label htmlFor="ItemWidth">
            Item Width:&nbsp;
            <input
              type="number"
              id="ItemWidth"
              name="ItemWidth"
              defaultValue={itemWidth}
              min="130"
              max="500"
              onChange={({ target }) => {
                this.setItemWidth(+target.value);
              }}
            />
          </label>

          <label htmlFor="FrameSize">
            Frame Size:&nbsp;
            <input
              type="number"
              id="FrameSize"
              name="FrameSize"
              defaultValue={frameSize}
              min="1"
              max="10"
              onChange={({ target }) => {
                this.setFrameSize(+target.value);
              }}
            />
          </label>

          <label htmlFor="Step">
            Step:&nbsp;
            <input
              type="number"
              id="Step"
              name="Step"
              defaultValue={step}
              min="1"
              max="10"
              onChange={({ target }) => {
                this.setStep(+target.value);
              }}
            />
          </label>

          <label htmlFor="AnimationDuration">
            Animation Duration:&nbsp;
            <input
              type="number"
              id="AnimationDuration"
              name="AnimationDuration"
              defaultValue={animationDuration}
              min="500"
              max="10000"
              onChange={({ target }) => {
                this.setAimationDuration(+target.value);
              }}
            />
          </label>

          <label htmlFor="infinite">
            Infinite&nbsp;
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              defaultChecked={infinite}
              onClick={this.changeCheckbox}
            />
          </label>

        </form>
      </div>
    );
  }
}

export default App;

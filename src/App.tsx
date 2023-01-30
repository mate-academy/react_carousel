import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import 'bulma/css/bulma.min.css';

interface State {
  images: string[];
  ItemWidth: number;
  FrameSize: number;
  Step: number;
  AnimationDuration: number;
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
    ItemWidth: 130,
    FrameSize: 3,
    Step: 3,
    AnimationDuration: 1000,
  };

  render() {
    const {
      images,
      ItemWidth,
      FrameSize,
      Step,
      AnimationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title title is-1" data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={Step}
          frameSize={FrameSize}
          itemWidth={ItemWidth}
          animationDuration={AnimationDuration}
          infinite={false}
        />

        <form
          action="/"
          method="POST"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="field">
            <label
              htmlFor="itemWidth"
              className="label"
            >
              Item Width:
            </label>
            <input
              id="itemWidth"
              className="input"
              type="number"
              name="ItemWidth"
              placeholder="Enter an item Width"
              value={ItemWidth}
              onChange={(event) => {
                this.setState({
                  ItemWidth: +event.target.value,
                });
              }}
            />
          </div>

          <div className="field">
            <label
              htmlFor="frameSize"
              className="label"
            >
              Frame Size
            </label>
            <input
              id="frameSize"
              className="input"
              type="number"
              name="FrameSize"
              placeholder="Enter a Frame Size"
              value={FrameSize}
              onChange={event => {
                this.setState({
                  FrameSize: +event.target.value,
                });
              }}
            />
          </div>

          <div className="field">
            <label
              htmlFor="step"
              className="label"
            >
              Step:
            </label>
            <input
              id="step"
              className="input"
              type="number"
              name="Step"
              placeholder="Enter Step"
              value={Step}
              onChange={event => {
                this.setState({
                  Step: +event.target.value,
                });
              }}
            />
          </div>

          <div className="field">
            <label
              htmlFor="animationDuration"
              className="label"
            >
              AnimationDuration:
            </label>
            <input
              id="animationDuration"
              className="input"
              type="number"
              name="AnimationDuration"
              placeholder="Enter an Animation Duration"
              value={AnimationDuration}
              onChange={event => {
                this.setState({
                  AnimationDuration: +event.target.value,
                });
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;

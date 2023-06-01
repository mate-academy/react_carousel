import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
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

    return (
      <div className="App">
        <h1
          data-cy="title"
          className="App__title"
        >
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
          className="App__form"
          method="get"
        >
          <label
            htmlFor="itemWidth"
            className="App__form-label"
          >
            Item width:

            <input
              type="number"
              id="itemWidth"
              name="itemWidth"
              className="App__form-item-input input"
              defaultValue="130"
              min="0"
              onChange={(e) => {
                this.setState({ itemWidth: +e.target.value });
              }}
            />
          </label>

          <label
            htmlFor="frameSize"
            className="App__form-label"
          >
            Frame Size:

            <input
              type="number"
              id="frameSize"
              name="frameSize"
              className="App__form-frame-input input"
              defaultValue="3"
              min="1"
              max="10"
              onChange={(e) => {
                this.setState({ frameSize: +e.target.value });
              }}
            />
          </label>

          <label
            htmlFor="step"
            className="App__form-label"
          >
            Step:

            <input
              type="number"
              id="step"
              name="step"
              className="App__form-step-input input"
              defaultValue="3"
              min="1"
              max="7"
              onChange={(e) => {
                this.setState({ step: +e.target.value });
              }}
            />
          </label>

          <label
            htmlFor="animationDuration"
            className="App__form-label"
          >
            Animation duration:

            <input
              type="number"
              id="animationDuration"
              name="animationDuration"
              className="App__form-animation-input input"
              defaultValue="1000"
              onChange={(e) => {
                this.setState({ animationDuration: +e.target.value });
              }}
            />
          </label>

          <label
            htmlFor="infinite"
            className="App__form-label"
          >
            infinite:

            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              className="App__form-infinite-input input"
              defaultValue="false"
              onChange={() => {
                return infinite
                  ? this.setState({ infinite: false })
                  : this.setState({ infinite: true });
              }}
            />
          </label>
        </form>

      </div>
    );
  }
}

export default App;

import { Component } from 'react';
import './App.scss';
import { Carousel } from '../Carousel';

interface State {
  images: string[];
  step: string;
  frameSize: string;
  itemWidth: string;
  animationDuration: string;
  infinite: boolean;
}

class App extends Component<{}, State> {
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
    infinite: false,
    frameSize: '3',
    itemWidth: '130',
    animationDuration: '1000',
    step: '3',
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

    const carouselTitle = `Carousel with ${images.length} images`;

    return (
      <div className="app">
        <h1 data-cy="title" className="app__title">{carouselTitle}</h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          step={step}
        />

        <div className="app__settings-container">
          <label
            htmlFor="item-width"
            className="app__settings-block"
          >
            <p className="app__settings-title">Item width:</p>
            <input
              className="app__input"
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={(event) => {
                this.setState({ itemWidth: event.currentTarget.value });
              }}
            />
          </label>

          <label
            htmlFor="frame-size"
            className="app__settings-block"
          >
            <p className="app__settings-title">Frame size:</p>
            <input
              className="app__input"
              type="number"
              name="frameSize"
              max={5}
              min={1}
              value={frameSize}
              onChange={(event) => {
                this.setState({ frameSize: event.currentTarget.value });
              }}
            />
          </label>

          <label
            htmlFor="animation-duration"
            className="app__settings-block"
          >
            <p className="app__settings-title">Animation duration:</p>
            <input
              className="app__input"
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={(event) => {
                this.setState({ animationDuration: event.currentTarget.value });
              }}
            />
          </label>

          <label
            htmlFor="step"
            className="app__settings-block"
          >
            <p className="app__settings-title">Step:</p>
            <input
              className="app__input"
              type="number"
              name="step"
              max={5}
              min={1}
              value={step}
              onChange={(event) => {
                this.setState({ step: event.currentTarget.value });
              }}
            />
          </label>

          <label
            htmlFor="infinite"
            className="app__settings-block"
          >
            <p className="app__settings-title">Infinite carousel:</p>
            <input
              className="app__input-checkbox"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={() => {
                this.setState(prevState => {
                  return {
                    infinite: !prevState.infinite,
                  };
                });
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;

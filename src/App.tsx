import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  firstVisibleImage: number;
  animationDuration: number;
  infinite: boolean;
  resizing: boolean;
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
    firstVisibleImage: 0,
    animationDuration: 1000,
    infinite: false,
    resizing: false,
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: +event.target.value,
      resizing: true,
    });

    setTimeout(() => {
      this.setState({ resizing: false });
    }, 100);
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      frameSize: +event.target.value,
      firstVisibleImage: 0,
    }));
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handleAnimationDurationChange =
  (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  handleInfiniteChange = () => {
    this.setState((prevState) => ({ infinite: !prevState.infinite }));
  };

  handleNextClickChange = () => {
    this.setState((prevState) => {
      const lastImages = prevState.images.length - prevState.frameSize;
      const newFirstVisibleImage = prevState.firstVisibleImage + prevState.step;

      if (newFirstVisibleImage < lastImages) {
        return {
          firstVisibleImage: newFirstVisibleImage,
        };
      }

      if (newFirstVisibleImage > lastImages && !prevState.infinite) {
        return {
          firstVisibleImage: lastImages,
        };
      }

      return {
        firstVisibleImage: 0,
      };
    });
  };

  handlePrevClickChange = () => {
    this.setState((prevState) => {
      const lastImages = prevState.images.length - prevState.frameSize;
      const newFirstVisibleImage = prevState.firstVisibleImage - prevState.step;

      if (newFirstVisibleImage >= 0) {
        return {
          firstVisibleImage: newFirstVisibleImage,
        };
      }

      if (newFirstVisibleImage < 0 && !prevState.infinite) {
        return {
          firstVisibleImage: 0,
        };
      }

      return {
        firstVisibleImage: lastImages,
      };
    });
  };

  render() {
    const {
      images, itemWidth, frameSize, step,
      firstVisibleImage, animationDuration,
      infinite, resizing,
    } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="App__settings">
          <label className="App__label">
            Item width
            <input
              className="App__input"
              type="number"
              value={itemWidth}
              min="50"
              max="350"
              step="10"
              onChange={this.handleItemWidthChange}
            />
          </label>

          <label className="App__label">
            Frame size
            <input
              className="App__input"
              type="number"
              value={frameSize}
              min="1"
              max="10"
              onChange={this.handleFrameSizeChange}
            />
          </label>

          <label className="App__label">
            Step
            <input
              className="App__input"
              type="number"
              min="1"
              max={frameSize}
              value={step}
              onChange={this.handleStepChange}
            />
          </label>

          <label className="App__label">
            Animation duration
            <input
              className="App__input"
              type="number"
              value={animationDuration}
              min="0"
              max="5000"
              step="500"
              onChange={this.handleAnimationDurationChange}
            />
          </label>

          <label className="App__label">
            Infinite
            <input
              className="App__checkbox"
              type="checkbox"
              value="Infinite"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </label>

        </div>

        <Carousel
          images={images}
          width={itemWidth}
          frameSize={frameSize}
          firstVisibleImage={firstVisibleImage}
          nextClick={this.handleNextClickChange}
          prevClick={this.handlePrevClickChange}
          animationDuration={animationDuration}
          infinite={infinite}
          resizing={resizing}
        />
      </div>
    );
  }
}

export default App;

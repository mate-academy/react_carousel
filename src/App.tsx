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
  carouselWidth: number;
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
    carouselWidth: 0,
  };

  handleNextClick = () => {
    this.setState(prev => {
      const { carouselWidth, step, itemWidth, images, infinite, frameSize } =
        prev;
      const maxCarouselWidth =
        images.length * itemWidth - frameSize * itemWidth;
      const newWidth = carouselWidth + step * itemWidth;

      if (infinite) {
        return {
          ...prev,
          carouselWidth: newWidth > maxCarouselWidth ? 0 : newWidth,
        };
      } else {
        return {
          ...prev,
          carouselWidth: Math.min(newWidth, maxCarouselWidth),
        };
      }
    });
  };

  handlePrevClick = () => {
    this.setState(prev => {
      const { carouselWidth, step, itemWidth, images, infinite, frameSize } =
        prev;
      const maxCarouselWidth =
        images.length * itemWidth - frameSize * itemWidth;
      const newWidth = carouselWidth - step * itemWidth;

      if (infinite) {
        return {
          ...prev,
          carouselWidth: newWidth < 0 ? maxCarouselWidth : newWidth,
        };
      } else {
        return {
          ...prev,
          carouselWidth: Math.max(newWidth, 0),
        };
      }
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
      carouselWidth,
    } = this.state;

    document.title = 'Carousel';

    const maxCarouselWidth = images.length * itemWidth - frameSize * itemWidth;

    const isPrevDisabled =
      !(images.length > frameSize) || (!infinite && carouselWidth === 0);
    const isNextDisabled =
      !(images.length > frameSize) ||
      (!infinite && carouselWidth >= maxCarouselWidth);

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="inputs-group">
          <label htmlFor="itemId">Item Width</label>
          <input
            id="itemId"
            type="number"
            placeholder="Item width (130px by default)"
            value={itemWidth}
            onChange={event =>
              this.setState({ itemWidth: +event.target.value })
            }
            min="1"
          />

          <label htmlFor="frameId">Frame Size</label>
          <input
            id="frameId"
            type="number"
            placeholder="Frame Size (3 by default)"
            value={frameSize}
            onChange={event =>
              this.setState({ frameSize: +event.target.value })
            }
            min="1"
          />

          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            type="number"
            placeholder="Step (3 by default)"
            value={step}
            onChange={event => this.setState({ step: +event.target.value })}
            min="1"
          />

          <label htmlFor="animationDuration">Animation Duration</label>
          <input
            id="animationDuration"
            type="number"
            placeholder="Animation Duration (1000 by default)"
            value={animationDuration}
            onChange={event =>
              this.setState({ animationDuration: +event.target.value })
            }
            min="500"
          />

          <label htmlFor="infinite">Infinite</label>
          <input
            id="infinite"
            type="checkbox"
            checked={infinite}
            onChange={event =>
              this.setState({ infinite: event.target.checked })
            }
          />
        </div>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
          carouselWidth={carouselWidth}
        />

        <button
          type="button"
          onClick={this.handlePrevClick}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={this.handleNextClick}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    );
  }
}

export default App;

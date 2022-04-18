import React from 'react';
import './Carousel.scss';

type State = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  scroll: number;
};

type Props = {
  images: string[];
};

export class Carousel extends React.Component<Props, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    scroll: 0,
  };

  clickNextButton = () => {
    const {
      scroll,
      frameSize,
      infinite,
      step,
    } = this.state;
    const { images } = this.props;

    if (scroll === images.length - frameSize && infinite) {
      this.setState({ scroll: 0 });
    } else if (scroll + step >= images.length - frameSize) {
      this.setState({ scroll: images.length - frameSize });
    } else {
      this.setState((state) => {
        return { scroll: state.scroll + state.step };
      });
    }
  };

  clickPrevButton = () => {
    const {
      scroll,
      frameSize,
      infinite,
      step,
    } = this.state;
    const { images } = this.props;

    if (scroll === 0 && infinite) {
      this.setState({ scroll: images.length - frameSize });
    } else if (scroll - step < 0) {
      this.setState({ scroll: 0 });
    } else {
      this.setState((state) => {
        return { scroll: state.scroll - state.step };
      });
    }
  };

  isInfinite = () => {
    if (this.state.infinite) {
      this.setState({ infinite: false });
    } else {
      this.setState({ infinite: true });
    }
  };

  render() {
    const { images } = this.props;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      scroll,
    } = this.state;

    const carouselListStyles = {
      marginLeft: `-${scroll * itemWidth}px`,
      transition: `${animationDuration}ms`,
    };

    const carouselStyle = {
      width: `${itemWidth * frameSize}px`,
    };

    return (
      <>
        <div className="carousel">

          <button
            type="button"
            className="button"
            disabled={scroll <= 0 && !infinite}
            onClick={this.clickPrevButton}
          >
            Previous
          </button>

          <div
            className="carousel__container"
            style={carouselStyle}
          >
            <ul
              className="carousel__list"
              style={carouselListStyles}
            >
              {images.map((image) => (
                <li key={image} className="carousel__item">
                  <img
                    className="carousel__image"
                    src={`${image}`}
                    alt={`${image.replace(/\D/g, '')}`}
                    width={itemWidth}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="button"
            disabled={scroll + frameSize >= images.length && !infinite}
            onClick={this.clickNextButton}
          >
            Next
          </button>

        </div>

        <form className="form">
          <label htmlFor="step">
            Step:
            <input
              type="number"
              name="step"
              id="step"
              min={1}
              max={images.length}
              step={1}
              value={step}
              onChange={(event) => {
                this.setState(
                  { step: +event.target.value },
                );
              }}
            />
          </label>

          <label htmlFor="frameSize">
            Frame Size:
            <input
              type="range"
              name="frameSize"
              id="frameSize"
              min={1}
              max={images.length}
              value={frameSize}
              onChange={(event) => {
                this.setState(
                  { frameSize: +event.target.value },
                );
              }}
            />
          </label>

          <label htmlFor="itemWidth">
            Image width:
            <input
              type="range"
              name="itemWidth"
              id="itemWidth"
              min={10}
              max={260}
              value={itemWidth}
              onChange={(event) => {
                this.setState(
                  { itemWidth: +event.target.value },
                );
              }}
            />
          </label>

          <label htmlFor="animationDuration">
            Animation Duration:
            <input
              type="number"
              name="animationDuration"
              id="animationDuration"
              min={0}
              max={10000}
              value={animationDuration}
              onChange={(event) => {
                this.setState(
                  { animationDuration: +event.target.value },
                );
              }}
            />
          </label>

          <label htmlFor="infinite">
            Infinite:
            <input
              type="checkbox"
              name="infinite"
              id="infinite"
              value="infinite"
              checked={infinite}
              onChange={this.isInfinite}
            />
          </label>
        </form>
      </>
    );
  }
}

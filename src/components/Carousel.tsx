import React from 'react';
import './Carousel.scss';

interface State {
  scroll: number,
  step: number,
  itemWidth: number,
  frameSize: number,
  animationDuration: number,
}

type Props = {
  images: string[]
};

export class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
    step: 3,
    itemWidth: 130,
    frameSize: 3,
    animationDuration: 1000,
  };

  scrollRight = () => {
    const { scroll, step } = this.state;

    this.setState(() => {
      return (
        {
          scroll: scroll + step,
        }
      );
    });
  };

  scrollLeft = () => {
    const { scroll, step } = this.state;

    this.setState(() => {
      return (
        {
          scroll: scroll - step,
        }
      );
    });
  };

  render() {
    const {
      scroll,
      itemWidth,
      step,
      frameSize,
      animationDuration,
    } = this.state;

    const { images } = this.props;

    const carouselListStyles = {
      marginLeft: `-${scroll * itemWidth}px`,
      transition: `${animationDuration}ms`,
    };

    const carouselStyles = {
      width: `${frameSize * itemWidth}px`,
    };

    return (
      <>
        <div
          className="Carousel"
        >
          <button
            type="button"
            disabled={scroll <= 0}
            className="Carousel__button Carousel__button--prev"
            onClick={() => {
              this.scrollLeft();
            }}
          >
            {'<'}
          </button>
          <div
            className="Carousel__container"
            style={carouselStyles}
          >
            <ul
              className="Carousel__list"
              style={carouselListStyles}
            >
              {images.map((image, index) => (
                <li
                  key={image}
                  className="Carousel__item"
                  style={{ width: itemWidth, height: itemWidth }}
                >
                  <img
                    src={image}
                    alt={index.toString()}
                    style={{ width: itemWidth, height: itemWidth }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="Carousel__button Carousel__button--next"
            disabled={scroll + frameSize >= images.length}
            onClick={() => {
              this.scrollRight();
            }}
          >
            { '>' }
          </button>
        </div>
        <div>
          <form
            action=""
            className="Carousel__settings"
          >
            <label
              htmlFor="size"
            >
              Size:
              {' '}
              <input
                id="size"
                name="size"
                type="range"
                min={50}
                max={250}
                value={itemWidth}
                onChange={(event) => {
                  this.setState(() => {
                    return {
                      itemWidth: +event.target.value,
                    };
                  });
                }}
              />
            </label>
            <label htmlFor="size">
              FrameSize:
              {' '}
              <input
                id="frameSize"
                name="frameSize"
                type="range"
                min={1}
                max={images.length}
                value={frameSize}
                onChange={(event) => {
                  this.setState({
                    frameSize: +event.target.value,
                  });
                }}
              />
            </label>
            <label htmlFor="size">
              Step:
              {' '}
              <input
                id="step"
                name="step"
                type="number"
                min={1}
                max={images.length}
                value={step}
                onChange={(event) => {
                  this.setState({
                    step: +event.target.value,
                  });
                }}
              />
            </label>
            <label htmlFor="size">
              AnimationDuration:
              {' '}
              <input
                id="animationDuration"
                name="animationDuration"
                type="number"
                min={0}
                max={10000}
                step={100}
                value={animationDuration}
                onChange={(event) => {
                  this.setState({
                    animationDuration: +event.target.value,
                  });
                }}
              />
              {' '}
              ms
            </label>
          </form>
        </div>
      </>
    );
  }
}

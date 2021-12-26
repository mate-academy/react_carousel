import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
};

type State = {
  position: number;
  step: number;
  frameSize: number;
  itemwidth: number;
  animationDuration: number;
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    position: 0,
    step: 3,
    frameSize: 3,
    itemwidth: 130,
    animationDuration: 1000,
  };

  scrollToLeft = () => {
    const { position, frameSize, step } = this.state;

    if (position + frameSize >= 10) {
      return;
    }

    this.setState({ position: position + step });
  };

  scrollToRight = () => {
    const { position, step } = this.state;

    if (position <= 0) {
      this.setState({ position: 0 });
    }

    this.setState({ position: position - step });
  };

  render() {
    const { images } = this.props;
    const {
      position,
      step,
      frameSize,
      itemwidth,
      animationDuration,
    } = this.state;

    const carouselStyles = {
      width: `${frameSize * itemwidth}px`,
      height: `${itemwidth}px`,
    };

    const carouselListStyles = {
      marginLeft: `-${position * itemwidth}px`,
      transition: `${animationDuration}ms`,
    };

    const buttonStyles = {
      height: `${itemwidth}px`,
    };

    return (
      <>
        <div className="carousel">
          <h1 className="carousel__heading">Try me out :)</h1>
          <div className="carousel__container">
            <button
              type="button"
              className="carousel__btn carousel__btn--left"
              onClick={this.scrollToRight}
              style={buttonStyles}
            >
              &#8249;
            </button>

            <div className="carousel__element" style={carouselStyles}>
              <ul className="carousel__list" style={carouselListStyles}>
                {images.map(imgUrl => (
                  <li
                    key={imgUrl}
                    className="carousel__list-item"
                  >
                    <img
                      src={imgUrl}
                      width={itemwidth}
                      alt=""
                    />
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="carousel__btn carousel__btn--right"
              style={buttonStyles}
              onClick={this.scrollToLeft}
            >
              &#8250;
            </button>
          </div>

          <form className="carousel__form">
            <label htmlFor="step">
              Step:
              &nbsp;
              <input
                className="carousel__form-item"
                type="number"
                id="step"
                min={1}
                max={frameSize}
                value={step}
                onChange={(event) => {
                  this.setState({
                    step: +event.target.value,
                  });
                }}
              />
            </label>

            <label htmlFor="frameSize">
              Frame Size:
              &nbsp;
              <input
                className="carousel__form-item"
                type="number"
                id="frameSize"
                min={1}
                max={5}
                value={frameSize}
                onChange={(event) => {
                  this.setState({
                    frameSize: +event.target.value,
                  });
                }}
              />
            </label>

            <label htmlFor="itemwidth">
              Item Width:
              &nbsp;
              <input
                className="carousel__form-item carousel__form-item--range"
                type="range"
                id="itemwidth"
                min={100}
                max={200}
                value={itemwidth}
                onChange={(event) => {
                  this.setState({
                    itemwidth: +event.target.value,
                  });
                }}
              />
            </label>

            <label htmlFor="animationDuration">
              Speed:
              &nbsp;
              <input
                className="carousel__form-item carousel__form-item--range"
                type="range"
                id="animationDuration"
                min={100}
                max={1500}
                value={animationDuration}
                onChange={(event) => {
                  this.setState({
                    animationDuration: +event.target.value,
                  });
                }}
              />
            </label>
          </form>
        </div>
      </>
    );
  }
}

export default Carousel;

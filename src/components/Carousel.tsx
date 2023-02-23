import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  imagesAmount: number,
  imageWidth: number,
  movedDistance: number,
  gap: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    imagesAmount: this.props.images.length,
    imageWidth: this.props.itemWidth,
    movedDistance: 0,
    gap: 5,
    step: this.props.step,
    frameSize: this.props.frameSize,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
  };

  handleImagesNext = () => {
    const {
      imagesAmount,
      imageWidth,
      movedDistance,
      gap,
      step,
      infinite,
    } = this.state;

    if (infinite === true) {
      this.setState({ movedDistance: 0 });
    }

    if (movedDistance < ((imagesAmount - step) * (imageWidth + gap))) {
      const newMovedDistance = movedDistance
        + (imageWidth + gap) * step;
      const leftWidth = ((imagesAmount) * (imageWidth + gap))
      - newMovedDistance;

      switch (leftWidth) {
        case (imageWidth + gap):
          this.setState(
            { movedDistance: movedDistance + imageWidth + gap },
          );
          break;
        case ((imageWidth + gap) * (step - 1)):
          this.setState(
            {
              movedDistance: movedDistance + (imageWidth + gap) * (step - 1),
            },
          );
          break;
        default:
          this.setState(
            {
              movedDistance: movedDistance + (imageWidth + gap) * step,
            },
          );
      }
    }
  };

  handleImagesPrev = () => {
    const {
      imagesAmount,
      imageWidth,
      movedDistance,
      gap,
      step,
      infinite,
    } = this.state;

    if (infinite === true) {
      this.setState({
        movedDistance: (imagesAmount - step)
        * (imageWidth + gap),
      });
    }

    if (movedDistance >= (imageWidth + gap)) {
      const newMovedDistance = movedDistance
      + (imageWidth + gap) * step;
      const leftWidth = newMovedDistance - ((imageWidth + gap)
      * step);

      switch (leftWidth) {
        case imageWidth + gap:
          this.setState({ movedDistance: movedDistance - imageWidth - gap });
          break;
        case ((imageWidth + gap) * (step - 1)):
          this.setState(
            {
              movedDistance: movedDistance - (imageWidth + gap) * (step - 1),
            },
          );
          break;
        default:
          this.setState({
            movedDistance: movedDistance - (imageWidth + gap) * step,
          });
      }
    }
  };

  render() {
    const { images } = this.props;
    const {
      imagesAmount,
      imageWidth,
      movedDistance,
      gap,
      step,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    const listStyle = {
      transform: `translateX(${-movedDistance}px`,
      transition: `${animationDuration}ms`,
    };

    return (
      <div
        className="Carousel"
        style={{ width: `${imageWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={listStyle}
        >
          {images.map((image, index) => {
            return (
              <li
                className="Carousel__item"
                key={image}
                style={{ marginRight: `${gap}px` }}
              >
                <img
                  src={image}
                  alt={`${index + 1}`}
                  style={{ width: `${imageWidth}px` }}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            disabled={movedDistance === 0 && infinite === false}
            className="Carousel__button Carousel__button--prev"
            type="button"
            onClick={this.handleImagesPrev}
          >
            Prev
          </button>

          <button
            data-cy="next"
            disabled={movedDistance >= ((imagesAmount - 3)
              * (imageWidth + gap)) && infinite === false}
            className="Carousel__button Carousel__button--next"
            type="button"
            onClick={this.handleImagesNext}
          >
            Next
          </button>
        </div>

        <form className="Carousel__form">
          <label className="Carousel__form__label">
            {'Moving step: '}
            <input
              className="Carousel__form__input"
              type="number"
              value={step}
              min="1"
              max="5"
              step="1"
              onChange={(e) => {
                this.setState({ step: +e.target.value });
              }}
            />
          </label>
          <label className="Carousel__form__label">
            {'Frame size: '}
            <input
              className="Carousel__form__input"
              type="number"
              value={frameSize}
              min="2"
              max="5"
              step="1"
              onChange={(e) => {
                this.setState({ frameSize: +e.target.value });
              }}
            />
          </label>
          <label className="Carousel__form__label">
            {'Image size: '}
            <input
              className="Carousel__form__input"
              type="number"
              value={imageWidth}
              min="50"
              max="150"
              step="10"
              onChange={(e) => {
                this.setState({ imageWidth: +e.target.value });
              }}
            />
          </label>
          <label className="Carousel__form__label">
            {'Motion speed: '}
            <input
              className="Carousel__form__input"
              type="number"
              value={animationDuration}
              min="300"
              max="3000"
              step="100"
              onChange={(e) => {
                this.setState({ animationDuration: +e.target.value });
              }}
            />
          </label>
          <label className="Carousel__form__label">
            {'Infinite: '}
            <input
              className="Carousel__form__input"
              type="checkbox"
              onClick={() => {
                if (infinite === false) {
                  this.setState({ infinite: true });
                } else {
                  this.setState({ infinite: false });
                }
              }}
            />
          </label>

        </form>
      </div>
    );
  }
}

export default Carousel;

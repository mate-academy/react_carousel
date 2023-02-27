import { Component, ChangeEvent } from 'react';
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
  itemWidth : number,
  movedDistance: number,
  gap: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

class Carousel extends Component<Props, State> {
  state = {
    imagesAmount: this.props.images.length,
    itemWidth: this.props.itemWidth,
    movedDistance: 0,
    gap: 0,
    step: this.props.step,
    frameSize: this.props.frameSize,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
  };

  handleImagesNext = () => {
    const {
      imagesAmount,
      itemWidth,
      movedDistance,
      gap,
      step,
      infinite,
      frameSize,
    } = this.state;

    if (infinite) {
      this.setState({ movedDistance: 0 });
    }

    const totalWidth = imagesAmount * (itemWidth + gap);
    const frameWidth = frameSize * (itemWidth + gap);
    const movementWidth = (itemWidth + gap) * step;

    if ((movedDistance + frameWidth) < totalWidth) {
      const leftWidth = (totalWidth - (movedDistance
        + frameWidth));

      if (leftWidth <= movementWidth) {
        this.setState(
          { movedDistance: movedDistance + leftWidth },
        );
      } else {
        this.setState(
          {
            movedDistance: movedDistance + movementWidth,
          },
        );
      }
    }
  };

  handleImagesPrev = () => {
    const {
      imagesAmount,
      itemWidth,
      movedDistance,
      gap,
      step,
      infinite,
      frameSize,
    } = this.state;

    const totalWidth = imagesAmount * (itemWidth + gap);
    const frameWidth = frameSize * (itemWidth + gap);
    const movementWidth = (itemWidth + gap) * step;

    if (movedDistance >= ((itemWidth + gap) * step)) {
      this.setState({
        movedDistance: movedDistance - movementWidth,
      });
    } else {
      this.setState({
        movedDistance: movedDistance - movedDistance,
      });
    }

    const leftWidth = (totalWidth - frameWidth);

    if (infinite && movedDistance === 0) {
      this.setState({ movedDistance: leftWidth });
    }
  };

  changeValueHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    const { infinite } = this.state;
    const { target } = ev;
    const { name, value } = target;

    switch (name) {
      case 'step':
        this.setState({ step: +value });
        break;
      case 'frameSize':
        this.setState({ frameSize: +value });
        break;
      case 'imageSize':
        this.setState({ frameSize: +value });
        break;
      case 'moutionSpeed':
        this.setState({ frameSize: +value });
        break;
      case 'infinite':
        this.setState({ infinite: !infinite });
        break;
      default:
    }
  };

  render() {
    const { images } = this.props;
    const {
      imagesAmount,
      itemWidth,
      movedDistance,
      gap,
      step,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    const lastFrameSizeWidth = ((imagesAmount - frameSize)
      * (itemWidth + gap));

    const listStyle = {
      transform: `translateX(${-movedDistance}px`,
      transition: `${animationDuration}ms`,
    };

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
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
                  alt={`img ${index + 1}`}
                  width={`${itemWidth}`}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            disabled={!movedDistance && !infinite}
            className="Carousel__button Carousel__button--prev"
            type="button"
            onClick={this.handleImagesPrev}
          >
            Prev
          </button>

          <button
            data-cy="next"
            disabled={movedDistance >= lastFrameSizeWidth && !infinite}
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
              name="step"
              value={step}
              min="1"
              max="5"
              step="1"
              onChange={this.changeValueHandler}
            />
          </label>
          <label className="Carousel__form__label">
            {'Frame size: '}
            <input
              className="Carousel__form__input"
              type="number"
              name="frameSize"
              value={frameSize}
              min="2"
              max="5"
              step="1"
              onChange={this.changeValueHandler}
            />
          </label>
          <label className="Carousel__form__label">
            {'Image size: '}
            <input
              className="Carousel__form__input"
              type="number"
              name="imageSize"
              value={itemWidth}
              min="50"
              max="200"
              step="10"
              onChange={this.changeValueHandler}
            />
          </label>
          <label className="Carousel__form__label">
            {'Motion speed: '}
            <input
              className="Carousel__form__input"
              type="number"
              name="moutionSpeed"
              value={animationDuration}
              min="300"
              max="3000"
              step="100"
              onChange={this.changeValueHandler}
            />
          </label>
          <label className="Carousel__form__label">
            {'Infinite: '}
            <input
              className="Carousel__form__input Carousel__form__input--checkbox"
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.changeValueHandler}
            />
          </label>

        </form>
      </div>
    );
  }
}

export default Carousel;

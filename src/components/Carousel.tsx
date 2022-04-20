import React from 'react';
import './Carousel.scss';

type State = {
  position: number;
  nextButtonIsDisabled: boolean;
  prevButtonIsDisabled: boolean;
};

type Props = {
  images: string[],
  frameSize: number;
  imageSize: number;
  animationDuration: number;
  step: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
    nextButtonIsDisabled: false,
    prevButtonIsDisabled: false,
  };

  componentDidMount() {
    const { position } = this.state;

    this.updateButtonState(position);
  }

  componentDidUpdate() {
    const { position } = this.state;
    const {
      images,
      frameSize,
    } = this.props;

    const maxPosition = (images.length - frameSize) * -1;

    if (maxPosition > position) {
      this.setState({ position: maxPosition });
    }
  }

  nextButtonHandler = () => {
    const {
      position,
    } = this.state;

    const {
      images,
      frameSize,
      step,
    } = this.props;

    const nextPosition = position - step;
    const maxPosition = -(images.length - frameSize);

    if (nextPosition >= maxPosition) {
      this.setState({ position: nextPosition });
      this.updateButtonState(nextPosition);
    } else {
      this.setState({
        position: maxPosition,
        nextButtonIsDisabled: true,
      });
    }
  };

  prevButtonHandler = () => {
    const { position } = this.state;
    const {
      step,
    } = this.props;

    const nextPosition = position + step;
    const minPosition = 0;

    if (nextPosition <= minPosition) {
      this.setState({ position: nextPosition });
      this.updateButtonState(nextPosition);
    } else {
      this.setState({
        position: minPosition,
        prevButtonIsDisabled: true,
      });
    }
  };

  updateButtonState(position: number) {
    const {
      images,
      frameSize,
    } = this.props;

    const minPosition = 0;
    const maxPosition = -images.length + frameSize;

    switch (true) {
      case position === maxPosition:
        this.setState({ nextButtonIsDisabled: true });
        break;

      case position === minPosition:
        this.setState({ prevButtonIsDisabled: true });
        break;

      default:
        this.setState({
          prevButtonIsDisabled: false,
          nextButtonIsDisabled: false,
        });
    }
  }

  render() {
    const {
      position,
      nextButtonIsDisabled,
      prevButtonIsDisabled,
    } = this.state;

    const {
      images,
      frameSize,
      imageSize,
      animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * imageSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position * imageSize}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={`${image}_${index + 1}`}
              className="Carousel__item"
            >
              <img
                src={image}
                alt={`${index}`}
                style={{
                  width: `${imageSize}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <div
          className="Carousel__buttons"
          style={{
            width: imageSize * frameSize + imageSize,
            transform: `translate(${imageSize / -2}px, ${-imageSize / 1.5}px)`,
          }}
        >

          <button
            type="button"
            className="button"
            onClick={this.prevButtonHandler}
            disabled={prevButtonIsDisabled}
          >
            {'<'}
          </button>

          <button
            type="button"
            className="button"
            onClick={this.nextButtonHandler}
            disabled={nextButtonIsDisabled}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

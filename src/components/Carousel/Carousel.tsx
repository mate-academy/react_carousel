import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  imageSize: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  position: number,
};

export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  componentDidUpdate({
    imageSize: prevImageSize,
    frameSize: prevFrameSize,
  }: Props) {
    const {
      imageSize: curImageSize,
      frameSize: curFrameSize,
      images,
    } = this.props;
    const { position } = this.state;

    if (curImageSize !== prevImageSize) {
      const positionIndex = position / prevImageSize;
      const precisePosition = positionIndex * curImageSize;

      this.setState({ position: precisePosition });
    }

    if (curFrameSize !== prevFrameSize) {
      const maxPosition
        = (images.length * curImageSize) - (curFrameSize * curImageSize);

      const precisePosition = -maxPosition > position
        ? -maxPosition
        : position;

      this.setState({ position: precisePosition });
    }
  }

  handleCarouselButton = (direction: 'Next' | 'Prev') => {
    let { position } = this.state;
    const {
      images,
      imageSize,
      step,
      frameSize,
      infinite,
    } = this.props;
    const expectedShift = imageSize * step;
    const minPosition = 0;
    const maxPosition = (images.length * imageSize) - (frameSize * imageSize);

    if (direction === 'Next') {
      const spaceLeft = maxPosition + position;
      const shift = expectedShift > spaceLeft
        ? spaceLeft
        : expectedShift;
      const expectedPosition = position - shift;

      position = infinite && spaceLeft <= 0
        ? minPosition
        : expectedPosition;
    }

    if (direction === 'Prev') {
      const spaceLeft = minPosition - position;
      const shift = expectedShift > spaceLeft
        ? spaceLeft
        : expectedShift;
      const expectedPosition = position + shift;

      position = infinite && spaceLeft <= 0
        ? -maxPosition
        : expectedPosition;
    }

    this.setState({ position });
  };

  render() {
    const { position } = this.state;
    const {
      images,
      animationDuration,
      imageSize,
      frameSize,
      infinite,
    } = this.props;
    const carouselWidth = images.length * imageSize;
    const frameWidth = frameSize * imageSize;
    const canShiftLeft = position >= 0;
    const canShiftRight = position <= -(carouselWidth - frameWidth);

    return (
      <div className="Carousel">
        <div
          className="Carousel__frame"
          style={{ width: imageSize * frameSize }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${position}px)`,
              transitionDuration: `${animationDuration}ms`,
              transitionTimingFunction: 'ease-in-out',
            }}
          >
            {images.map((image, index) => {
              return (
                <li
                  key={image}
                  className="Carousel__item"
                >
                  <img
                    src={image}
                    alt={`Smile # ${index}`}
                    className="Carousel__image"
                    style={{
                      width: imageSize,
                      height: imageSize,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            onClick={() => {
              this.handleCarouselButton('Prev');
            }}
            disabled={!infinite
              && canShiftLeft}
          >
            {'< '}
            Prev
          </button>

          <button
            data-cy="next"
            type="button"
            className="Carousel__button"
            onClick={() => {
              this.handleCarouselButton('Next');
            }}
            disabled={!infinite
              && canShiftRight}
          >
            Next
            {' >'}
          </button>
        </div>
      </div>
    );
  }
}

import { Component } from 'react';
import { Options } from '../../types/options';
import './Carousel.scss';

type Props = {
  images: string[],
  options: Options,
};

type State = {
  positionX: number,
  imageGap: number,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    positionX: 0,
    imageGap: 10,
  };

  nextSlideImage = () => {
    const {
      itemWidth,
      step,
      frameSize,
      infinite,
    } = this.props.options;
    const { imageGap } = this.state;
    const limitPosition = -(itemWidth + imageGap) * (10 - frameSize);
    let newPosition = this.state.positionX - ((itemWidth + imageGap) * step);

    if (infinite && newPosition < limitPosition) {
      newPosition = 0;
    }

    this.setState({
      positionX: newPosition < limitPosition
        ? limitPosition
        : newPosition,
    });
  };

  prevSlideImage = () => {
    const {
      itemWidth,
      step,
      infinite,
      frameSize,
    } = this.props.options;
    const { imageGap } = this.state;
    const limitPosition = -(itemWidth + imageGap) * (10 - frameSize);
    let newPosition = this.state.positionX + ((itemWidth + imageGap) * step);

    if (infinite && newPosition > 0) {
      newPosition = limitPosition;
    }

    this.setState({
      positionX: newPosition > 0
        ? 0
        : newPosition,
    });
  };

  render() {
    const { positionX, imageGap } = this.state;
    const { images, options } = this.props;
    const {
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = options;
    const limitPosition = -(itemWidth + imageGap)
      * (images.length - frameSize);
    const containerWidth = frameSize * itemWidth + (imageGap * (frameSize - 1));
    const fullWidth = (itemWidth + imageGap) * images.length;

    return (
      <div
        className="Carousel"
        style={{
          width: `${containerWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: `${imageGap}px`,
            width: `${fullWidth}px`,
            transform: `translateX(${positionX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`smile number ${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            className="button is-link is-rounded"
            type="button"
            onClick={this.prevSlideImage}
            disabled={infinite ? false : positionX === 0}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-left" />
            </span>
          </button>
          <button
            className="button is-link is-rounded"
            type="button"
            data-cy="next"
            onClick={this.nextSlideImage}
            disabled={infinite ? false : positionX === limitPosition}
          >
            <span className="icon is-small">
              <i className="fas fa-arrow-right" />
            </span>
          </button>
        </div>

      </div>
    );
  }
}

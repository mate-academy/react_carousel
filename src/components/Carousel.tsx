import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

type State = {
  position: number,
};

export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  slideRight = () => {
    const { position } = this.state;

    const {
      step,
      infinite,
      frameSize,
      images,
    } = this.props;

    const maxPosition = -(images.length - frameSize);

    this.setState({
      position: position - step > maxPosition ? position - step : maxPosition,
    });

    if (position === maxPosition && infinite) {
      this.setState({
        position: 0,
      });
    }
  };

  slideLeft = () => {
    const { position } = this.state;

    const {
      step, frameSize, images, infinite,
    } = this.props;

    const minPosition = (images.length - frameSize);

    this.setState({
      position: position + step < 0 ? position + step : 0,
    });

    if (position === 0 && infinite) {
      this.setState({
        position: -minPosition,
      });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const maxPosition = -(images.length - frameSize);
    const leftDisabled = position === 0 && !infinite;
    const righttDisabled = position === maxPosition && !infinite;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image) => (
            <li
              key={image}
              style={{
                transform: `translateX(${position * itemWidth}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={`${images.indexOf(image) + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            data-cy="prev"
            type="button"
            className="Carousel__button"
            disabled={leftDisabled}
            onClick={this.slideLeft}
          >
            &#8678;
          </button>
          <button
            data-cy="next"
            type="button"
            className="Carousel__button"
            disabled={righttDisabled}
            onClick={this.slideRight}
          >
            &#8680;
          </button>
        </div>
      </div>
    );
  }
}

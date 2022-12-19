import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

type State = {
  transform: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    transform: 0,
  };

  nextPictures = () => {
    this.setState(state => ({
      transform: state.transform - (this.props.step * this.props.itemWidth),
    }));
  };

  prevPictures = () => {
    this.setState(state => ({
      transform: state.transform + (this.props.step * this.props.itemWidth),
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { transform } = this.state;

    const containerWidth = images.length * itemWidth;
    const maxTransform = -(containerWidth - step * itemWidth);

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                height={itemWidth}
                style={{
                  transform: `translateX(${transform}px)`,
                  transition: `${animationDuration}ms`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          {/* eslint-disable-next-line react/self-closing-comp */}
          <button
            type="button"
            className="Carousel__button Carousel__button--left"
            onClick={this.prevPictures}
            disabled={transform >= 0}
          >
          </button>

          {/* eslint-disable-next-line react/self-closing-comp */}
          <button
            type="button"
            data-cy="next"
            className="Carousel__button Carousel__button--right"
            onClick={this.nextPictures}
            disabled={transform <= maxTransform}
          >
          </button>
        </div>
      </div>
    );
  }
}

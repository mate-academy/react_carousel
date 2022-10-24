import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

type State = {
  movement: number;
};

class Carousel extends React.PureComponent<Props, State> {
  state = {
    movement: 0,
  };

  moveNext = () => {
    const { movement } = this.state;
    const {
      images,
      itemWidth,
      step,
      frameSize,
    } = this.props;
    const remain = movement + (images.length * itemWidth) - step * (itemWidth);

    if (remain < frameSize * itemWidth) {
      this.setState({
        movement: -images.length * itemWidth + frameSize * itemWidth,
      });

      return;
    }

    this.setState({ movement: movement - (step * (itemWidth)) });
  };

  movePrevious = () => {
    const { movement } = this.state;
    const { itemWidth, step } = this.props;
    const remain = movement + step * (itemWidth);

    if (remain > 0) {
      this.setState({ movement: 0 });

      return;
    }

    this.setState({ movement: movement + (step * itemWidth) });
  };

  render() {
    const {
      images, itemWidth, frameSize, animationDuration,
    } = this.props;
    const { movement } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          id="Carousel__list"
          style={{
            transform: `translateX(${movement}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image => (
            <li key={images.indexOf(image)} className="Carousel__list-item">
              <img
                className="Carousel__image"
                src={image}
                alt={images.indexOf(image).toLocaleString()}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          )))}
        </ul>

        <button
          className="Carousel__button"
          type="button"
          onClick={this.movePrevious}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={this.moveNext}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

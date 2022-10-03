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
  scroll: number;
};

class Carousel extends React.PureComponent<Props, State> {
  state = {
    scroll: 0,
  };

  moveNext = () => {
    const { itemWidth, step, frameSize } = this.props;
    const { scroll } = this.state;
    const spaceLeft = scroll + (10 * itemWidth) - step * (itemWidth);

    if (spaceLeft < frameSize * itemWidth) {
      this.setState({
        scroll: -10 * itemWidth + frameSize * itemWidth,
      });

      return;
    }

    this.setState({ scroll: scroll - (step * (itemWidth)) });
  };

  movePrevious = () => {
    const { itemWidth, step } = this.props;
    const { scroll } = this.state;
    const spaceLeft = scroll + step * (itemWidth);

    if (spaceLeft > 0) {
      this.setState({ scroll: 0 });

      return;
    }

    this.setState({ scroll: scroll + (step * itemWidth) });
  };

  render() {
    const {
      images, itemWidth, frameSize, animationDuration,
    } = this.props;
    const { scroll } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${scroll}px)`,
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
          type="button"
          onClick={this.movePrevious}
        >
          Prev
        </button>
        <button
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

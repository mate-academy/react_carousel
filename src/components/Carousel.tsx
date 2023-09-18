import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
}

interface State {
  itemIndex: number;
}

export class Carousel extends Component<Props, State> {
  state = {
    itemIndex: 0,
  };

  handleSwipeClick = (step: number) => () => {
    const { images, frameSize, infinity } = this.props;
    let { itemIndex } = this.state;

    itemIndex += step;

    if (infinity) {
      const totalImages = images.length;
      const lastIndex = totalImages - frameSize;

      if (itemIndex < 0) {
        itemIndex = lastIndex;
      } else if (itemIndex > lastIndex) {
        itemIndex = 0;
      }
    } else {
      const firstIndex = 0;
      const lastIndex = images.length - frameSize;

      if (step > 0 && itemIndex > lastIndex) {
        itemIndex = lastIndex;
      }

      if (step < 0 && itemIndex < firstIndex) {
        itemIndex = firstIndex;
      }
    }

    this.setState(() => ({
      itemIndex,
    }));
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinity,
    } = this.props;

    const { itemIndex } = this.state;
    const prevDisabled = (itemIndex <= 0) && !infinity;
    const nextDisabled = (itemIndex >= images.length - frameSize) && !infinity;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li
              className="Carousel_item"
              key={image}
              style={{
                transform: `translateX(${-itemIndex * itemWidth}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img src={image} alt={`${index + 1}`} />
            </li>
          ))}
        </ul>
        <div className="Carousel__button">
          <button
            className="Carousel__btn"
            type="button"
            disabled={prevDisabled}
            onClick={this.handleSwipeClick(-step)}
          >
            Prev
          </button>
          <button
            type="button"
            className="Carousel__btn"
            data-cy="next"
            disabled={nextDisabled}
            onClick={this.handleSwipeClick(step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

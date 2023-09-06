import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
};

type State = {

  itemIndex: number;
};

export class Carousel extends Component<Props, State> {
  state = {
    itemIndex: 0,
  };

  handleSwipeClick = (step: number) => () => {
    const { images, frameSize, infinity } = this.props;
    const { itemIndex } = this.state;

    let nextInd = itemIndex + step;

    if (infinity) {
      const totalImages = images.length;

      if (nextInd < 0) {
        nextInd %= totalImages;
        nextInd += totalImages;
      } else if (nextInd >= totalImages) {
        nextInd %= totalImages;
      }
    } else {
      const lastInd = images.length - frameSize;

      if (nextInd < 0) {
        nextInd = 0;
      } else if (nextInd > lastInd) {
        nextInd = lastInd;
      }
    }

    this.setState(() => ({
      itemIndex: nextInd,
    }));
  };

  render() {
    const {
      images,
      step,
      itemWidth,
      frameSize,
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
          {images.map((img, ind) => (
            <li
              key={img}
              className="Carusel__item"
              style={{
                transform: `translateX(${-itemIndex * itemWidth}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img src={img} alt={`${ind + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>

        <div className="Carousel__button">
          <button
            type="button"
            className="Carousel__btn"
            disabled={prevDisabled}
            onClick={this.handleSwipeClick(-step)}
          >
            &#8678;
          </button>

          <button
            type="button"
            data-cy="next"
            className="Carousel__btn"
            disabled={nextDisabled}
            onClick={this.handleSwipeClick(step)}
          >
            &#8680;
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[]
  step: number
  frameSize: number
  itemWidth: number
  animationDuration: number
  infinite: boolean
}

interface State {
  firstImageIndex: number,
}

export class Carousel extends Component<Props, State> {
  state = {
    firstImageIndex: 0,
  };

  handleSwipeClick = (step: number) => {
    const {
      images,
      frameSize,
      infinite,
    } = this.props;
    const { firstImageIndex } = this.state;

    const lastFirstImage = images.length - frameSize;
    const nextFirstImage = firstImageIndex + step;

    if (infinite) {
      this.setState(() => ({
        firstImageIndex: step > 0
          ? lastFirstImage
          : 0,
      }));
    } else if (step > 0) {
      this.setState(() => ({
        firstImageIndex: nextFirstImage < lastFirstImage
          ? nextFirstImage
          : lastFirstImage,
      }));
    } else if (step < 0) {
      this.setState(() => ({
        firstImageIndex: nextFirstImage < 0
          ? 0
          : nextFirstImage,
      }));
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { firstImageIndex } = this.state;

    const transformValue = itemWidth * firstImageIndex;
    const isFirstImage = firstImageIndex === 0;
    const isLastImage = firstImageIndex === images.length - frameSize;

    return (
      <div className="Carousel">
        <div
          className="Carousel__container"
        >
          <ul
            className="Carousel__list"
            style={{
              width: `${frameSize * itemWidth}px`,
              height: `${itemWidth}px`,
              transition: `transform ${animationDuration}ms`,
              transform: `translateX(${-transformValue}px)`,
            }}
          >
            {images.map(image => (
              <li key={image} className="Carousel__list-item">
                <img
                  src={`${image}`}
                  alt={`${image[6]}`}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__button-container">
          <button
            type="button"
            className={`Carousel__button ${isFirstImage ? 'disabled' : ''}`}
            onClick={() => this.handleSwipeClick(-step)}
          >
            <img
              src="./img/left-arrow.svg"
              alt="left-arrow"
              width="30px"
            />
          </button>

          <button
            type="button"
            data-cy="next"
            className={`Carousel__button ${isLastImage ? 'disabled' : ''}`}
            onClick={() => this.handleSwipeClick(step)}
          >
            <img
              src="./img/right-arrow.svg"
              alt="right-arrow"
              width="30px"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

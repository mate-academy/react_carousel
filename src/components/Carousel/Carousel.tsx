import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  // infinite: boolean,
};
type State = {
  carouselWidth: number,
  activeIndex: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    carouselWidth: 390,
    activeIndex: 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      this.setState({
        carouselWidth: this.props.frameSize * this.props.itemWidth,
      });
    }
  }

  setActiveIndex = (move: -1 | 1) => {
    const { length } = this.props.images;
    const { frameSize, step } = this.props;

    this.setState((state) => {
      let newIndex = state.activeIndex + step * move;

      if (newIndex > length - frameSize) {
        newIndex = length - frameSize;
      }

      if (newIndex < 0) {
        newIndex = 0;
      }

      return { activeIndex: newIndex };
    });
  };

  handleNext = () => {
    this.setActiveIndex(1);
  };

  handlePrev = () => {
    this.setActiveIndex(-1);
  };

  render() {
    const {
      images,
      animationDuration,
      itemWidth,
    } = this.props;
    const {
      carouselWidth,
      activeIndex,
    } = this.state;

    return (
      <div
        className="Carousel"
        style={{ width: carouselWidth }}
      >
        <ul
          style={{ width: `${itemWidth}px`, transform: `translateX(${-100 * activeIndex}%`, transition: `transform ease ${animationDuration}ms` }}
          className="Carousel__list"
        >

          {images.map((image, idx) => (
            <li key={image}>
              <img
                src={image}
                alt={idx.toString()}
                className="Carousel__item"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            this.handlePrev();
          }}
          className="Carousel__btn Carousel__btn--prev"
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={this.handleNext}
          className="Carousel__btn Carousel__btn--next"
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

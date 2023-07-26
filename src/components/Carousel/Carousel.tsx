import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
    const { frameSize, step, infinite } = this.props;

    this.setState((state) => {
      if (infinite && state.activeIndex === length - frameSize && move === 1) {
        return { activeIndex: 0 };
      }

      if (infinite && state.activeIndex === 0 && move === -1) {
        return { activeIndex: length - frameSize };
      }

      const newIndex = state.activeIndex + step * move;

      if (newIndex < 0) {
        return { activeIndex: 0 };
      }

      if (newIndex > length - frameSize) {
        return { activeIndex: length - frameSize };
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
      infinite,
      frameSize,
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
          style={{ transform: `translateX(${-itemWidth * activeIndex}px`, transition: `transform ease ${animationDuration}ms` }}
          className="Carousel__list"
        >

          {images.map((image, idx) => (
            <li
              key={image}
              className="Carousel__item"
            >
              <img
                src={image}
                alt={`${idx + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__control-btn">
          <button
            type="button"
            onClick={() => {
              this.handlePrev();
            }}
            className="Carousel__btn Carousel__btn--prev"
            aria-label="prev"
            disabled={!infinite && activeIndex === 0}
          />
          <button
            type="button"
            data-cy="next"
            onClick={this.handleNext}
            className="Carousel__btn Carousel__btn--next"
            aria-label="next"
            disabled={!infinite && activeIndex >= images.length - frameSize}
          />
        </div>
      </div>
    );
  }
}

export default Carousel;

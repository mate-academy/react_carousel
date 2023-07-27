import { Component } from 'react';
import './Carousel.scss';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

type Props = {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
};

type State = {
  currScroll: number;
};

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    currScroll: 0,
  };

  handleNext = () => {
    const {
      step, itemWidth, frameSize, images,
    } = this.props;
    const { currScroll } = this.state;

    const lenOfHiddenImgs = (
      (images.length - frameSize) * itemWidth - Math.abs(currScroll)
    );
    const scrollStep = step * itemWidth;

    this.setState(state => {
      const stepLen = lenOfHiddenImgs > scrollStep
        ? scrollStep
        : lenOfHiddenImgs;

      return {
        currScroll: state.currScroll - stepLen,
      };
    });
  };

  handlePrev = () => {
    const { step, itemWidth } = this.props;
    const { currScroll } = this.state;

    const scrollStep = step * itemWidth;

    this.setState(state => {
      const stepLen = Math.abs(currScroll) > scrollStep
        ? scrollStep
        : Math.abs(currScroll);

      return {
        currScroll: state.currScroll + stepLen,
      };
    });
  };

  render() {
    const {
      images, itemWidth, frameSize, animationDuration,
    } = this.props;

    const { currScroll } = this.state;
    const containerWidth = itemWidth * frameSize;
    const totalWidth = images.length * itemWidth;

    return (
      <div className="wrapper">
        <button
          type="button"
          onClick={this.handlePrev}
          className="carousel__button--prev"
          disabled={currScroll === 0}
        >
          <FiChevronsLeft className="carousel__button" />
        </button>

        <div className="carousel" style={{ width: itemWidth * frameSize }}>
          <div
            className="carousel__container"
            style={{
              width: totalWidth,
              transform: `translateX(${currScroll}px)`,
              transition: `transform ${animationDuration / 1000}s ease`,
            }}
          >
            <ul className="carousel__list">
              {images.map((image, index) => (
                <li key={image}>
                  <img
                    src={image}
                    alt={`${index}`}
                    style={{ width: itemWidth }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          data-cy="next"
          type="button"
          onClick={this.handleNext}
          className="carousel__button--next"
          disabled={
            Math.abs(currScroll) + containerWidth === totalWidth
          }
        >
          <FiChevronsRight className="carousel__button" />
        </button>
      </div>
    );
  }
}

export default Carousel;

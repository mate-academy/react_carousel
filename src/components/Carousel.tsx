import { Component } from 'react';
import './Carousel.scss';
import './Button.scss';
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

  totalImgWidth = this.props.images.length * this.props.itemWidth;

  handleNextBtn = () => {
    const {
      step, itemWidth, frameSize, images,
    } = this.props;
    const { currScroll } = this.state;

    let scrollLen = 0;
    const totalWidth = images.length * itemWidth;
    const scrollStep = step * itemWidth;
    const spaceLeft = (
      totalWidth - Math.abs(currScroll) - (itemWidth * frameSize)
    );

    scrollLen = spaceLeft > scrollStep ? (
      currScroll - scrollStep
    ) : (
      currScroll - spaceLeft
    );
    this.setState({ currScroll: scrollLen });
  };

  handlePrevBtn = () => {
    const { step, itemWidth } = this.props;
    const { currScroll } = this.state;
    let scrollLen = 0;
    const scrollStep = step * itemWidth;

    const spaceLeft = Math.abs(currScroll);

    scrollLen = spaceLeft > scrollStep ? (
      currScroll + scrollStep
    ) : (
      currScroll + spaceLeft
    );
    this.setState({ currScroll: scrollLen });
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
          onClick={this.handlePrevBtn}
          className="button__prev"
          disabled={currScroll === 0}
        >
          <FiChevronsLeft className="button" />
        </button>

        <div className="carousel" style={{ width: itemWidth * frameSize }}>
          <div
            className="carousel__container "
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
          onClick={this.handleNextBtn}
          className="button__next"
          disabled={
            Math.abs(currScroll) + containerWidth === totalWidth
          }
        >
          <FiChevronsRight className="button" />
        </button>
      </div>

    );
  }
}

export default Carousel;

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
  itemIndex: number,
}

class Carousel extends Component<Props, State> {
  state = {
    itemIndex: 0,
  };

  handleNext = (step: number): void => {
    const { images, frameSize } = this.props;
    const { itemIndex } = this.state;
    const firstInd = 0;
    const lastInd = images.length - frameSize;
    let nextInd = itemIndex + step;

    if (itemIndex === lastInd) {
      nextInd = firstInd;
    } else if (nextInd > lastInd) {
      nextInd = lastInd;
    }

    this.setState(() => ({
      itemIndex: nextInd,
    }));
  };

  handlePrev = (step: number): void => {
    const { images, frameSize } = this.props;
    const { itemIndex } = this.state;
    const firstInd = 0;
    const lastInd = images.length - frameSize;
    let nextInd = itemIndex + step;

    if (itemIndex === firstInd) {
      nextInd = lastInd;
    } else if (nextInd < firstInd) {
      nextInd = firstInd;
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
        <ul
          className="Carousel__list"
        >
          {
            images.map((img, ind) => {
              return (
                <li
                  key={img}
                  className="Carusel__item"
                  style={{
                    transform: `translateX(${-itemIndex * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    src={img}
                    alt={`${ind + 1}`}
                    width={itemWidth}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="button">
          <button
            type="button"
            className="button__nav"
            disabled={prevDisabled}
            onClick={() => this.handlePrev(-step)}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            className="button__nav"
            disabled={nextDisabled}
            onClick={() => this.handleNext(step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

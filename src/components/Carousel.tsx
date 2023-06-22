import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinity: boolean,
};

type State = {
  itemIndex: number,
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    itemIndex: 0,
  };

  handleSwipeNext = (step: number) => {
    const { images, frameSize } = this.props;
    const { itemIndex } = this.state;
    const firstIndex = 0;
    const lastIndex = images.length - frameSize;
    let nextInd = itemIndex + step;

    if (itemIndex === lastIndex) {
      nextInd = firstIndex;
    } else if (nextInd > lastIndex) {
      nextInd = lastIndex;
    }

    this.setState(() => ({
      itemIndex: nextInd,
    }));
  };

  handleSwipePrev = (step: number) => {
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
        <ul className="Carousel__list">
          {
            images.map((image, ind) => {
              return (
                <li
                  key={image}
                  className="Carousel__item"
                  style={{
                    transform: `translateX(${-itemIndex * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    src={image}
                    alt={`${ind + 1}`}
                    width={itemWidth}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            disabled={prevDisabled}
            onClick={() => (this.handleSwipePrev(-step))}
          >
            &#8678;
          </button>

          <button
            type="button"
            className="Carousel__button"
            disabled={nextDisabled}
            onClick={() => (this.handleSwipeNext(step))}
            data-cy="next"
          >
            &#8680;
          </button>
        </div>
      </div>
    );
  }
}

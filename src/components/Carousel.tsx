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
  listPosition: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
};

export class Carousel extends React.Component<Props, State> {
  widthList = this.props.itemWidth * this.props.frameSize;

  // eslint-disable-next-line
  static defaultProps = {
    itemWidth: 100,
    frameSize: 2,
  };

  state = {
    listPosition: 0,
    prevDisabled: true,
    nextDisabled: false,
  };

  handleScrollNext = () => {
    const { images, step } = this.props;

    this.setState(({ listPosition }) => ({
      listPosition: (listPosition + 2 * step) > images.length
        ? images.length - step
        : listPosition + step,
    }));

    this.handleButtonDisabled();
  };

  handleScrollPrev = () => {
    const { step } = this.props;

    this.setState(({ listPosition }) => ({
      listPosition: listPosition - step < 0 ? 0 : listPosition - step,
    }));

    this.handleButtonDisabled();
  };

  handleButtonDisabled = () => {
    const { images, step } = this.props;

    this.setState(({ listPosition }) => ({
      prevDisabled: listPosition === 0,
      nextDisabled: listPosition >= images.length - step,
    }));
  };

  render() {
    const { images, itemWidth, animationDuration } = this.props;
    const { listPosition, prevDisabled, nextDisabled } = this.state;

    const listStyle = {
      width: itemWidth * images.length,
      transitionDuration: `${animationDuration}ms`,
      transform: `translateX(-${listPosition * itemWidth}px)`,
    };

    return (
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{
            width: this.widthList,
          }}
        >
          <ul className="Carousel__list" style={listStyle}>
            {images.map((imgUrl, index) => {
              const id = index + 1;

              return (
                <li className="Carousel__item" key={id}>
                  <img
                    src={imgUrl}
                    alt={`${index + 1}`}
                    className="Carousel__image"
                    style={{
                      width: itemWidth,
                      height: itemWidth,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="button button__container">
          <button
            type="button"
            onClick={this.handleScrollPrev}
            disabled={prevDisabled}
            className="button__item"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={this.handleScrollNext}
            disabled={nextDisabled}
            className="button__item"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

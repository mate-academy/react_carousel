import React from 'react';
import './Carousel.scss';

type State = {
  offset: number,
  itemShift: number,
};

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    offset: 0,
    itemShift: 0,
  };

  componentDidUpdate(prevProps: Props) {
    const {
      itemWidth,
      frameSize,
      images,
    } = this.props;
    const { offset, itemShift } = this.state;

    if (offset > 0) {
      if (itemWidth !== prevProps.itemWidth) {
        this.setState({
          offset: itemWidth * itemShift,
        });
      }
    }

    if (frameSize > prevProps.frameSize) {
      this.handleScroll(
        0,
        itemWidth,
        'next',
        images.length,
        frameSize,
        false,
      );
    }
  }

  handleScroll = (
    step: number,
    itemWidth: number,
    direction: 'next' | 'prev',
    imagesLength: number,
    frameSize: number,
    infinite: boolean,
  ) => {
    const prevOffset = this.state.offset;
    const prevSteps = this.state.itemShift;
    const scroll = step * itemWidth;
    const frameWidth = frameSize * itemWidth;
    const maxWidthSlides = imagesLength * itemWidth;
    const lastSlides = maxWidthSlides - frameWidth;
    let newOffset = (direction === 'next'
      ? (
        prevOffset + scroll
      ) : (
        prevOffset - scroll
      ));
    // sarting
    let countSteps = (direction === 'next'
      ? (
        prevSteps + step
      ) : (
        prevSteps - step
      ));

    if (countSteps < 0) {
      countSteps = 0;
    }

    if (countSteps > imagesLength - frameSize) {
      countSteps = imagesLength - frameSize;
    }

    if (infinite) {
      if (newOffset >= maxWidthSlides) {
        newOffset = 0;
      }

      if (newOffset < 0) {
        newOffset = lastSlides;
      }
    } else {
      if (newOffset >= lastSlides) {
        newOffset = lastSlides;
      }

      if (newOffset < 0) {
        newOffset = 0;
      }
    }

    this.setState({
      offset: newOffset,
      itemShift: countSteps,
    });
  };

  render() {
    const { offset, itemShift } = this.state;
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={
          { maxWidth: `${frameSize * itemWidth}px` }
        }
      >
        <ul
          className="Carousel__list"
          style={
            {
              right: `${offset}px`,
              transitionDuration: `${animationDuration}ms`,
            }
          }
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={(index + 1).toString()}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="containerBtn">
          <button
            type="button"
            className="button prev"
            onClick={() => {
              this.handleScroll(
                step,
                itemWidth,
                'prev',
                images.length,
                frameSize,
                infinite,
              );
            }}
            disabled={
              itemShift === 0 && true
            }
          >
            ⇚
          </button>
          <button
            data-cy="next"
            type="button"
            className="button next"
            onClick={() => {
              this.handleScroll(
                step,
                itemWidth,
                'next',
                images.length,
                frameSize,
                infinite,
              );
            }}
            disabled={
              (itemShift === images.length - frameSize) && true
            }
          >
            ⇛
          </button>
        </div>
      </div>
    );
  }
}

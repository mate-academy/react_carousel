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

  endOfSlides = false;

  startOfSlides = true;

  componentDidUpdate(prevProps: Props) {
    const {
      itemWidth,
      frameSize,
      images,
      infinite,
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

    if (infinite !== prevProps.infinite) {
      this.setState({
        offset: 0,
        itemShift: 0,
      });
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
    const {
      offset: prevOffset,
      itemShift: prevSteps,
    } = this.state;
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

    // infinite start

    if (infinite) {
      if (newOffset > lastSlides && this.endOfSlides) {
        newOffset = 0;
        this.endOfSlides = false;
        this.startOfSlides = true;
      }

      if (newOffset >= lastSlides && !this.endOfSlides) {
        newOffset = lastSlides;
        this.endOfSlides = true;
      }

      if (newOffset < 0 && this.startOfSlides) {
        newOffset = lastSlides;
        this.startOfSlides = false;
        this.endOfSlides = true;
      }

      if (newOffset <= 0 && !this.startOfSlides) {
        newOffset = 0;
        this.startOfSlides = true;
      }
    }

    if (!infinite) {
      if (newOffset >= lastSlides) {
        newOffset = lastSlides;
        this.startOfSlides = true;
      }

      if (newOffset < 0) {
        newOffset = 0;
        this.endOfSlides = false;
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
                alt={`slide ${index + 1}`}
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
              (
                infinite
                  ? false
                  : itemShift === 0
              )
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
              (
                infinite
                  ? false
                  : (itemShift === images.length - frameSize)
              )
            }
          >
            ⇛
          </button>
        </div>
      </div>
    );
  }
}

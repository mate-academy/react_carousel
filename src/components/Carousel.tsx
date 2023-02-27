import React from 'react';
import './Carousel.scss';

type State = {
  offset: number,
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
  };

  handleScroll = (
    step: number,
    itemWidth: number,
    direction: 'next' | 'prev',
    imagesLength: number,
    frameSize: number,
    infinite: boolean,
  ) => {
    const prevOffset = this.state.offset;
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
    });
  };

  render() {
    const { offset } = this.state;
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

        <button
          type="button"
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
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
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
        >
          Next
        </button>
      </div>
    );
  }
}

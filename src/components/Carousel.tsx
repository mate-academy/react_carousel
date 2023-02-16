import React from 'react';
import './Carousel.scss';

type State = {
  position: number,
};

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  moveSlider = (buttonName: string) => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;
    const imagesLength = itemWidth * images.length;
    const lastSlidePosition = imagesLength - (frameSize * itemWidth);
    const lastSlideWidth = (images.length % frameSize) * itemWidth;

    this.setState((prevState) => {
      const prevPosition = prevState.position;
      const slideWidth = step * itemWidth;

      if (buttonName === 'Next') {
        if (prevPosition === lastSlidePosition && infinite) {
          return ({ position: 0 });
        }

        if (prevPosition + slideWidth > lastSlidePosition) {
          return ({ position: lastSlidePosition });
        }

        return ({ position: prevPosition + slideWidth });
      }

      if (buttonName === 'Prev') {
        if (prevPosition === 0 && infinite) {
          return ({ position: lastSlidePosition });
        }

        if (prevPosition === lastSlideWidth || prevPosition < slideWidth) {
          return ({ position: 0 });
        }

        return ({ position: prevPosition - slideWidth });
      }

      return ({ position: 0 });
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translate(-${this.state.position}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
            >
              <img
                src={image}
                alt={`${index}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                  visibility: 'visible',
                }}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={(event) => {
            this.moveSlider(event.currentTarget.innerText);
          }}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={(event) => {
            this.moveSlider(event.currentTarget.innerText);
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

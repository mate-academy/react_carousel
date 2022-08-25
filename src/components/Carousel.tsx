import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
};

type State = {
  position: number
};

class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  prev = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    this.setState((prevState) => {
      const scrolled = prevState.position - (step * itemWidth);

      if (scrolled >= 0) {
        return {
          position: scrolled,
        };
      }

      if (infinite && scrolled < 0) {
        return {
          position: (images.length - frameSize) * itemWidth,
        };
      }

      return {
        position: 0,
      };
    });
  };

  next = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    this.setState((prevState) => {
      const maxScroll = (images.length - frameSize) * itemWidth;
      const scrolled = prevState.position + (step * itemWidth);

      if (scrolled <= maxScroll) {
        return {
          position: scrolled,
        };
      }

      if (infinite && scrolled > maxScroll) {
        return {
          position: (maxScroll - scrolled) + frameSize * itemWidth,
        };
      }

      return {
        position: maxScroll,
      };
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;
    const { position } = this.state;

    return (
      <div
        className="Carousel"
        style={
          {
            width: `${itemWidth * frameSize}px`,
            overflow: 'hidden',
          }
        }
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${position}px)`,
            transition: `transform ${animationDuration}ms linear`,
          }}
        >
          {images.map((image, index) => {
            const visible = (index + 1) * itemWidth > position
              && (index + 1) * itemWidth <= position + frameSize * itemWidth;

            return (
              <li key={image}>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  width={itemWidth}
                  style={
                    {
                      width: `${itemWidth}px`,
                      visibility: visible ? 'visible' : 'hidden',
                      transition: `visibility ${animationDuration}ms linear`,
                    }
                  }
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__button">
          <button
            type="button"
            className="Carousel__button--item"
            onClick={this.prev}
            disabled={!infinite && position <= 0}
          >
            &larr;
          </button>
          <button
            type="button"
            className="Carousel__button--item"
            onClick={this.next}
            disabled={
              !infinite
              && position >= (images.length - frameSize) * itemWidth
            }
            data-cy="next"
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

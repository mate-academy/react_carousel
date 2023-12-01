import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: number,
};

type State = {
  position: number,
};
/* eslint-disable-next-line */
class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  render() {
    const {
      images, step, frameSize, itemWidth, infinite, animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          maxWidth: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-this.state.position * itemWidth}px)`,
            transitionDuration: `${animationDuration / 1000}s`,
          }}
        >
          {
            images.map((image) => (
              <li
                className="Carousel__item"
                style={{
                  minWidth: `${itemWidth}px`,
                  minHeight: `${itemWidth}px`,
                }}
                key={image}
              >
                <img
                  src={image}
                  alt={image[image.lastIndexOf('/') + 1]}
                  className="Carousel__img"
                />
              </li>
            ))
          }
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            onClick={() => {
              const { position } = this.state;

              if (position - step >= 0) {
                this.setState({ position: position - step });
              } else if (infinite) {
                this.setState({
                  position: (images.length - step),
                });
              }
            }}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            onClick={() => {
              const { position } = this.state;

              if ((position + step) < images.length) {
                this.setState({ position: position + step });
              } else if (infinite) {
                this.setState({ position: 0 });
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

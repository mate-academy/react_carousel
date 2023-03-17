import { Component } from 'react';
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
  position: number,
};

export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  prev = () => {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      infinite,
    } = this.props;

    const { position } = this.state;

    const prevPosition = position - itemWidth * step;
    const maxPosition = images.length * itemWidth - itemWidth * frameSize;

    if (prevPosition < 0) {
      if (infinite) {
        this.setState({ position: maxPosition });

        return;
      }

      this.setState({ position: 0 });
    } else {
      this.setState({ position: prevPosition });
    }
  };

  next = () => {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      infinite,
    } = this.props;

    const { position } = this.state;

    const nextPosition = position + itemWidth * step;
    const maxPosition = images.length * itemWidth - itemWidth * frameSize;

    if (nextPosition >= maxPosition) {
      if (infinite && position === maxPosition) {
        this.setState({ position: 0 });

        return;
      }

      this.setState({ position: maxPosition });
    } else {
      this.setState({ position: nextPosition });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const maxPosition = images.length * itemWidth - itemWidth * frameSize;

    return (
      <div
        className="Carousel"
        style={{ width: itemWidth * frameSize,
                 overflow: "hidden",
              }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `${animationDuration}ms`,
            transform: `translateX(-${position}px)`,
            display: "flex",
            listStyle: "none",
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                width={itemWidth}
                height={itemWidth}
                src={image}
                alt={String(index + 1)}
              />
            </li>
          ))}
        </ul>

        <button
          className="Carousel__arrow Carousel__arrow--left"
          type="button"
          onClick={this.prev}
          disabled={!infinite && position === 0}
        >
          Prev
        </button>
        <button
          className="Carousel__arrow Carousel__arrow--right"
          type="button"
          onClick={this.next}
          disabled={!infinite && position === maxPosition}
          data-cy="next"
        >
          Next
        </button>
      </div>
    );
  }
}

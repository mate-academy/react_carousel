import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

type State = {
  position: number
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    position: 0,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const maxWidth = (images.length - frameSize) * itemWidth;

    const stepSum = step * itemWidth;

    const nextImage = () => {
      if (position - itemWidth * step < -maxWidth) {
        this.setState({ position: -maxWidth });
      } else {
        this.setState({ position: position + -stepSum });
      }

      if (position === -maxWidth && infinite) {
        this.setState({ position: 0 });
      }
    };

    const prevImage = () => {
      if (position + stepSum > 0) {
        this.setState({ position: 0 });
      } else {
        this.setState({ position: position + stepSum });
      }

      if (position === 0 && infinite) {
        this.setState({ position: -maxWidth });
      }
    };

    return (
      <div
        className="Carousel"
        style={
          {
            width: frameSize * itemWidth,
          }
        }
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: `transform ${animationDuration}ms `,
          }}
        >
          {
            images.map((image: string) => (
              <li
                className="Carousel__list-item"
                key={image}
              >
                <img
                  style={{ width: itemWidth }}
                  src={image}
                  alt={image}
                />
              </li>
            ))
          }
        </ul>

        <button
          onClick={prevImage}
          type="button"
        >
          Prev
        </button>
        <button
          onClick={nextImage}
          type="button"
          data-cy="next"
        >
          Next
        </button>
      </div>
    );
  }
}

import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number
  infinite: boolean,
};

type State = {
  position: number;
};

class Carousel extends Component<Props, State> {
  state = {
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
    const maxPosition = -itemWidth * (images.length - frameSize);
    const widthStep = step * itemWidth;

    const setNextPosition = () => {
      if (position - widthStep <= maxPosition) {
        this.setState(
          { position: maxPosition },
        );
      } else {
        this.setState(
          { position: position - widthStep },
        );
      }

      if (position === maxPosition && !infinite) {
        this.setState(
          { position: 0 },
        );
      }
    };

    const setPrevPosition = () => {
      if (position + widthStep > 0) {
        this.setState(
          { position: 0 },
        );
      } else {
        this.setState(
          { position: position + widthStep },
        );
      }

      if (position === 0 && !infinite) {
        this.setState(
          { position: maxPosition },
        );
      }
    };

    return (
      <div className="Carousel">
        <div
          className="container"
          style={{
            width: frameSize * itemWidth,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${position}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            {images.map((img) => (
              <li
                className="item"
                key={img}
                style={{
                  width: itemWidth,
                }}
              >
                <img src={img} alt="" />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={setPrevPosition}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={setNextPosition}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

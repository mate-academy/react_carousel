import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number
  infinite: string,
};

type State = {
  pointer: number,
};

class Carousel extends Component<Props, State> {
  state = {
    pointer: 0,
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

    const { pointer } = this.state;
    const maxPointer = images.length - step;
    const minPointer = 0;

    const position = -pointer * itemWidth;

    const setNextPosition = () => {
      if (pointer + step > maxPointer) {
        this.setState(
          { pointer: maxPointer },
        );
      } else {
        this.setState(
          { pointer: pointer + step },
        );
      }

      if (pointer === maxPointer && infinite === 'true') {
        this.setState(
          { pointer: minPointer },
        );
      }
    };

    const setPrevPosition = () => {
      if (pointer - step < minPointer) {
        this.setState(
          { pointer: minPointer },
        );
      } else {
        this.setState(
          { pointer: pointer - step },
        );
      }

      if (pointer === 0 && infinite === 'true') {
        this.setState(
          { pointer: maxPointer },
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
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
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

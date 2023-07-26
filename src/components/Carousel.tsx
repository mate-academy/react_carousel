import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  shift: number,
};

export class Carousel extends Component<Props, State> {
  state = {
    shift: 0,
  };

  setShift = (step: number) => {
    const { frameSize, images, infinite } = this.props;

    this.setState((state: Readonly<State>) => {
      if (state.shift + step >= images.length - frameSize) {
        return ({
          shift: (state.shift === images.length - frameSize) && infinite
            ? 0 : images.length - frameSize,
        });
      }

      if (state.shift + step <= 0) {
        return ({
          shift: state.shift === 0 && infinite ? images.length - frameSize : 0,
        });
      }

      return ({ shift: state.shift + step });
    });
  };

  render() {
    const {
      frameSize,
      itemWidth,
      animationDuration,
      step,
      images,
    } = this.props;

    return (
      <div className="Carousel">
        <button
          type="button"
          data-cy="prev"
          className="button"
          onClick={() => this.setShift(-step)}
        >
          Prev
        </button>
        <ul
          className="Carousel__list"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          {images.map((image: string, index : number) => (
            <li key={image}>
              <img
                className="Carousel__item"
                src={image}
                alt={String(index + 1)}
                style={
                  {
                    width: itemWidth,
                    right: `${this.state.shift * itemWidth}px`,
                    transitionDuration: `${animationDuration}ms`,
                  }
                }
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="button"
          data-cy="next"
          onClick={() => this.setShift(step)}
        >
          Next
        </button>
      </div>
    );
  }
}

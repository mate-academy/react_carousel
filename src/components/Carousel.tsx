import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

type State = {
  transform: number,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    transform: 0,
  };

  handlerNext = () => {
    this.setState((state) => {
      const maxTransform = -(
        (this.props.images.length - this.props.frameSize) * this.props.itemWidth
      );

      if (state.transform !== maxTransform) {
        return {
          transform: Math.max(
            maxTransform,
            state.transform - this.props.step * this.props.itemWidth,
          ),
        };
      }

      return { transform: state.transform };
    });
  };

  handlerPrev = () => {
    this.setState(state => {
      if (state.transform !== 0) {
        return {
          transform: Math.min(
            state.transform + this.props.step * this.props.itemWidth,
            0,
          ),
        };
      }

      return { transform: state.transform };
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { transform } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img
                src={image}
                alt="1"
                className="Carousel__image"
                style={{
                  width: `${itemWidth}px`,
                  transform: `translateX(${transform}px)`,
                  transition: `${animationDuration}ms`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button Carousel__button--prev"
            type="button"
            disabled={transform === 0}
            onClick={this.handlerPrev}
          >
            &lt;
          </button>

          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            disabled={transform === -(images.length - frameSize) * itemWidth}
            onClick={this.handlerNext}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

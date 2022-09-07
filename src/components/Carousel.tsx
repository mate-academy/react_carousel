import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images:string[],
  step:string,
  frameSize:string,
  itemWidth:string,
  animationDuration:string,
}
interface State {
  shift: number,
}

export class Carousel extends Component<Props, State> {
  state = {
    shift: 0,
  };

  prevButtonHandler = () => {
    const {
      step,
      itemWidth,
    } = this.props;

    this.setState((prevState) => {
      const scrolledDist = prevState.shift - +step * +itemWidth;

      return (scrolledDist >= 0)
        ? { shift: scrolledDist }
        : { shift: 0 };
    });
  };

  nextButtonHandler = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
    } = this.props;

    this.setState((prevState) => {
      const scrolledDist = prevState.shift + +step * +itemWidth;
      const endOfScroll = (images.length - +frameSize) * +itemWidth;

      return (scrolledDist <= endOfScroll)
        ? { shift: scrolledDist }
        : { shift: endOfScroll };
    });
  };

  render() {
    const { shift } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const containerWidthStyle = {
      width: `${+frameSize * +itemWidth}px`,
    };

    const listStyleTransform = {
      transform: `translateX(${-shift}px)`,
      transition: `${animationDuration}ms`,
    };

    const imageWidth = {
      width: `${+itemWidth}px`,
    };

    return (
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={containerWidthStyle}
        >
          <ul
            className="Carousel__list"
            style={listStyleTransform}
          >
            {images.map((img: string) => (
              <li key={img} className="Carousel__item">
                <img
                  className="Carousel__img"
                  src={img}
                  alt={img}
                  style={imageWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            disabled={(shift <= 0)}
            onClick={this.prevButtonHandler}
          >
            &larr;
          </button>
          <button
            className="Carousel__button"
            type="button"
            data-cy="next"
            disabled={(shift >= (images.length - +frameSize) * +itemWidth)}
            onClick={this.nextButtonHandler}
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}

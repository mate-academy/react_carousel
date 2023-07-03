import { PureComponent } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  move: number;
};

export class Carousel extends PureComponent<Props, State> {
  state = {
    move: 0,
  };

  handleRightSlide = () => {
    const {
      itemWidth,
      images,
      step,
      frameSize,
      infinite,
    } = this.props;
    const { move } = this.state;
    const slideLength = itemWidth * images.length - frameSize * itemWidth;
    const everySlide = itemWidth * step;

    if (infinite && move === slideLength) {
      return this.setState({ move: 0 });
    }

    if ((move + everySlide) < slideLength) {
      return this.setState({ move: move + everySlide });
    }

    return this.setState({ move: slideLength });
  };

  handleLeftSlide = () => {
    const {
      itemWidth,
      step,
      images,
      infinite,
      frameSize,
    } = this.props;
    const { move } = this.state;
    const everySlide = itemWidth * step;
    const slideLength = itemWidth * images.length - frameSize * itemWidth;

    if (infinite && move === 0) {
      return this.setState({ move: slideLength });
    }

    if ((move - everySlide) > 0) {
      return this.setState({ move: move - everySlide });
    }

    return this.setState({ move: 0 });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    const { move } = this.state;

    return (
      <>
        <h1
          data-cy="title"
          className="title"
        >
          {`Carousel with ${frameSize} images`}
        </h1>
        <div
          className="Carousel"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          <ul className="Carousel__list">
            {images.map((img, i) => {
              return (
                <li
                  key={img}
                  className="Carousel__item"
                  style={{
                    transform: `translateX(${-move}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    src={img}
                    width={itemWidth}
                    alt={`img_${i + 1}`}
                  />
                </li>
              );
            })}
          </ul>
          <div className="Carousel__buttons">
            <button
              type="button"
              onClick={this.handleRightSlide}
              data-cy="next"
            >
              Next
            </button>

            <button
              type="button"
              onClick={this.handleLeftSlide}
            >
              Prev
            </button>
          </div>
        </div>
      </>
    );
  }
}

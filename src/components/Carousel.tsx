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

class Carousel extends Component<Props> {
  state = {
    translateX: 0,
  };

  carouselClick = (button: string) => {
    const { translateX } = this.state;
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const toHide = (images.length - frameSize) * itemWidth;
    let result;

    if (button === 'next') {
      result = translateX - itemWidth * step;
      this.setState({ translateX: Math.max(result, -toHide) });

      if (translateX === -toHide && !infinite) {
        this.setState({ translateX: 0 });
      }
    } else if (button === 'prev') {
      result = translateX + itemWidth * step;
      this.setState({ translateX: Math.min(result, 0) });

      if (translateX === 0 && infinite) {
        this.setState({ translateX: -toHide });
      }
    }
  };

  disabledButton = (button: string) => {
    const { translateX } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const toHide = (images.length - frameSize) * itemWidth;

    if (button === 'next' && !infinite && translateX === -toHide) {
      return true;
    }

    if (button === 'prev' && !infinite && translateX === 0) {
      return true;
    }

    return false;
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { translateX } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          {
            images.map((image, index) => (
              <li
                key={image}
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: `${animationDuration}ms`,
                }}
              >
                <img
                  src={image}
                  alt={`${index + 1}`}
                  width={`${itemWidth}px`}
                />
              </li>
            ))
          }
        </ul>
        <div className="Carousel__buttons">
          <button
            className="button"
            type="button"
            onClick={() => this.carouselClick('prev')}
            disabled={this.disabledButton('prev')}
          >
            ← Prev
          </button>
          <button
            className="button"
            data-cy="next"
            type="button"
            onClick={() => this.carouselClick('next')}
            disabled={this.disabledButton('next')}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

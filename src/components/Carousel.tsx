import { Component } from 'react';
import './Carousel.scss';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

interface State {
  transform: number;
}

export class Carousel extends Component<Props, State> {
  state = {
    transform: 0,
  };

  transformNext = (param: string): State => {
    let transformPrev;
    const maxTransform = -1
    * (this.props.images.length - this.props.frameSize) * this.props.itemWidth;

    if (param === 'add' && this.state.transform < 0) {
      transformPrev = this.state.transform
      + (this.props.itemWidth * this.props.step);
      if (transformPrev > 0) {
        transformPrev = 0;
      }
    } else if (param === 'dev') {
      transformPrev = this.state.transform
      - (this.props.itemWidth * this.props.step);
      if (transformPrev < maxTransform) {
        transformPrev = maxTransform;
      }
    } else {
      transformPrev = 0;
    }

    return { transform: transformPrev };
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <div
            className="container"
            style={{
              transform: `translateX(${this.state.transform}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            {images.map((image, index) => (
              <li
                key={uuidv4()}
              >
                <img
                  src={image}
                  alt={`${index + 1}`}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </div>
        </ul>

        <button
          type="button"
          onClick={() => {
            this.setState(this.transformNext('add'));
          }}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={() => {
            this.setState(this.transformNext('dev'));
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

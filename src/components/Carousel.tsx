import React from 'react';
import './Carousel.scss';
import { Image } from '../types/Image';

interface State {
  viewPosition: number;
}

interface Props {
  images: Image[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    viewPosition: 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      this.setState({ viewPosition: 0 });
    }
  }

  moveImage = (direction: string) => {
    const { viewPosition } = this.state;
    const {
      itemWidth,
      frameSize,
      step,
    } = this.props;
    const { images } = this.props;

    if (direction === 'forward') {
      const newPosition = viewPosition + itemWidth * step;
      const maxSlidePosition = (images.length - frameSize) * itemWidth;

      this.setState({
        viewPosition: newPosition > maxSlidePosition
          ? maxSlidePosition
          : newPosition,
      });
    }

    if (direction === 'back') {
      const newPosition = viewPosition - itemWidth * step;

      this.setState({
        viewPosition: newPosition < 0
          ? 0
          : newPosition,
      });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;
    const { viewPosition } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${viewPosition}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {
            images.map(({ image, id }) => {
              return (
                <li key={id}>
                  <img
                    src={image}
                    alt={image}
                    style={{
                      width: `${itemWidth}px`,
                    }}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="Carousel__button-place">
          <button
            type="button"
            onClick={() => this.moveImage('back')}
            disabled={viewPosition === 0}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => this.moveImage('forward')}
            disabled={viewPosition === (images.length - frameSize) * itemWidth}
            data-cy="next"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

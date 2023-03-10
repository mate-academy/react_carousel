import { Component, ReactNode } from 'react';
import { State as Prop, StateCarousel } from '../Types';
import './Carousel.scss';

class Carousel extends Component<Prop, StateCarousel> {
  state: Readonly<StateCarousel> = {
    moveImage: 0,
  };

  render(): ReactNode {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      step,
    } = this.props;
    const { moveImage } = this.state;

    const styles = {
      ul: {
        overflow: 'hidden',
        width: `${itemWidth * frameSize}px`,
      },
      divMoveList: {
        display: 'flex',
        width: `${itemWidth * images.length}px`,
        transition: `transform ${animationDuration}ms`,
        transform: `translate(-${moveImage}px, 0)`,
      },
      images: {
        width: `${itemWidth}px`,
      },
    };

    const movePrev = () => {
      let moveTo = moveImage;

      if (moveTo === 0 && infinite) {
        moveTo = (images.length - frameSize) * itemWidth;
        this.setState({ moveImage: moveTo });

        return;
      }

      moveTo = moveImage - itemWidth * step;

      if (moveTo < 0) {
        moveTo = 0;
      }

      this.setState({ moveImage: moveTo });
    };

    const moveNext = () => {
      let moveTo = moveImage;

      if (moveTo === (images.length - frameSize) * itemWidth && infinite) {
        moveTo = 0;
        this.setState({ moveImage: moveTo });

        return;
      }

      moveTo = moveImage + itemWidth * step;

      if (moveTo > (images.length - frameSize) * itemWidth) {
        moveTo = (images.length - frameSize) * itemWidth;
      }

      this.setState({ moveImage: moveTo });
    };

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={styles.ul}
        >
          <div
            className="Carousel__moveList"
            style={styles.divMoveList}
          >
            {images.map(url => (
              <li>
                <img
                  src={url}
                  alt="smile"
                  style={styles.images}
                />
              </li>
            ))}
          </div>
        </ul>

        <button
          type="button"
          onClick={movePrev}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={moveNext}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

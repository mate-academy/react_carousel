import React from 'react';
// import cn from 'classnames';
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
  currentImage: number;
};

export class Carousel extends React.Component<Props, State> {
  state:State = {
    currentImage: 0,
  };

  handlePrev = () => {
    this.setState(currentState => {
      const {
        currentImage,
      } = currentState;
      const {
        images,
        step,
        frameSize,
        infinite,
      } = this.props;

      const newCurrentImage = currentImage - step > 0
        ? currentImage - step
        : 0;

      if (currentImage === 0 && infinite) {
        this.setState({
          currentImage: images.length - frameSize,
        });
      }

      return { ...currentState, currentImage: newCurrentImage };
    });
  };

  handleNext = () => {
    this.setState(currentState => {
      const {
        currentImage,
      } = currentState;
      const {
        images,
        step,
        frameSize,
        infinite,
      } = this.props;
      const newCurrentImage = currentImage + step > images.length - frameSize
        ? images.length - frameSize
        : currentImage + step;

      if (currentImage === images.length - frameSize && infinite) {
        this.setState({
          currentImage: 0,
        });
      }

      return { ...currentState, currentImage: newCurrentImage };
    });
  };

  render() {
    const { currentImage } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${frameSize * (itemWidth + 4)}px`,
          }}
        >

          {images.map((image, index) => (
            <li
              style={{
                transform: `translateX(-${currentImage * (itemWidth + 4)}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
              key={image}
            >
              <img
                className="Carousel__img"
                style={{
                  width: itemWidth,
                }}
                src={image}
                alt={`${index + 1}`}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__button">
          <button
            type="button"
            onClick={this.handlePrev}
            disabled={currentImage === 0 && !infinite}
          >
            Prev
          </button>
          <button
            className="button"
            type="button"
            data-cy="next"
            onClick={this.handleNext}
            disabled={currentImage === images.length - frameSize && !infinite}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

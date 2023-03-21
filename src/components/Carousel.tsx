import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  translateValue: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    translateValue: 0,
  };

  handlerButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      step,
      itemWidth,
      images,
      infinite,
      frameSize,
    } = this.props;

    const { translateValue } = this.state;
    let position = translateValue;
    const maxSlide = -(images.length - frameSize) * itemWidth;

    if (event.currentTarget.name === 'Previous') {
      position += itemWidth * step;

      if (position >= itemWidth * step && infinite) {
        this.setState({ translateValue: maxSlide });

        return;
      }

      this.setState({ translateValue: position >= 0 ? 0 : position });
    }

    if (event.currentTarget.name === 'Next') {
      position -= itemWidth * step;

      if (position <= maxSlide - (itemWidth * step) && infinite) {
        this.setState({ translateValue: 0 });

        return;
      }

      this.setState({
        translateValue: position <= maxSlide
          ? maxSlide
          : position,
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
    const { translateValue } = this.state;

    return (
      <div className="carousel">
        <div
          className="carousel__container"
          style={{
            width: `${itemWidth * frameSize}px`,
            height: `${itemWidth + 22}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              transform: `translateX(${translateValue}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => {
              return (
                <li
                  key={image}
                  className="carousel__item"
                >
                  <img
                    src={image}
                    alt={index.toString()}
                    style={{
                      width: `${itemWidth}px`,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="carousel__buttons">
          <button
            type="button"
            className="carousel__button"
            name="Previous"
            onClick={this.handlerButton}
          >
            &lt;
            Prev
          </button>

          <button
            type="button"
            className="carousel__button"
            name="Next"
            onClick={this.handlerButton}
            data-cy="Next"
          >
            Next
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

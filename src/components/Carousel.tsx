import React from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

interface State {
  position: number;
}

// eslint-disable-next-line react/prefer-stateless-function
class Carousel extends React.Component<CarouselProps, State> {
  state = {
    position: 0,
  };

  hadleButtonPrev = () => {
    const {
      images, step, itemWidth, frameSize, infinite,
    } = this.props;
    const { position } = this.state;

    const max = (images.length * itemWidth) - (itemWidth * frameSize);

    if (position - itemWidth * step >= 0) {
      this.setState(prevState => (
        { position: prevState.position - itemWidth * step }));
    } else if (infinite && !position) {
      this.setState({ position: max });
    } else {
      this.setState({ position: 0 });
    }
  };

  hadleButtonNext = () => {
    const {
      images, step, itemWidth, frameSize, infinite,
    } = this.props;
    const { position } = this.state;

    const max = (images.length * itemWidth) - (itemWidth * frameSize);

    if ((position + itemWidth * step) < max) {
      this.setState(state => (
        { position: state.position + itemWidth * step }));
    } else if (infinite && max <= (position + itemWidth * step)) {
      this.setState({ position: 0 });
    } else {
      this.setState(state => (
        { position: state.position + (max - state.position) }
      ));
    }
  };

  render() {
    const {
      images, itemWidth, frameSize, animationDuration,
    } = this.props;

    const { position } = this.state;

    const imageStyle = {
      width: itemWidth,
      transition: `transform ${animationDuration}ms`,
      transform: `translateX(-${position}px)`,
    };

    return (
      <div className="Carousel" style={{ width: itemWidth * frameSize }}>
        <ul className="Carousel__list">
          {images.map(image => {
            return (
              <li key={image} className="Carousel__picture">
                <img
                  src={image}
                  alt={image}
                  style={imageStyle}
                />
              </li>
            );
          })}
        </ul>

        <button
          className="Carousel__button"
          type="button"
          onClick={this.hadleButtonPrev}
        >
          Prev

        </button>
        <button
          className="Carousel__button"
          type="button"
          onClick={this.hadleButtonNext}
          data-cy="next"
        >
          Next

        </button>
      </div>
    );
  }
}

export default Carousel;

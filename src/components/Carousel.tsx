import { Component } from 'react';
import './Carousel.scss';

type State = {
  position: number;
};

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  handleNextClick = () => {
    const { position } = this.state;

    const { images, step } = this.props;
    const maxposition = images.length - 1;

    if (position + step <= maxposition) {
      this.setState((prevState) => ({
        position: prevState.position + step,
      }));
    } else {
      this.setState({ position: 0 });
    }
  };

  handlePrevClick = () => {
    const { position } = this.state;

    const { step, images } = this.props;
    const maxposition = images.length;

    if (position - step >= 0) {
      this.setState((prevState) => ({
        position: prevState.position - step,
      }));
    } else {
      this.setState({ position: maxposition - step });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;
    const {
      position,
    } = this.state;

    const visibleImages = images.slice(position, position + frameSize);

    return (
      <>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              width: `${itemWidth * frameSize}px`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {visibleImages.map(img => (
              <li
                key={img}
                style={{
                  transform: `translateX(-${position}px)`,
                }}
              >
                <img
                  src={img}
                  alt={img.slice(6, 7)}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={this.handlePrevClick}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>

      </>
    );
  }
}

export default Carousel;

import './Carousel.scss';
import { Component } from 'react';

interface Props {
  images: string[];
  smileWidth: number;
  frameSize: number;
  step: number;
  speedOfAnimation: number;
  infinite: boolean;
}

interface State {
  currentSmileIndex: number;
}

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    currentSmileIndex: 0,
  };

  handleClick = (step: number) => () => {
    const { images, frameSize } = this.props;
    const { currentSmileIndex } = this.state;
    const lastSmileIndex = images.length - frameSize;
    const firstSmileIndex = 0;
    let nextSmileIndex = currentSmileIndex + step;

    if (step > 0) {
      if (currentSmileIndex === lastSmileIndex) {
        nextSmileIndex = firstSmileIndex;
      } else if (nextSmileIndex > lastSmileIndex) {
        nextSmileIndex = lastSmileIndex;
      }
    }

    if (step < 0) {
      if (currentSmileIndex === firstSmileIndex) {
        nextSmileIndex = lastSmileIndex;
      } else if (nextSmileIndex < firstSmileIndex) {
        nextSmileIndex = firstSmileIndex;
      }
    }

    this.setState({ currentSmileIndex: nextSmileIndex });
  };

  render() {
    const {
      smileWidth,
      frameSize,
      speedOfAnimation,
      infinite,
      step,
      images,
    } = this.props;

    const { currentSmileIndex } = this.state;

    const frameStyles = {
      width: `${frameSize * smileWidth}px`,
      transition: `${speedOfAnimation}ms`,
    };

    const smileStyles = {
      transform: `translateX(${-currentSmileIndex * smileWidth}px)`,
      transition: `${speedOfAnimation}ms`,
    };

    return (
      <div className="carousel">
        <div className="carousel__frame" style={frameStyles}>
          <ul className="carousel__list">
            {images.map((image, index) => {
              return (
                <li
                  key={image}
                  style={smileStyles}
                >
                  <img
                    src={image}
                    width={`${smileWidth}px`}
                    alt={`smile ${index + 1}`}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="buttons">
          <button
            type="button"
            onClick={this.handleClick(-step)}
            disabled={currentSmileIndex <= 0 && !infinite}
            className="buttons__button"
          >
            Prev
          </button>

          <button
            type="button"
            onClick={this.handleClick(step)}
            disabled={
              (currentSmileIndex >= images.length - frameSize) && !infinite
            }
            className="buttons__button"
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

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

type State = {
  currentPos: number;
};

export class Carousel extends Component<Props, State> {
  state = {
    currentPos: 0,
  };

  images = this.props.images;

  imagesAmount = this.images.length;

  moveRight = () => {
    const {
      step,
      itemWidth,
      frameSize,
      infinite,
    } = this.props;
    const max = -(itemWidth * (this.imagesAmount - frameSize));
    const stepWidth = step * itemWidth;
    const isEnouphPlace = max < this.state.currentPos - stepWidth;

    if (isEnouphPlace) {
      this.setState(prevState => (
        { currentPos: prevState.currentPos - stepWidth }
      ));
    } else {
      this.setState({ currentPos: max });
    }

    if (infinite && this.state.currentPos === max) {
      this.setState({ currentPos: 0 });
    }
  };

  moveLeft = () => {
    const {
      step,
      itemWidth,
      frameSize,
      infinite,
    } = this.props;
    const max = -(itemWidth * (this.imagesAmount - frameSize));
    const stepWidth = step * itemWidth;
    const isEnouphPlace = this.state.currentPos + stepWidth <= 0;

    if (isEnouphPlace) {
      this.setState(prevState => (
        { currentPos: prevState.currentPos + stepWidth }
      ));
    } else {
      this.setState({ currentPos: 0 });
    }

    if (infinite && this.state.currentPos === 0) {
      this.setState({ currentPos: max });
    }
  };

  render() {
    const {
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${this.state.currentPos}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {
            this.props.images.map((image) => {
              const imageId = parseInt(image.slice(6), 10);

              return (
                <li
                  key={imageId}
                >
                  <img
                    src={image}
                    alt={`${imageId}`}
                    style={{
                      width: `${itemWidth}px`,
                    }}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.moveLeft}
          >
            Prev
          </button>

          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            onClick={this.moveRight}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

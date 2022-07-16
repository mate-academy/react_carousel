import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: string,
  frameSize: string,
  step: string,
  animationDuration: string,
  infinite: boolean,
}

interface State {
  shiftPoint: number,
}

class Carousel extends Component<Props, State> {
  state = {
    shiftPoint: 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.itemWidth !== this.props.itemWidth
      && this.state.shiftPoint !== 0) {
      this.setState({ shiftPoint: 0 });
    }
  }

  handleEmodjisMovement = (direction: number) => {
    this.setState((prevState) => {
      const newShiftPoint = prevState.shiftPoint
        + (direction * parseInt(this.props.step, 10)
        * parseInt(this.props.itemWidth, 10));

      if (newShiftPoint > 0
        || -newShiftPoint >= (this.props.images.length
        * parseInt(this.props.itemWidth, 10))) {
        if (this.props.infinite && direction === -1) {
          return {
            shiftPoint: 0,
          };
        }

        return null;
      }

      return {
        shiftPoint: newShiftPoint,
      };
    });
  };

  render() {
    const { itemWidth, frameSize } = this.props;
    const { shiftPoint } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel__list-container"
          style={{ width: `${parseInt(frameSize, 10) * parseInt(itemWidth, 10)}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${shiftPoint}px)`,
              transition: `${this.props.animationDuration}ms`,
            }}
          >
            {this.props.images.map((image, index) => {
              return (
                <li
                  className="Carousel__item"
                  style={{ width: `${itemWidth}px` }}
                >
                  <img
                    src={image}
                    alt={`${index + 1}`}
                    style={{ width: `${itemWidth}px` }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <button
          className="Carousel__button"
          type="button"
          onClick={() => this.handleEmodjisMovement(1)}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={() => this.handleEmodjisMovement(-1)}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

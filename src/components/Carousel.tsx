import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
};

type State = {
  itemWidth: number;
  frameSize: number;
  step: number;
  currentPosition: number
  animationDuration: number;
  disabledValue: boolean;
  infinite: boolean;
};

class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    itemWidth: 130,
    frameSize: 2,
    step: 2,
    currentPosition: 0,
    animationDuration: 1000,
    disabledValue: false,
    infinite: false,
  };

  newPosition = 0;

  moveLeft = () => {
    const {
      itemWidth,
      step,
      currentPosition,
      frameSize,
      infinite,
    } = this.state;

    this.newPosition = currentPosition + itemWidth * step;

    if (this.newPosition > 0) {
      this.newPosition = 0;

      if (infinite) {
        this.newPosition = -(
          (this.props.images.length - frameSize) * itemWidth);
      }
    }

    return this.setState({
      currentPosition: this.newPosition,
    });
  };

  moveRight = () => {
    const {
      itemWidth,
      step,
      currentPosition,
      frameSize,
      infinite,
    } = this.state;

    this.newPosition = currentPosition - itemWidth * step;

    if (this.newPosition < -(
      (this.props.images.length - frameSize) * itemWidth)) {
      this.newPosition = -(
        (this.props.images.length - frameSize) * itemWidth);

      if (infinite) {
        this.newPosition = 0;
      }
    }

    return this.setState({ currentPosition: this.newPosition });
  };

  changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'infinite') {
      return this.setState({
        [event.target.name]: event.currentTarget.checked,
      });
    }

    return this.setState((state) => ({
      ...state,
      [event.target.name]: +(event.target.value),
    }));
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      step,
      currentPosition,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          {images.map(image => (
            <li
              key={image[6] + image[7]}
              className="Carousel__list__item"
            >
              <img
                src={image}
                alt={image}
                className="Carousel__list__item__img"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                  transition: `transform ${animationDuration}ms`,
                  transform: `translateX(${currentPosition}px)`,
                }}
              />
            </li>
          ))}
        </ul>

        <div>
          <button
            type="button"
            onClick={this.moveLeft}
            disabled={!infinite && this.newPosition === 0}
          >
            Prev
          </button>
          <button
            data-cy="next"
            type="button"
            onClick={this.moveRight}
            disabled={
              !infinite && this.newPosition === -(
                (images.length - frameSize) * itemWidth)
            }
          >
            Next
          </button>
        </div>

        <div className="panel">
          <label>
            <p>Change size:</p>
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              min="50"
              onChange={this.changeValue}
            />
          </label>

          <label>
            <p>Show icon:</p>
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              min="1"
              max="5"
              onChange={this.changeValue}
            />
          </label>

          <label>
            <p>Animations speed:</p>
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              min="0"
              onChange={this.changeValue}
            />
          </label>

          <label>
            <p>Step:</p>
            <input
              type="number"
              name="step"
              value={step}
              min="0"
              max="10"
              onChange={this.changeValue}
            />
          </label>

          <label>
            <p>infinite:</p>
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.changeValue}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;

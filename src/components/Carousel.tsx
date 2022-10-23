import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
}

interface State {
  position: number;
  frameSize: number
  step: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
    frameSize: 3,
    step: 3,
    itemWidth: 130,
    animationDuration: 1,
    infinite: false,
  };

  render() {
    const {
      position,
      step,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;
    const { images } = this.props;

    const handleNextClick = () => {
      if (infinite && position === images.length - frameSize) {
        this.setState({
          position: 0,
        });
      } else {
        this.setState({
          position: Math.min(position + step, images.length - frameSize),
        });
      }
    };

    const handlePrevClick = () => {
      if (infinite && position === 0) {
        this.setState({
          position: images.length - frameSize,
        });
      } else {
        this.setState({ position: Math.max(position - step, 0) });
      }
    };

    return (
      <div className="Carousel">
        <div className="Carousel__container">
          <button
            disabled={position === 0 && !infinite}
            className="Button"
            type="button"
            onClick={handlePrevClick}
          >
            {'<'}
          </button>

          <div
            className="Carousel__list-container"
            style={
              {
                width: `${itemWidth * frameSize}px`,
              }
            }
          >
            <ul
              className="Carousel__list"
              style={
                {
                  transform: `translateX(-${position * itemWidth}px)`,
                  transition: `transform ${animationDuration}s`,
                }
              }
            >
              {images.map((image, index) => (
                <li key={image}>
                  <img
                    src={image}
                    alt={`${index + 1}`}
                    style={
                      {
                        width: `${itemWidth}px`,
                      }
                    }
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            disabled={position + frameSize >= images.length && !infinite}
            className="Button"
            type="button"
            onClick={handleNextClick}
            data-cy="next"
          >
            {'>'}
          </button>
        </div>

        <label className="Carousel__label">
          Set width of items:
          <input
            type="range"
            value={itemWidth}
            min={90}
            max={170}
            onChange={(event) => {
              this.setState({ itemWidth: Number(event.currentTarget.value) });
            }}
          />
        </label>

        <label className="Carousel__label">
          Set amount of items:
          <input
            type="number"
            value={frameSize}
            min={1}
            max={10}
            onChange={(event) => {
              this.setState({ frameSize: Number(event.currentTarget.value) });
            }}
          />
        </label>

        <label className="Carousel__label">
          Set step:
          <input
            type="number"
            value={step}
            min={1}
            max={10}
            onChange={(event) => {
              this.setState({ step: Number(event.currentTarget.value) });
            }}
          />
        </label>

        <label className="Carousel__label">
          Set duration of animation:
          <input
            type="range"
            value={animationDuration}
            min={0}
            max={5}
            step={0.1}
            onChange={(event) => {
              this.setState({
                animationDuration: Number(event.currentTarget.value),
              });
            }}
          />
        </label>

        <label className="Carousel__label">
          Infinite:
          <input
            type="checkbox"
            checked={infinite}
            onChange={() => {
              this.setState({
                infinite: !infinite,
              });
            }}
          />
        </label>
      </div>
    );
  }
}

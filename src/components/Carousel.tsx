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
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
  };

  updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  };

  handleNextClick = () => {
    const {
      step,
      position,
    } = this.state;

    const { images } = this.props;
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
    const {
      step,
      position,
    } = this.state;

    const { images } = this.props;
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
    const { images } = this.props;
    const {
      itemWidth,
      step,
      frameSize,
      animationDuration,
      position,
    } = this.state;

    const visibleImages = images.slice(position, position + frameSize);

    return (
      <>
        <h1 data-cy="title">
          {`Carousel with ${frameSize} images`}
        </h1>
        <div className="Carousel__Form">
          <form>
            <label htmlFor="itemId">
              Item Width:
              <input
                type="number"
                id="itemId"
                min="1"
                value={itemWidth}
                name="itemWidth"
                required
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="frameId">
              Frame Size:
              <input
                type="number"
                id="frameId"
                min="1"
                name="frameSize"
                value={frameSize}
                max={images.length}
                required
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="stepId">
              Step:
              <input
                type="number"
                id="stepId"
                min="1"
                name="step"
                value={step}
                max={images.length}
                required
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="animationId">
              Animation Duration
              <input
                type="number"
                id="animationId"
                min="1"
                name="animationDuration"
                value={animationDuration}
                required
                onChange={this.updateInput}
              />
            </label>
          </form>
        </div>
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

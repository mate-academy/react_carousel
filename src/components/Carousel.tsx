import { Component } from 'react';
import './Carousel.scss';

type State = {
  scrollPosition: number;
  infinite: boolean
};

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

class Carousel extends Component<Props, State> {
  state = {
    scrollPosition: 0,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
  };

  updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = event.target;

    if (name === 'infinite') {
      this.setState((prevState) => ({
        ...prevState,
        infinite: !prevState.infinite,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        [name]: +value,
      }));
    }
  };

  handleNextClick = () => {
    const {
      step,
      itemWidth,
      scrollPosition,
    } = this.state;

    const { images } = this.props;
    const totalItems = images.length;
    const maxScrollPosition = itemWidth * (totalItems - step);

    if (scrollPosition < maxScrollPosition) {
      this.setState((prevState) => ({
        scrollPosition: prevState.scrollPosition + itemWidth * step,
      }));
    } else {
      this.setState({ scrollPosition: 0 });
    }
  };

  handlePrevClick = () => {
    const {
      step,
      itemWidth,
      frameSize,
    } = this.props;

    const { scrollPosition } = this.state;
    const { images } = this.props;
    const totalItems = images.length;
    const maxScrollPosition = itemWidth * (totalItems - frameSize);

    if (scrollPosition > 0) {
      this.setState((prevState) => ({
        scrollPosition: prevState.scrollPosition - itemWidth * step,
      }));
    } else {
      this.setState({ scrollPosition: maxScrollPosition });
    }
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinite,
      scrollPosition,
    } = this.state;

    return (
      <>
        <h1 data-cy="title">
          {`Carousel with ${step} images`}
        </h1>
        <div className="Carousel__Form">
          <form>
            <label htmlFor="itemId">
              ItemWidth:
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
              frameSize
              <input
                type="number"
                id="frameId"
                min="1"
                name="frameSize"
                value={frameSize}
                required
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="stepId">
              step
              <input
                type="number"
                id="stepId"
                min="1"
                name="step"
                value={step}
                required
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="animationId">
              animationDuration
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
            <label htmlFor="infinite">
              infinite
            </label>
            <input
              type="checkbox"
              id="infinite"
              checked={infinite}
              onChange={this.updateInput}
              name="infinite"
            />
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
            {images.map(img => (
              <li
                key={img}
                style={{
                  transform: `translateX(-${scrollPosition}px)`,
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
            disabled={!infinite}
            onClick={this.handlePrevClick}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            disabled={!infinite}
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

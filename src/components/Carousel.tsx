import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  position: number,
};

class Carousel extends React.Component<Props, State> {
  state:State = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    position: 0,
  };

  nextButton = () => {
    if ((this.state.position - this.state.frameSize - this.state.step) >= -10) {
      this.setState(props => ({ position: props.position - props.step }));
    } else {
      this.setState(props => ({ position: -10 + props.frameSize }));
    }
  };

  prevButton = () => {
    if ((this.state.position + this.state.step) <= 0) {
      this.setState(props => ({ position: props.position + props.step }));
    } else {
      this.setState(() => ({ position: 0 }));
    }
  };

  render() {
    const { images } = this.props;

    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      position,
    } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel_wrapper"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${position}px)`,
              marginLeft: `${position * itemWidth}px`,
              transition: `${animationDuration}ms`,
              width: `${frameSize * itemWidth}px`,
            }}
          >
            {images.map((image) => (
              <li key="image" className="Carousel__item">
                <img
                  src={image}
                  alt="Smile"
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="button"
          onClick={() => {
            this.prevButton();
          }}
        >
          Prev
        </button>

        <button
          type="button"
          className="button"
          onClick={() => {
            this.nextButton();
          }}
        >
          Next
        </button>

        <div className="labels">
          <label
            htmlFor="stepId"
            className="label"
          >
            Step:
            <input
              type="number"
              id="stepId"
              className="input"
              min={1}
              max={10}
              value={step}
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            />
          </label>

          <label
            htmlFor="frameId"
            className="label"
          >
            Frame size:
            <input
              type="number"
              id="frameId"
              className="input"
              min={1}
              max={10}
              value={frameSize}
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </label>

          <label
            htmlFor="itemId"
            className="label"
          >
            Item width:
            <input
              type="number"
              id="itemId"
              className="input"
              max={390}
              value={itemWidth}
              onChange={(event) => {
                this.setState({ itemWidth: +event.target.value });
              }}
            />
          </label>

          <label
            htmlFor="animId"
            className="label"
          >
            Animation Duration:
            <input
              type="number"
              id="animId"
              className="input"
              value={animationDuration}
              onChange={(event) => {
                this.setState({ animationDuration: +event.target.value });
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;

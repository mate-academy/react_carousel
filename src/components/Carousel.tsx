import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  itemWidth: number,
  step: number,
  frameSize: number,
  animationDuration: number,
  index: number,
  infinite: boolean,
  [key: string]: number | boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    itemWidth: 130,
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
    index: 0,
    infinite: false,
  };

  handleNextButton = () => {
    const {
      index,
      frameSize,
      step,
      infinite,
    } = this.state;
    let newIndex: number;

    if (infinite) {
      if (index + frameSize === this.props.images.length) {
        newIndex = 0;
      } else if (index + frameSize > this.props.images.length - step) {
        newIndex = this.props.images.length - frameSize;
      } else {
        newIndex = index + step;
      }

      this.setState(() => ({ index: newIndex }));
    } else {
      if (index + frameSize > this.props.images.length - step) {
        newIndex = this.props.images.length - frameSize;
      } else {
        newIndex = index + step;
      }

      this.setState(() => ({ index: newIndex }));
    }
  };

  handlePrevButton = () => {
    const { index, step, infinite } = this.state;
    let newIndex: number;

    if (infinite) {
      if (index === 0) {
        newIndex = this.props.images.length - step - 1;
      } else if (index < step) {
        newIndex = 0;
      } else {
        newIndex = index - step;
      }

      this.setState(() => ({ index: newIndex }));
    } else {
      if (index < step) {
        newIndex = 0;
      } else {
        newIndex = index - step;
      }

      this.setState(() => ({ index: newIndex }));
    }
  };

  handleInputChange = (event: string, e: number | boolean) => {
    this.setState(() => ({ [event]: e }));
  };

  render() {
    const {
      itemWidth, frameSize, step, animationDuration, index,
    } = this.state;

    return (
      <>
        <div className="selector-section">
          <span style={{ color: 'red' }}>Image Width</span>
          <div className="input-block">
            <input
              type="range"
              min="50"
              max="390"
              name="itemWidth"
              value={itemWidth}
              onChange={(e) => {
                this.handleInputChange(e.target.name, +e.target.value);
              }}
            />
            <span>{itemWidth}</span>
          </div>
          <span>Image number</span>
          <div className="input-block">
            <input
              type="range"
              min="1"
              max="10"
              name="frameSize"
              value={frameSize}
              onChange={(e) => {
                this.handleInputChange(e.target.name, +e.target.value);
              }}
            />
            <span>{frameSize}</span>
          </div>
          <span>Step</span>
          <div className="input-block">
            <input
              type="range"
              min="1"
              max="10"
              name="step"
              value={step}
              onChange={(e) => {
                this.handleInputChange(e.target.name, +e.target.value);
              }}
            />
            <span>{step}</span>
          </div>
          <span>Animation Duration</span>
          <div className="input-block">
            <input
              type="range"
              min="100"
              max="4000"
              name="animationDuration"
              value={animationDuration}
              onChange={(e) => {
                this.handleInputChange(e.target.name, +e.target.value);
              }}
            />
            <span>{animationDuration}</span>
          </div>
          <div className="input-block">
            <label htmlFor="checkInfinity">
              <input
                id="checkInfinity"
                type="checkbox"
                name="infinite"
                onChange={(e) => {
                  this.handleInputChange(e.target.name, e.target.checked);
                }}
              />
              Infinity
            </label>
          </div>
        </div>
        <div className="Carousel">
          <div
            className="Carousel__wrapper"
            style={{
              width: itemWidth * frameSize,
            }}
          >
            <div
              id="list"
              className="Carousel__list"
              style={{
                transform: `translateX(-${index * itemWidth}px)`,
                transition: `${animationDuration}ms ease-in-out`,
              }}
            >
              {this.props.images.map((image) => (
                <div
                  key={image}
                >
                  <img
                    src={image}
                    alt={image}
                    style={{
                      width: itemWidth,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="Carousel__button-section">
            <button
              className="buttons"
              type="button"
              onClick={this.handlePrevButton}
            >
              Prev
            </button>
            <button
              className="buttons"
              type="button"
              onClick={this.handleNextButton}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Carousel;

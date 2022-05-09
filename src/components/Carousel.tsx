import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  // infinite: boolean,
}

type State = {
  shift: number,
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    shift: 0,
  };

  scrollLeft = () => {
    const shift = this.props.itemWidth * this.props.step;

    this.setState((prevState) => {
      let addShift = prevState.shift + shift;

      if (addShift
      >= this.props.images.length * this.props.itemWidth) {
        addShift = this.props.images.length * this.props.itemWidth
        - this.props.frameSize * this.props.itemWidth;
      }

      return ({
        shift: addShift,
      });
    });
  };

  scrollRight = () => {
    const shift = this.props.itemWidth * this.props.step;

    this.setState((prevState) => {
      let addShift = prevState.shift - shift;

      if (addShift
      <= 0) {
        addShift = 0;
      }

      return ({
        shift: addShift,
      });
    });
  };

  render() {
    return (
      <>
        <div
          className="carousel"
          style={{
            width: `${this.props.itemWidth * this.props.frameSize}px`,
            height: `${this.props.itemWidth + 4}px`,
          }}
        >
          <div
            className="carousel__container"
            style={{
              transform: `translateX(-${this.state.shift}px)`,
              transition: `transform ${this.props.animationDuration}ms`,
            }}
          >
            {this.props.images.map((image) => (
              <img
                key={image}
                src={image}
                alt={image}
                style={{
                  width: `${this.props.itemWidth}px`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="carousel__buttons">
          <button
            type="button"
            className="carousel__prev-button"
            onClick={this.scrollRight}
            disabled={
              this.state.shift === 0
            }
          >
            {'<'}
          </button>
          <button
            type="button"
            className="carousel__next-button"
            onClick={this.scrollLeft}
            disabled={
              this.state.shift
                >= (this.props.images.length - this.props.frameSize)
                * this.props.itemWidth
            }
          >
            {'>'}
          </button>
        </div>
      </>
    );
  }
}

export default Carousel;

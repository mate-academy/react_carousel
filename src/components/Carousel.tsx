import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  isInfinite: boolean,
}

type State = {
  shift: number,
  // currentIndex: number,
  animationDuration: number,
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    shift: 0,
    // currentIndex: 0,
    animationDuration: 0,
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.itemWidth !== this.props.itemWidth) {
      const howChangeItemWidth = this.props.itemWidth / prevProps.itemWidth;

      this.setState({
        shift: prevState.shift * howChangeItemWidth,
        animationDuration: 0,
      });
    }
  }

  scrollLeft = () => {
    const shift = this.props.itemWidth * this.props.step;

    this.setState((prevState) => {
      let addShift = prevState.shift + shift;

      if (addShift
        >= this.props.images.length * this.props.itemWidth) {
        addShift = 0;
      }

      return ({
        shift: addShift,
        animationDuration: this.props.animationDuration,
      });
    });
  };

  scrollRight = () => {
    const shift = this.props.itemWidth * this.props.step;

    this.setState((prevState) => {
      let addShift = prevState.shift - shift;

      if (addShift < 0 && prevState.shift !== 0) {
        addShift = 0;
      }

      if (addShift < 0 && prevState.shift === 0) {
        addShift = (this.props.images.length - this.props.step)
          * this.props.itemWidth;
      }

      return ({
        shift: addShift,
        animationDuration: this.props.animationDuration,
      });
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      isInfinite,
    } = this.props;

    const { animationDuration } = this.state;

    return (
      <>
        <div
          className="carousel"
          style={{
            width: `${itemWidth * frameSize}px`,
            height: `${itemWidth + 4}px`,
          }}
        >
          <div
            className="carousel__container"
            style={{
              transform: `translateX(-${this.state.shift}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <img
                key={image + String(index)}
                src={image}
                alt={image}
                style={{
                  width: `${itemWidth}px`,
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
              !isInfinite
              && this.state.shift === 0
            }
          >
            {'<'}
          </button>
          <button
            type="button"
            className="carousel__next-button"
            onClick={this.scrollLeft}
            disabled={
              !isInfinite
              && this.state.shift
                >= (images.length - frameSize)
                * itemWidth
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

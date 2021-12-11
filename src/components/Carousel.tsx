import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

type State = {
  start: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    start: this.props.frameSize,
  };

  refElement = React.createRef<HTMLInputElement>();

  width = this.props.itemWidth * this.props.frameSize;

  timerId?: NodeJS.Timer;

  style = {
    width: this.width,
    height: this.width,
  };

  componentDidMount = () => {
    const { itemWidth, animationDuration } = this.props;

    this.timerId = setInterval(() => {
      this.setState(prevState => ({ start: prevState.start + 1 }));
      if (this.refElement && this.refElement.current) {
        this.refElement.current.scrollLeft += itemWidth;
      }
    }, animationDuration);
  };

  scrollLeft = () => {
    const { itemWidth, step } = this.props;

    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.setState(prevState => ({ start: prevState.start - step }));
    if (this.refElement && this.refElement.current) {
      this.refElement.current.scrollLeft -= itemWidth * step;
    }
  };

  scrollRight = () => {
    const { itemWidth, step } = this.props;

    this.setState(prevState => ({ start: prevState.start + step }));
    if (this.refElement && this.refElement.current) {
      this.refElement.current.scrollLeft += itemWidth * step;
    }
  };

  render() {
    const { images, frameSize } = this.props;
    const { start } = this.state;

    return (
      <div className="Carousel">
        <button
          type="button"
          className="Carousel__button"
          disabled={start <= frameSize}
          onClick={this.scrollLeft}
        >
          {'<'}
        </button>
        <div
          ref={this.refElement}
          className="container"
          style={this.style}
        >
          <ul className="Carousel__list">
            {images.map((image) => (
              <li key={image} className="Carousel__image"><img src={image} alt="smile" /></li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="Carousel__button"
          disabled={start >= images.length}
          onClick={this.scrollRight}
        >
          {'>'}
        </button>
      </div>
    );
  }
}

export default Carousel;

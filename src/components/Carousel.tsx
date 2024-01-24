import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

interface State {
  currentIndex: number;
}

class Carousel extends React.Component<Props, State> {
  state: State = {
    currentIndex: 0,
  };

  handleIncrement = () => {
    const { currentIndex } = this.state;
    const {
      images, frameSize, step, infinite,
    } = this.props;
    const lastIndex = images.length - 1;
    let newIndex = currentIndex + step;

    if (infinite) {
      newIndex = newIndex > lastIndex ? 0 : newIndex;
    } else {
      newIndex = Math.min(newIndex, lastIndex - frameSize + 1);
    }

    this.setState({ currentIndex: newIndex });
  };

  handleDecrement = () => {
    const { currentIndex } = this.state;
    const { step, infinite } = this.props;
    let newIndex = currentIndex - step;

    if (infinite) {
      newIndex = newIndex < 0 ? 0 : newIndex;
    } else {
      newIndex = Math.max(newIndex, 0);
    }

    this.setState({ currentIndex: newIndex });
  };

  render() {
    const { images, itemWidth, animationDuration } = this.props;
    const { currentIndex } = this.state;

    const frameStyle = {
      width: `${itemWidth * images.length}px`,
      transition: `transform ${animationDuration}ms ease-in-out`,
      transform: `translateX(-${currentIndex * itemWidth}px)`,
    };

    return (
      <div className="Carousel">
        <div className="Frame" style={frameStyle}>
          {images.map((image, index) => (
            <img key={image} src={image} alt={`Slide ${index + 1}`} style={{ width: `${itemWidth}px` }} />
          ))}
        </div>

        <button
          type="button"
          onClick={this.handleDecrement}
        >
          Prev
        </button>

        <button
          type="button"
          onClick={this.handleIncrement}
          data-cy="next-button"
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

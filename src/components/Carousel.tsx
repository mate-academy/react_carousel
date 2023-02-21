import { Component } from 'react';

import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  currentSlide: number,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    currentSlide: 0,
  };

  handlePrevClick = () => {
    const { currentSlide } = this.state;
    const {
      step,
      images,
      frameSize,
      infinite,
    } = this.props;
    const newSlide = currentSlide - step;

    if (newSlide < 0) {
      if (infinite) {
        this.setState({ currentSlide: images.length - frameSize });
      }
    } else {
      this.setState({ currentSlide: newSlide });
    }
  };

  handleNextClick = () => {
    const { currentSlide } = this.state;
    const {
      step,
      images,
      frameSize,
      infinite,
    } = this.props;

    const newSlide = currentSlide + step;

    if (newSlide > images.length - frameSize) {
      if (infinite) {
        this.setState({ currentSlide: 0 });
      }
    } else {
      this.setState({ currentSlide: newSlide });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;
    const { currentSlide } = this.state;

    const trackStyles = {
      transform: `translateX(-${currentSlide * itemWidth}px)`,
      transition: `transform ${animationDuration}ms ease`,
    };

    return (
      <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
        <ul className="Carousel__list" style={trackStyles}>
          {images.map((imageUrl, index) => (
            <li key={imageUrl} className="Carousel__item">
              <img
                src={imageUrl}
                alt={`item-${index}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.handlePrevClick}>
          Prev
        </button>
        <button
          type="button"
          onClick={this.handleNextClick}
          data-cy="next"
        >
          Next
        </button>
      </div>
    );
  }
}

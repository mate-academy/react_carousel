/* eslint-disable react/no-unused-prop-types */
import { Component } from 'react';
import './Carousel.scss';
import { CarouselItem } from '../CarouselItem/CarouselItem';

interface State {
  currentSlide: number;
}

interface Props {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

export class Carousel extends Component<Props, State> {
  state = {
    currentSlide: 0,
  };

  handlePrev = () => {
    const { currentSlide } = this.state;
    const { step } = this.props;

    if (currentSlide - step >= 0) {
      this.setState({ currentSlide: currentSlide - step });
    }
  };

  handleNext = () => {
    const { currentSlide } = this.state;
    const { images, step } = this.props;

    if (currentSlide + step < images.length) {
      this.setState({ currentSlide: currentSlide + step });
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { currentSlide } = this.state;

    return (
      <div className="carousel" style={{ width: frameSize * itemWidth }}>
        <div className="carousel-inner">
          <ul
            className="Carousel__list"
            style={{
              transform: `translate(${step * itemWidth}px, 0)`,
              transition: `all ${animationDuration}ms ease`,
            }}
          >
            {images.map((image) => (
              <CarouselItem
                key={images.indexOf(image)}
                imageSrc={image}
              />
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button
            type="button"
            onClick={this.handlePrev}
            disabled={
              infinite ? false : currentSlide === 0
            }
          >
            &lt;
          </button>
          <button
            onClick={this.handleNext}
            type="button"
            disabled={
              infinite
                ? false
                : currentSlide === (
                  images.length * itemWidth - frameSize * itemWidth
                ) * -1
            }
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

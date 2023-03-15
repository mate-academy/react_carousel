/* eslint-disable react/no-unused-prop-types */
import { Component } from 'react';
import './Carousel.scss';

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

    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
      animationDuration,
    } = this.props;

    const maxSlide = images.length * itemWidth - frameSize * itemWidth;

    if (currentSlide < 0) {
      if (currentSlide + itemWidth * step > 0) {
        this.setState({ currentSlide: 0 });
      } else {
        this.setState({ currentSlide: currentSlide + itemWidth * step });
      }
    } else if (infinite && currentSlide === 0) {
      this.setState({ currentSlide: -maxSlide });
    } else {
      this.setState({ currentSlide: currentSlide - itemWidth * step });
    }

    const list = document.querySelector('.carousel__list') as HTMLElement;

    if (list) {
      list.style.transition = `transform ${animationDuration}ms ease-in-out`;
      list.style.transform = `translateX(${this.state.currentSlide}px)`;
    }
  };

  handleNext = () => {
    const { currentSlide } = this.state;
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const maxSlide = images.length * itemWidth - frameSize * itemWidth;

    if (currentSlide > -maxSlide) {
      if (currentSlide - itemWidth * step < -maxSlide) {
        this.setState({ currentSlide: 0 });
      } else {
        this.setState({ currentSlide: currentSlide - itemWidth * step });
      }
    } else if (infinite && currentSlide === -maxSlide) {
      this.setState({ currentSlide: 0 });
    }

    // Add sliding animation to the carousel list
    const list = document.querySelector('.carousel__list') as HTMLElement;

    if (list) {
      list.style.transition = `transform ${animationDuration}ms ease-in-out`;
      list.style.transform = `translateX(${this.state.currentSlide}px)`;
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { currentSlide } = this.state;

    return (
      <div className="carousel" style={{ width: frameSize * itemWidth }}>
        <ul
          className="carousel__list"
          style={{
            transform: `translateX(${currentSlide}px)`,
            transition: `all ${animationDuration}ms ease-in-out`,
            width: `${itemWidth * images.length}px`,
          }}
        >
          {images.map(img => (
            <li key={images.indexOf(img)}>
              <img
                src={`${img}`}
                alt="Emojy"
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>

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
            data-cy="next"
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

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
    } = this.props;

    if (currentSlide < 0) {
      if (currentSlide + (itemWidth * step) > 0) {
        this.setState({ currentSlide: 0 });

        return;
      }

      this.setState({ currentSlide: currentSlide + (itemWidth * step) });
    }

    if (infinite && currentSlide === 0) {
      this.setState({
        currentSlide:
        (images.length * itemWidth - frameSize * itemWidth) * -1,
      });
    }
  };

  handleNext = () => {
    const { currentSlide } = this.state;
    const {
      images,
      step,
      frameSize,
      itemWidth,
    } = this.props;

    if (currentSlide
      > (images.length * itemWidth - frameSize * itemWidth) * -1
    ) {
      if (currentSlide - (itemWidth * step)
      < (images.length * itemWidth - frameSize * itemWidth) * -1) {
        this.setState({
          currentSlide:
          (images.length * itemWidth - frameSize * itemWidth) * -1,
        });

        return;
      }

      this.setState({ currentSlide: currentSlide - (itemWidth * step) });
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
        <ul
          className="carousel__list"
          style={{
            transform: `translate(${step * itemWidth}px, 0)`,
            transition: `all ${animationDuration}ms ease`,
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

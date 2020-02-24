import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CarouselItem } from '../CarouselItem/CarouselItem';
import './Carousel.css';

export class Carousel extends PureComponent {
  state = {
    margin: this.props.infinite
      ? -this.props.itemWidth
      : 0,
    counterShowedSlides: this.props.infinite
      ? 2
      : this.props.frameSize,
    transition:
        `transform ${this.props.animationDuration}
        ms cubic-bezier(0.5, 0, 0.96, 1)`,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.step === this.props.step
        || prevProps.frameSize === this.props.frameSize
        || prevProps.itemWidth === this.props.itemWidth
    ) {
      return;
    }

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      transition:
          `transform ${this.props.animationDuration}
        ms cubic-bezier(0.5, 0, 0.96, 1)`,
      counterShowedSlides: this.props.infinite
        ? 2
        : this.props.frameSize,
      margin: this.props.infinite
        ? -this.props.itemWidth * this.props.frameSize
        : 0,
    });
  }

  noInfiniteNext = () => {
    const { images, step, itemWidth, animationDuration } = this.props;
    const { counterShowedSlides, margin } = this.state;
    const { length } = images;
    const newPosition = Math.max(
      margin - itemWidth * step,
      -itemWidth * (length - step),
    );

    if (counterShowedSlides === length) {
      return;
    }

    if (length - counterShowedSlides < step) {
      this.setState(prevState => ({
        transition:
            `transform ${animationDuration}ms cubic-bezier(0.5, 0, 0.96, 1)`,
        counterShowedSlides: length,
        margin:
            prevState.margin
            - itemWidth * (length - counterShowedSlides),
      }));
    } else {
      this.setState(prevState => ({
        transition:
            `transform ${animationDuration}ms cubic-bezier(0.5, 0, 0.96, 1)`,
        counterShowedSlides: prevState.counterShowedSlides + step,
        margin: newPosition,
      }));
    }
  };

  noInfinitePrev = () => {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;
    const { counterShowedSlides } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { length } = images;

    if (counterShowedSlides === frameSize
    || counterShowedSlides < frameSize) {
      return;
    }

    if (counterShowedSlides - step < frameSize
        || counterShowedSlides - frameSize < frameSize
    ) {
      this.setState({
        transition:
            `transform ${animationDuration}ms cubic-bezier(0.5, 0, 0.96, 1)`,
        counterShowedSlides: frameSize,
        margin: 0,
      });
    } else {
      this.setState(prevState => ({
        transition:
            `transform ${animationDuration}ms cubic-bezier(0.5, 0, 0.96, 1)`,
        counterShowedSlides: prevState.counterShowedSlides - step,
        margin: prevState.margin + itemWidth * step,
      }));
    }
  };

  InfiniteNext = () => {
    const { itemWidth,
      animationDuration } = this.props;

    this.setState(prevState => ({
      transition:
            `transform ${animationDuration}ms cubic-bezier(0.5, 0, 0.96, 1)`,
      counterShowedSlides: prevState.counterShowedSlides + 1,
      margin: prevState.margin - itemWidth,
    }));
  }

  InfinitePrev = () => {
    const { itemWidth, animationDuration } = this.props;

    this.setState(prevState => ({
      transition:
          `transform ${animationDuration}ms cubic-bezier(0.5, 0, 0.96, 1)`,
      counterShowedSlides: prevState.counterShowedSlides - 1,
      margin: prevState.margin + itemWidth,
    }));
  }

  handlerTransitionEnd = () => {
    if (this.state.counterShowedSlides === this.props.images.length) {
      this.setState({
        transition: `none`,
        counterShowedSlides: 2,
        margin: -this.props.itemWidth,
      });
    }

    if (this.state.counterShowedSlides === 1) {
      this.setState({
        transition: `none`,
        counterShowedSlides: this.props.images.length - 1,
        margin: this.props.itemWidth * (-this.props.images.length + 2),
      });
    }
  }

  handleNext = () => {
    this.props.infinite
      ? this.InfiniteNext()
      : this.noInfiniteNext();
  }

  handlePrev = () => {
    this.props.infinite
      ? this.InfinitePrev()
      : this.noInfinitePrev();
  }

  render() {
    const {
      images,
      infinite,
      itemWidth,
      frameSize,
    } = this.props;
    const { margin, transition } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <div
          className="Carousel__viewport"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          <ul
            onTransitionEnd={infinite && this.handlerTransitionEnd}
            className="Carousel__list"
            style={{
              transform: `translateX(${margin}px)`,
              width: `${images.length * (itemWidth)}px`,
              transition: `${transition}`,
            }}
          >
            { images.map((img, idx) => (
              <CarouselItem
                key={Math.random().toString()}
                url={img}
                width={itemWidth}
                alt={`img${idx}`}
              />
            ))
            }
          </ul>
        </div>
        <button
          className="btn btn-prev"
          onClick={this.handlePrev}
          type="button"
        >
          Prev
        </button>
        <button
          className="btn btn-next"
          onClick={this.handleNext}
          type="button"
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.number.isRequired,
    }),
  ).isRequired,
  infinite: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired.isRequired,
  animationDuration: PropTypes.string.isRequired,
};

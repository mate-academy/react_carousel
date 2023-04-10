/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
import React from 'react';
import './Carousel.scss';

interface General {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

type Props = General & {
  images: string[];
};

type State = General & {
  prevButtonDisable: boolean;
  nextButtonDisable: boolean;
};

class Carousel extends React.Component<Props, State> {
  state = {
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    prevButtonDisable: true,
    nextButtonDisable: false,
  };

  position = 0;

  count = this.state.frameSize;

  prevButtonClick = () => {
    const {
      step,
      frameSize,
      itemWidth,
    } = this.state;

    this.count -= step;
    this.setState({ nextButtonDisable: false });

    if (this.count <= frameSize) {
      this.count = frameSize;
      this.position = 0;
      this.setState({ prevButtonDisable: true });
    } else {
      this.position += step * itemWidth;
    }
  };

  nextButtonClick = () => {
    const {
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.state;
    const imgAmount = this.props.images.length;

    this.count += step;
    this.setState({ prevButtonDisable: false });
    if (this.count >= imgAmount) {
      if (infinite) {
        this.count -= imgAmount;
        this.position = 0;
      } else {
        this.count = imgAmount;
        this.position = -(imgAmount - frameSize) * itemWidth;
        this.setState({ nextButtonDisable: true });
      }
    } else {
      this.position -= step * itemWidth;
    }
  };

  componentDidUpdate = ({}, prevState: State) => {
    if (this.position === 0) {
      this.count = this.state.frameSize;

      return;
    }

    const difference = this.state.frameSize - prevState.frameSize;

    this.position += difference * this.state.itemWidth;
    this.count += difference;
  };

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      prevButtonDisable,
      nextButtonDisable,
    } = this.state;

    const { images } = this.props;
    let alt = 0;

    return (
      <div className="Carousel">
        <div
          className="Carousel__images-container"
          style={{
            top: `${50 - (itemWidth - 130) / 2}px`,
          }}
        >
          <button
            type="button"
            className="Carousel__prevButton button"
            onClick={this.prevButtonClick}
            disabled={prevButtonDisable}
          />

          <div
            className="Carousel__images"
            style={{
              width: `${itemWidth * frameSize}px`,
              transition: `width ${animationDuration}ms`,
              borderRadius: `${itemWidth / 2}px`,
            }}
          >
            <ul
              className="Carousel__list"
              style={{
                transform: `translateX(${this.position}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            >
              {images.map(img => {
                alt++;

                return (
                  (
                    <li key={`${alt}`} className="Carousel__item">
                      <img
                        src={img}
                        alt={`${alt}`}
                        style={{
                          width: `${itemWidth}px`,
                        }}
                      />
                    </li>
                  )
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            className="Carousel__nextButton button"
            onClick={this.nextButtonClick}
            disabled={nextButtonDisable}
            data-cy="next"
          />
        </div>

        <div
          className="Carousel__settings"
        >
          <label className="Carousel__label"> Step:
            <input
              className="Carousel__input"
              id="step"
              type="number"
              min="1"
              max="10"
              defaultValue={step}
              onInput={(event) => {
                this.setState({ step: +event.currentTarget.value });
              }}
            />
          </label>
          <label className="Carousel__label"> Number of visible images per page:
            <input
              className="Carousel__input"
              id="frameSize"
              type="number"
              min="1"
              max={images.length}
              defaultValue={frameSize}
              onInput={(event) => {
                this.setState({ frameSize: +event.currentTarget.value });
              }}
            />
          </label>
          <label className="Carousel__label"> Image width, [px]:
            <input
              className="Carousel__input"
              id="itemWidth"
              type="number"
              min="50"
              max="250"
              step="5"
              defaultValue={itemWidth}
              onInput={(event) => {
                this.setState({ itemWidth: +event.currentTarget.value });
              }}
            />
          </label>
          <label className="Carousel__label"> Animation duration, [ms]:
            <input
              className="Carousel__input"
              id="animationDuration"
              type="number"
              min="0"
              step="100"
              defaultValue={animationDuration}
              onInput={(event) => {
                this.setState({
                  animationDuration: +event.currentTarget.value,
                });
              }}
            />
          </label>
          <label className="Carousel__label"> Infinite:
            <input
              className="Carousel__input"
              id="infinite"
              type="checkbox"
              defaultChecked={infinite}
              onInput={(event) => {
                this.setState({
                  infinite: event.currentTarget.checked,
                });

                if (this.count === this.props.images.length) {
                  this.setState({
                    nextButtonDisable: !nextButtonDisable,
                  });
                }
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;

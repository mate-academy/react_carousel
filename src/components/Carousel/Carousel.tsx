import { Component } from 'react';
import './Carousel.scss';
import { Button } from '../Button';

type CarouselProps = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  index: number;
};

export class Carousel extends Component<CarouselProps, State> {
  state: State = {
    index: 0,
  };

  handleButtonClick = (step: number) => {
    const {
      images,
      frameSize,
    } = this.props;
    const { index } = this.state;
    const lastIndex = images.length - frameSize;
    const firstIndex = 0;
    let nextIndex = index + step;

    if (step < 0) {
      if (index === firstIndex) {
        nextIndex = lastIndex;
      } else if (nextIndex < firstIndex) {
        nextIndex = firstIndex;
      }
    }

    if (step > 0) {
      if (index === lastIndex) {
        nextIndex = firstIndex;
      } else if (nextIndex > lastIndex) {
        nextIndex = lastIndex;
      }
    }

    this.setState(() => ({
      index: nextIndex,
    }));
  };

  render() {
    const {
      step,
      infinite,
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { index } = this.state;

    const { handleButtonClick } = this;

    const containerWidth = `${frameSize * itemWidth}px`;
    const itemTransform = `translateX(${-index * itemWidth}px)`;
    const disablePrevButton = index <= 0 && !infinite;
    const disableNextButton = index >= images.length - frameSize && !infinite;

    return (
      <div className="carousel">
        <div
          className="carousel__container"
          style={{ width: `${containerWidth}` }}
        >
          <ul
            className="carousel__list"
            style={{ transition: `${animationDuration}ms` }}
          >
            {images.map((image) => (
              <li
                className="carousel__item"
                key={image}
                style={{
                  width: `${itemWidth}px`,
                  transform: `${itemTransform}`,
                  transition: `${animationDuration}ms`,
                }}
              >
                <img
                  src={image}
                  alt="Selected smile"
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="carousel__button-wrapper">
          <Button
            disabled={disablePrevButton}
            onClick={() => handleButtonClick(-step)}
            title="Prev"
          />

          <Button
            disabled={disableNextButton}
            data-cy="next"
            onClick={() => handleButtonClick(step)}
            title="Next"
          />
        </div>
      </div>
    );
  }
}

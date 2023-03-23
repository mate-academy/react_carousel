import React from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

type State = {
  translateX: number;
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    translateX: 0,
  };

  slideRight = () => {
    const { itemWidth, images, frameSize } = this.props;
    const { translateX } = this.state;
    const imagesWithoutFrame = images.length - frameSize;
    const ourStep = this.props.step * itemWidth;

    if (itemWidth * imagesWithoutFrame + translateX === 0) {
      return;
    }

    if (itemWidth * imagesWithoutFrame + translateX < ourStep) {
      this.setState((state) => (
        {
          translateX: state.translateX - (
            itemWidth * imagesWithoutFrame + translateX),
        }
      ));

      return;
    }

    this.setState((state) => (
      {
        translateX: state.translateX - ourStep,
      }
    ));
  };

  slideLeft = () => {
    const { itemWidth } = this.props;
    const { translateX } = this.state;
    const ourStep = this.props.step * itemWidth;

    if (translateX === 0) {
      return;
    }

    if (translateX + ourStep > 0) {
      this.setState((state) => (
        {
          translateX: state.translateX - translateX,
        }
      ));

      return;
    }

    this.setState((state) => (
      {
        translateX: state.translateX + ourStep,
      }
    ));
  };

  render() {
    const { translateX } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;
    const imagesWithoutFrame = images.length - frameSize;

    return (
      <div className="Carousel">
        <button
          type="button"
          className={classNames(
            'button left',
            {
              disabled: translateX === 0,
            },
          )}
          onClick={this.slideLeft}
        >
          <div />
        </button>
        <div className="Carousel__wrapper" style={{ width: `${frameSize * 130}px` }}>
          <ul className="Carousel__list" style={{ transitionDuration: `${animationDuration}ms`, transform: `translateX(${translateX}px)` }}>
            {images.map((image, index) => (
              <li><img src={image} alt={`${index + 1}`} style={{ width: `${itemWidth}px` }} /></li>
            ))}
          </ul>
        </div>
        <button
          data-cy="next"
          type="button"
          className={classNames(
            'button right',
            {
              disabled: (itemWidth * imagesWithoutFrame + translateX) === 0,
            },
          )}
          onClick={this.slideRight}
        >
          <div />
        </button>
      </div>
    );
  }
}

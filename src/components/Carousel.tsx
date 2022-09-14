import React, { CSSProperties } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[],
  ItemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number;
  infinite: boolean;
};

type State = {
  translate: number;
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    translate: 0,
  };

  prev = () => {
    this.slide('left');
  };

  next = () => {
    this.slide('right');
  };

  slide(direction: 'left' | 'right') {
    const carousel = document.getElementById('carousel');

    const symbol = direction === 'right' ? -1 : 1;

    const { translate } = this.state;
    const {
      images,
      ItemWidth,
      frameSize,
      step,
      infinite,
    } = this.props;

    const maxRight = ItemWidth * images.length
      - ItemWidth * frameSize;

    let newTranslate = translate + symbol * (ItemWidth * step);

    if (!(carousel
      && symbol === -1
      ? newTranslate >= -maxRight
      : newTranslate <= 0)) {
      newTranslate = symbol === -1 ? -maxRight : 0;
    }

    if ((symbol === -1 ? translate === -maxRight : translate === 0)
      && infinite) {
      newTranslate = symbol === -1 ? 0 : -maxRight;
    }

    if (carousel) {
      carousel.style.transform = `translateX(${newTranslate}px)`;
    }

    this.setState({ translate: newTranslate });
  }

  render() {
    const {
      ItemWidth,
      frameSize,
      animationDuration,
      infinite,
      images,
    } = this.props;

    const { translate } = this.state;

    const maxRight = ItemWidth * images.length
      - ItemWidth * frameSize;

    const isPrevButtonDisabled = translate === 0 && !infinite;
    const isNextButtonDisabled = translate === -maxRight && !infinite;

    const imageStyle: CSSProperties = {
      width: `${ItemWidth}px`,
    };

    const frameStyle: CSSProperties = {
      width: `${ItemWidth * frameSize}px`,
    };

    const listStyle: CSSProperties = {
      transitionDuration: `${animationDuration}ms`,
    };

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={frameStyle}
        >
          <ul
            id="carousel"
            className="Carousel__list"
            style={listStyle}
          >
            {this.props.images.map(imagePath => {
              const uniqueKey = imagePath.slice(
                imagePath.lastIndexOf('/') + 1,
                imagePath.lastIndexOf('.'),
              );

              return (
                <li key={uniqueKey}>
                  <img
                    src={imagePath}
                    alt={uniqueKey}
                    style={imageStyle}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="buttons">
          <button
            className={classNames(
              'button',
              isPrevButtonDisabled && 'disabled-button',
            )}
            type="button"
            onClick={this.prev}
          >
            ←
          </button>
          <button
            data-cy="next"
            className={classNames(
              'button',
              isNextButtonDisabled && 'disabled-button',
            )}
            type="button"
            onClick={this.next}
          >
            →
          </button>
        </div>
      </div>
    );
  }
}

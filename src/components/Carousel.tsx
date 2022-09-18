import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  transitionDuration: number;
  step: number;
  infinite: boolean;
};

type State = {
  gap: number;
  translation: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    gap: 10,
    translation: 0,
  };

  handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      translation,
      gap,
    } = this.state;
    const {
      itemWidth,
      step,
      frameSize,
      infinite,
      images,
    } = this.props;
    const { buttonType } = event.currentTarget.dataset;
    let goPrev = translation + ((itemWidth + gap) * step);
    let goNext = translation - ((itemWidth + gap) * step);
    const maxWidth = (images.length - frameSize) * (itemWidth + gap);

    if (goNext - frameSize * step < -maxWidth) {
      goNext = -maxWidth;
    }

    if (goPrev - frameSize * step >= 0) {
      goPrev = 0;
    }

    if (buttonType === 'next') {
      this.setState(
        { translation: goNext },
      );

      if (translation === -maxWidth && infinite) {
        this.setState(
          { translation: 0 },
        );
      }
    }

    if (buttonType === 'prev') {
      this.setState(
        { translation: goPrev },
      );

      if (translation === 0 && infinite) {
        this.setState(
          { translation: -maxWidth },
        );
      }
    }
  };

  render() {
    const {
      itemWidth,
      images,
      frameSize,
      transitionDuration,
      infinite,
    } = this.props;

    const {
      gap,
      translation,
    } = this.state;

    const maxWidth = (images.length - frameSize) * (itemWidth + gap);

    return (
      (
        <div className="Carousel">

          <button
            type="button"
            className="Carousel__button"
            data-button-type="prev"
            data-cy="prev"
            onClick={this.handleButton}
            disabled={!infinite && translation === 0}
          >
            «
          </button>

          <ul
            className="Carousel__list"
            style={{ width: `${(itemWidth + gap) * frameSize}px` }}
          >
            {images.map((image, index) => (
              <li
                key={image}
                className="Carousel__image"
                style={{
                  transform: `translateX(${translation}px)`,
                  transitionDuration: `${transitionDuration}ms`,
                }}
              >
                <img
                  src={image}
                  alt={`${index}`}
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="Carousel__button"
            data-button-type="next"
            data-cy="next"
            onClick={this.handleButton}
            disabled={!infinite && translation === -maxWidth}
          >
            »
          </button>
        </div>
      )
    );
  }
}

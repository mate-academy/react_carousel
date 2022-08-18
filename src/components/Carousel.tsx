import React from 'react';
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
  position: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  buttonHandler = (type: string) => {
    const {
      images,
      step,
      infinite,
    } = this.props;

    const { position } = this.state;

    if (type === 'previous') {
      if (position - step >= 0) {
        this.setState({ position: position - step });
      } else if (infinite) {
        this.setState({
          position: (images.length - step),
        });
      }
    }

    if (type === 'next') {
      if ((position + step) < images.length) {
        this.setState({ position: position + step });
      } else if (infinite) {
        this.setState({ position: 0 });
      }
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

    const { position } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          maxWidth: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-position * itemWidth}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {
            images.map((image, index) => (
              <li
                className="Carousel__item"
                style={{
                  minWidth: `${itemWidth}px`,
                  minHeight: `${itemWidth}px`,
                }}
                key={image}
              >
                <img
                  src={image}
                  alt={`pic-${index}`}
                  className="Carousel__img"
                />
              </li>
            ))
          }
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__buttons--prev button is-warning is-medium"
            type="button"
            onClick={() => this.buttonHandler('previous')}
            disabled={(position <= 0) && !infinite}
            aria-label="PREV"
          />

          <button
            className="Carousel__buttons--next button is-warning is-medium"
            type="button"
            data-cy="next"
            onClick={() => this.buttonHandler('next')}
            disabled={(position >= images.length - 1) && !infinite}
            aria-label="NEXT"
          />
        </div>
      </div>
    );
  }
}

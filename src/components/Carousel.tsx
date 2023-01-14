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

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const moveNext = () => {
      if (position === images.length - frameSize && infinite) {
        this.setState({
          position: 0,
        });
      } else {
        this.setState({
          position: Math.min(position + step, images.length - frameSize),
        });
      }
    };

    const movePrev = () => {
      if (position === 0 && infinite) {
        this.setState({
          position: images.length - frameSize,
        });
      } else {
        this.setState({
          position: Math.max(position - step, 0),
        });
      }
    };

    return (
      <div className="Carousel">
        <button
          className="buttons__prev"
          type="button"
          onClick={movePrev}
          disabled={position === 0 && !infinite}
          aria-label="Prev"
        />

        <div
          className="Carousel__container"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          <ul
            className="Carousel__container--list"
            style={{
              transform: `translateX(${-position * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <li
                key={image}
                className="Carousel__item"
                style={{
                  maxWidth: `${itemWidth}px`,
                  minWidth: `${itemWidth}px`,
                }}
              >
                <img
                  className="Carousel__image"
                  src={image}
                  alt={`Emoji ${index.toString()}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          className="buttons__next"
          type="button"
          data-cy="next"
          onClick={moveNext}
          disabled={position + frameSize >= images.length && !infinite}
          aria-label="Next"
        />
      </div>
    );
  }
}

import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  position: number;
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
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
    let { position } = this.state;
    const width = itemWidth * frameSize + 10 * (frameSize - 1);
    const endPosition = (-itemWidth - 10) * (images.length - frameSize);
    const shift = (itemWidth + 10) * step;

    return (
      <div className="Carousel" style={{ width: `${width}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transition: `margin-left ${animationDuration}ms`,
            marginLeft: `${position}px`,
          }}
        >
          {images.map((image) => {
            const nameImage = image.match(/[^\\/]+(?=\.\w+$)/) || '';

            return (
              <li key={images.indexOf(image)}>
                <img
                  src={image}
                  alt={nameImage[0]}
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            onClick={() => {
              if (position === 0 && infinite) {
                position = endPosition;
              } else {
                position += shift;
                position = Math.min(position, 0);
              }

              this.setState({ position });
            }}
            disabled={position === 0 && !infinite}
          >
            ⇦
          </button>
          <button
            type="button"
            data-cy="next"
            onClick={() => {
              if (position === endPosition && infinite) {
                position = 0;
              } else {
                position -= shift;
                position = Math.max(position, endPosition);
              }

              this.setState({ position });
            }}
            disabled={position === endPosition && !infinite}
          >
            ⇨
          </button>
        </div>
      </div>
    );
  }
}

import React from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  translate: number;
};

export class Carousel extends React.Component<CarouselProps, State> {
  state = {
    translate: 0,
  };

  render() {
    const { translate } = this.state;
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const prev = () => {
      this.setState({ translate: translate + (itemWidth + 20) * step });

      if (translate > -((itemWidth + 20) * frameSize)) {
        this.setState({ translate: 0 });
      }
    };

    const next = () => {
      this.setState({ translate: translate - (itemWidth + 20) * step });

      if (translate <= -((itemWidth + 20)
      * (images.length - frameSize - 1))) {
        this.setState({
          translate: -((itemWidth + 20)
           * (images.length - frameSize)),
        });
      }
    };

    return (
      <div className="Carousel">
        {translate >= 0
          ? (
            <button
              className="disabled"
              type="button"
              onClick={prev}
            >
              &larr;
            </button>
          )
          : <button type="button" onClick={prev}>&larr;</button>}
        <ul
          style={{
            width: (itemWidth + 20) * frameSize,
          }}
          className="Carousel__list"
        >
          {images.map(image => (
            <li
              key={image}
              style={{
                transition: `transform ${animationDuration / 1000}s ease-in-out`,
                transform: `translateX(${translate}px)`,
                animation: `slide ${animationDuration / 100}s ${infinite}`,
              }}
            >
              <img
                src={image}
                alt={image.slice(6, 7)}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        {translate <= -1000
          ? (
            <button
              className="disabled"
              type="button"
              onClick={next}
            >
              &rarr;
            </button>
          )
          : <button data-cy="next" type="button" onClick={next}>&rarr;</button>}

      </div>
    );
  }
}

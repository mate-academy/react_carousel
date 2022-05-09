import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  step: number;
  infinite: boolean;
};

type State = {
  position: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  scrollNext = () => {
    const {
      frameSize,
      itemWidth,
      step,
      images,
      infinite,
    } = this.props;
    const { position } = this.state;
    let way = 0;

    way = position + itemWidth * step;

    if (position + step * itemWidth >= images.length * itemWidth - itemWidth
      || infinite) {
      way = images.length * itemWidth - frameSize * itemWidth;
    }

    if (position + frameSize * itemWidth >= images.length * itemWidth
       - itemWidth) {
      way = position + itemWidth;
    }

    if (position + frameSize * itemWidth >= images.length * itemWidth) {
      way = position;
    }

    this.setState({
      position: way,
    });
  };

  scrollPrev = () => {
    const {
      itemWidth,
      step,
      infinite,
    } = this.props;
    const { position } = this.state;
    let way = position - itemWidth * step;

    if (position - itemWidth * step < 0 || infinite === true) {
      way = 0;
    }

    this.setState({
      position: way,
    });
  };

  render() {
    const { position } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-position}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image) => (
            <li key={image}>
              <img
                src={image}
                alt={image}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__nav" style={{ width: itemWidth * frameSize }}>
          <button
            className="Carousel__prev"
            type="button"
            onClick={this.scrollPrev}
          >
            &apos;
          </button>
          <button
            className="Carousel__next"
            type="button"
            onClick={this.scrollNext}
          >
            &apos;
          </button>
        </div>
      </div>
    );
  }
}

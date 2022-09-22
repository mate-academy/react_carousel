import React from 'react';
import './Carousel.scss';

type State = {
  shiftX: number,
};

type Images = {
  images: string[];
};

export class Carousel extends React.Component<Images, State> {
  state: State = {
    shiftX: 0,
  };

  render() {
    const { shiftX } = this.state;
    const { images } = this.props;
    const imgWidth = 130;
    const shiftAmount = 3;
    const smallScrollRightPoint = -780;
    const smallScrollLeftPoint = -130;
    const disableRightPoint = -910;
    const disableLeftPoint = 0;

    const handlerPrev = () => {
      this.setState({
        shiftX: (shiftX === smallScrollLeftPoint
          ? shiftX + imgWidth
          : shiftX + imgWidth * shiftAmount),
      });
    };

    const handlerNext = () => {
      this.setState({
        shiftX: (shiftX === smallScrollRightPoint
          ? shiftX - imgWidth
          : shiftX - imgWidth * shiftAmount),
      });
    };

    return (
      <div className="Carousel">
        <ul className="Carousel__list">
          <div
            className="Container"
            style={{
              transform: `translateX(${shiftX}px)`,
            }}
          >
            {images.map((image: string, index: number) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`${index} + ${1}`}
                  className="Carousel__img"
                />
              </li>
            ))}
          </div>
        </ul>
        <button
          type="button"
          className="Prev"
          disabled={shiftX === disableLeftPoint}
          onClick={() => handlerPrev()}
        >
          Prev
        </button>
        <button
          type="button"
          className="Next"
          disabled={shiftX === disableRightPoint}
          onClick={() => handlerNext()}
        >
          Next
        </button>

      </div>
    );
  }
}

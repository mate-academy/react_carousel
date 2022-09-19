import React from 'react';
import './Carousel.scss';

type State = {
  shiftX: number,
  imgWidth: number,
  shiftAmount: number,
  smallScrollRightPoint: number,
  smallScrollLeftPoint: number,
  disableRightPoint: number,
  disableLeftPoint: number,
};

type Images = {
  images: string[];
};

export class Carousel extends React.Component<Images, State> {
  state = {
    shiftX: 0,
    imgWidth: 130,
    shiftAmount: 3,
    smallScrollRightPoint: -780,
    smallScrollLeftPoint: -130,
    disableRightPoint: -910,
    disableLeftPoint: 0,
  };

  render() {
    const {
      shiftX, imgWidth, shiftAmount,
      smallScrollRightPoint, smallScrollLeftPoint,
      disableRightPoint, disableLeftPoint,
    } = this.state;

    return (
      <div className="Carousel">
        <ul className="Carousel__list">
          <div
            className="Container"
            style={{
              transform: `translateX(${shiftX}px)`,
            }}
          >
            {this.props.images.map((image: string, index: number) => (
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
          onClick={() => {
            this.setState({
              shiftX: (shiftX === smallScrollLeftPoint
                ? shiftX + imgWidth
                : shiftX + imgWidth * shiftAmount),
            });
          }}
        >
          Prev
        </button>
        <button
          type="button"
          className="Next"
          disabled={shiftX === disableRightPoint}
          onClick={() => {
            this.setState({
              shiftX: (shiftX === smallScrollRightPoint
                ? shiftX - imgWidth
                : shiftX - imgWidth * shiftAmount),
            });
          }}
        >
          Next
        </button>

      </div>
    );
  }
}

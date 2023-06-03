import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
};

type State = {
  itemIndex: number,
};

export class Carousel extends Component<Props, State> {
  state = {
    itemIndex: 0,
  };

  handleButton = (step: number) => () => {
    const { images, frameSize } = this.props;
    const { itemIndex } = this.state;
    const firstInd = 0;
    const lastInd = images.length - frameSize;
    let nextInd = itemIndex + step;

    if (step > 0) {
      if (itemIndex === lastInd) {
        nextInd = firstInd;
      } else if (nextInd > lastInd) {
        nextInd = lastInd;
      }
    }

    if (step < 0) {
      if (itemIndex === firstInd) {
        nextInd = lastInd;
      } else if (nextInd < firstInd) {
        nextInd = firstInd;
      }
    }

    this.setState(() => ({
      itemIndex: nextInd,
    }));
  };

  render() {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      animationDuration,
      infinity,
    } = this.props;

    const { itemIndex } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {
            images.map((img, ind) => {
              return (
                <li
                  key={img}
                  className="Carusel__item"
                  style={{
                    transform: `translateX(${-itemIndex * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    src={img}
                    alt={`${ind + 1}`}
                    width={itemWidth}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="Carousel__button">
          <button
            type="button"
            className="Carousel__btn"
            disabled={itemIndex <= 0 && !infinity}
            onClick={this.handleButton(-step)}
          >
            &#8678;
          </button>
          <button
            type="button"
            data-cy="next"
            className="Carousel__btn"
            disabled={itemIndex >= images.length - frameSize && !infinity}
            onClick={this.handleButton(step)}
          >
            &#8680;
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

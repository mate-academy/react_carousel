import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  move: number;
  countMove: number;
};

export class Carousel extends Component<Props, State> {
  state = {
    move: 0,
    countMove: this.props.images.length,
  };

  handleRightSlide = () => {
    const { itemWidth, step } = this.props;
    const { move, countMove } = this.state;
    const scrollNumber = move + (itemWidth * step);

    if (countMove === step) {
      return;
    }

    if ((countMove - step) < step) {
      this.setState({
        countMove: step,
        move: move + (itemWidth * (countMove - step)),
      });
    } else {
      this.setState({
        countMove: countMove - step,
        move: scrollNumber,
      });
    }
  };

  handleLefttSlide = () => {
    const { itemWidth, step, images } = this.props;
    const { move, countMove } = this.state;
    const scrollNumber = move - (itemWidth * step);

    if (countMove === images.length) {
      return;
    }

    if ((countMove + step) > images.length) {
      this.setState({
        countMove: images.length,
        move: move - (itemWidth * (images.length - countMove)),
      });
    } else {
      this.setState({
        countMove: countMove + step,
        move: scrollNumber,
      });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const { move } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: itemWidth * frameSize,
        }}
      >
        <ul
          className={infinite
            ? `Carousel__list ${infinite && 'Carousel__list--animation'}`
            : 'Carousel__list'}
          style={{
            transform: `translate(${-move}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, i) => {
            return (
              <li
                key={img}
                className="Carousel__item"
              >
                <img
                  src={img}
                  width={itemWidth}
                  alt={(i + 1).toString()}
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__buttons">
          <button
            type="button"
            onClick={this.handleRightSlide}
            data-cy="next"
          >
            Next
          </button>

          <button
            type="button"
            onClick={this.handleLefttSlide}
          >
            Prev
          </button>
        </div>
      </div>
    );
  }
}

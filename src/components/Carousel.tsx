import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  animationDuration: number,
  frameSize: number,
  itemWidth: number,
};

type State = {
  transform: string;
};

class Carousel extends Component<Props, State > {
  state = {
    transform: 'translateX(0px)',
  };

  x = 0;

  gap = 10;

  first = true;

  last = false;

  handlePrevBtn = (step: number, itemWidth: number) => {
    this.x += step * itemWidth + (step * this.gap);
    this.last = false;
    if (this.x >= 0) {
      this.first = true;
      this.x = 0;
    }

    this.setState({ transform: `translateX(${this.x}px)` });
  };

  handleNextBtn = (step: number, itemWidth: number, length: number) => {
    this.x -= step * itemWidth + (step * this.gap);
    this.first = false;
    const max = -((itemWidth + this.gap) * length);

    if (this.x <= max) {
      this.last = true;
      this.x = max;
    }

    this.setState({ transform: `translateX(${this.x}px)` });
  };

  render() {
    const {
      images,
      step,
      animationDuration,
      itemWidth,
      frameSize,
    } = this.props;
    const { transform } = this.state;

    const width = frameSize * itemWidth + (this.gap * (frameSize - 1));

    return (
      <div
        className="Carousel"
        style={{ width: `${width}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `${transform}`,
            transition: `transform ${animationDuration}ms`,
            gap: `${this.gap}px`,
          }}
        >
          {images.map((el, i) => (
            <li key={el}>
              <img
                src={el}
                alt={`${i}`}
                height={itemWidth}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className={`Carousel__btn prev-btn ${this.first && 'disabled'}`}
          style={{
            background: 'url("./img/arrow-left.svg")0 0/ cover no-repeat',
          }}
          onClick={() => this.handlePrevBtn(
            step,
            itemWidth,
          )}
        />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          data-cy="next"
          className={`Carousel__btn next-btn ${this.last && 'disabled'}`}
          style={{
            background: 'url("./img/arrow-right.svg")0 0/ cover no-repeat',
          }}
          onClick={() => this.handleNextBtn(
            step,
            itemWidth,
            (images.length - frameSize),
          )}
        />
      </div>
    );
  }
}

export default Carousel;

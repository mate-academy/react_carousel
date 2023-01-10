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
  transformX: number;
  x: number;
  gap: number;
  first: boolean;
  last: boolean;
};

class Carousel extends Component<Props, State > {
  state = {
    transformX: 0,
    x: 0,
    gap: 10,
    first: true,
    last: false,
  };

  handlePrevBtn = (step: number, itemWidth: number) => {
    this.setState((prev) => (
      { x: prev.x + step * itemWidth + (step * prev.gap) }
    ));
    this.setState({ last: false });

    if (this.state.x >= 0) {
      this.setState({ first: true });
      this.setState({ x: 0 });
    }

    this.setState(prev => ({ transformX: prev.x }));
  };

  handleNextBtn = (step: number, itemWidth: number, length: number) => {
    this.setState((prev) => (
      { x: prev.x - step * itemWidth + (step * prev.gap) }
    ));
    this.setState({ first: false });

    const max = -((itemWidth + this.state.gap) * length);

    if (this.state.x <= max) {
      this.setState({ last: true });
      this.setState({ x: max });
    }

    this.setState(prev => ({ transformX: prev.x }));
  };

  render() {
    const {
      images,
      step,
      animationDuration,
      itemWidth,
      frameSize,
    } = this.props;
    const {
      transformX,
      gap,
      first,
      last,
    } = this.state;

    const width = frameSize * itemWidth + (gap * (frameSize - 1));

    return (
      <div
        className="Carousel"
        style={{ width: `${width}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${transformX}px)`,
            transition: `transform ${animationDuration}ms`,
            gap: `${gap}px`,
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
          className={`Carousel__btn prev-btn ${first && 'disabled'}`}
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
          className={`Carousel__btn next-btn ${last && 'disabled'}`}
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

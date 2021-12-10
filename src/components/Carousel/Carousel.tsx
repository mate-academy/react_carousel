import React from 'react';
import classNames from 'classnames';
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
  scroll: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
  };

  getScrollMax = () => {
    const {
      images,
      step,
      itemWidth,
    } = this.props;

    const scrollMax = (images.length * itemWidth) - (step * itemWidth);

    return scrollMax;
  };

  onClick = (action: string) => {
    const { infinite, step, itemWidth } = this.props;

    this.setState((state: State) => {
      let { scroll } = state;

      if (infinite && scroll === this.getScrollMax()) {
        return { scroll: 0 };
      }

      scroll = (action === 'prev') ? (scroll - step * itemWidth) : (scroll + step * itemWidth);

      scroll = scroll > this.getScrollMax() ? this.getScrollMax() : scroll;
      scroll = scroll < 0 ? 0 : scroll;

      return { scroll };
    });
  };

  render() {
    const {
      frameSize,
      itemWidth,
      images,
      animationDuration,
    } = this.props;

    const {
      scroll,
    } = this.state;

    return (
      <div
        className="Carousel"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-scroll}px)`,
            width: `${images.length * itemWidth}px`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image: string, i: number) => (
            <li key={+i}>
              <img
                src={image}
                alt="1"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button
            className={classNames('button', { buttonDisabled: scroll !== 0 })}
            type="button"
            onClick={() => {
              this.onClick('prev');
            }}
          >
            ←
          </button>
          <button
            className={classNames('button', { buttonDisabled: scroll !== this.getScrollMax() })}
            type="button"
            onClick={() => {
              this.onClick('next');
            }}
          >
            →
          </button>
        </div>
      </div>
    );
  }
}

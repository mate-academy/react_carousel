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
  scrollInfinite: number,
  count: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
    scrollInfinite: 0,
    count: 0,
  };

  componentDidMount() {
    const {
      frameSize,
      animationDuration,
    } = this.props;

    setInterval(() => {
      this.setState((state: State) => {
        let { scrollInfinite, count } = state;

        scrollInfinite = count > 0 ? scrollInfinite - frameSize : scrollInfinite + frameSize;

        if (scrollInfinite >= this.getScrollMax()) {
          scrollInfinite = this.getScrollMax();

          count += 1;
        }

        if (scrollInfinite <= 0) {
          scrollInfinite = 0;

          count = 0;
        }

        return ({ scrollInfinite, count });
      });
    }, animationDuration);
  }

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
    let { scroll } = this.state;
    const {
      frameSize,
    } = this.props;

    scroll = (action === 'prev') ? (scroll - frameSize) : (scroll + frameSize);

    scroll = scroll > this.getScrollMax() ? this.getScrollMax() : scroll;
    scroll = scroll < 0 ? 0 : scroll;
    this.setState({ scroll });
  };

  render() {
    const {
      frameSize,
      itemWidth,
      infinite,
      images,
    } = this.props;

    const {
      scrollInfinite,
      scroll,
    } = this.state;

    return (
      <div
        className="Carousel"
        style={{ width: `${frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={infinite
            ? {
              transform: `translateX(${-scrollInfinite}px)`,
              width: `${images.length * itemWidth}px`,
            }
            : {
              transform: `translateX(${-scroll}px)`,
              width: `${images.length * itemWidth}px`,
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

import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinity: boolean,
};

type State = {
  currentItemIndex: number,
};

class Carousel extends Component<Props, State> {
  state = {
    currentItemIndex: 0,
  };

  handleNavButton = (step: number) => {
    const lastItemIndex = this.props.images.length - 1;
    let overflowIndexItem = 0;

    let currentItemIndex: number = this.state.currentItemIndex + step;

    if (step < 0) {
      overflowIndexItem = this.props.infinity ? lastItemIndex : 0;
      currentItemIndex = currentItemIndex < 0
        ? overflowIndexItem
        : currentItemIndex;
    } else {
      overflowIndexItem = this.props.infinity ? 0 : lastItemIndex;
      currentItemIndex = currentItemIndex > lastItemIndex
        ? overflowIndexItem
        : currentItemIndex;
    }

    this.setState(() => ({
      currentItemIndex,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { currentItemIndex } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: frameSize * itemWidth,
            transition: `${animationDuration}ms`,
            borderRadius: `${itemWidth}px`,
            border: '6px solid grey',
          }}
        >
          {
            images.map((img) => {
              return (
                <li
                  className="Carousel__item"
                  key={img}
                  style={{
                    transform: `translateX(${-currentItemIndex * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    width={itemWidth}
                    src={img}
                    alt={img}
                  />
                </li>
              );
            })
          }
        </ul>
        <div>
          <button
            disabled={currentItemIndex <= 1 && !this.props.infinity}
            type="button"
            onClick={() => {
              this.handleNavButton(-step);
            }}
          >
            Prev item
          </button>
          <button
            data-cy="next"
            disabled={
              currentItemIndex >= images.length - 1 && !this.props.infinity
            }
            type="button"
            onClick={() => {
              this.handleNavButton(step);
            }}
          >
            Next item
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

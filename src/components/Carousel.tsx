import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
  itemWidth: number,
};
type State = {
  itemOffset: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    itemOffset: 0,
  };

  clickNext = () => {
    const {
      itemWidth, images, infinite, frameSize,
    } = this.props;
    let { step } = this.props;
    const { itemOffset } = this.state;
    const imagesToHide = (images.length - frameSize) * itemWidth;

    if ((itemOffset / itemWidth) - step >= -(images.length - frameSize)) {
      this.setState({ itemOffset: itemOffset - (itemWidth * step) });

      return;
    }

    step = (imagesToHide - Math.abs(itemOffset)) / itemWidth;
    this.setState({ itemOffset: itemOffset - (itemWidth * step) });
    if (infinite
      && Math.abs(itemOffset) >= itemWidth * (images.length - frameSize)) {
      this.setState({ itemOffset: 0 });
    }
  };

  clickPrev = () => {
    const {
      itemWidth, images, infinite, frameSize,
    } = this.props;
    let { step } = this.props;
    const { itemOffset } = this.state;
    const imagesToHide = (images.length - frameSize) * itemWidth;

    if (imagesToHide - Math.abs(itemOffset) <= itemWidth * step) {
      this.setState({ itemOffset: itemOffset + (itemWidth * step) });

      return;
    }

    step = Math.abs(0 - Math.abs(itemOffset) / itemWidth);
    this.setState({ itemOffset: itemOffset + (itemWidth * step) });

    if (infinite && itemOffset === 0) {
      this.setState({
        itemOffset: -(itemOffset + ((images.length - frameSize) * itemWidth)),
      });
    }
  };

  render() {
    const { itemOffset } = this.state;
    const {
      itemWidth, images, frameSize, animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >

        <ul
          className="Carousel__list"
          style={{ transform: `translateX(${itemOffset}px)`, transition: `${animationDuration}ms` }}
        >
          {images.map((image: string, i: number) => {
            return (
              <li className="Carousel__item" key={image}>
                <img
                  width={itemWidth}
                  className="item"
                  src={image}
                  alt={String(i + 1)}
                />
              </li>
            );
          })}
        </ul>

        <button
          onClick={this.clickPrev}
          type="button"
        >
          Prev
        </button>
        <button
          onClick={this.clickNext}
          type="button"
          data-cy="next"
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

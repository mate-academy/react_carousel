import React from 'react';
import './Carousel.scss';

type State = {
  move: number,
  remainPictures: number;
};

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

class Carousel extends React.Component<Props, State> {
  remain = this.props.images.length - this.props.frameSize;

  state: Readonly<State> = {
    move: 0,
    remainPictures: this.remain,
  };

  timerId = setInterval(() => {
    this.nextSlide();
  }, this.props.animationDuration);

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    if (frameSize !== prevProps.frameSize
      || itemWidth !== prevProps.itemWidth
      || animationDuration !== prevProps.animationDuration) {
      this.setState({
        move: 0,
        remainPictures: images.length - frameSize,
      });

      clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        this.nextSlide();
      }, this.props.animationDuration);
    }

    if (animationDuration === 0) {
      clearInterval(this.timerId);
    }
  }

  nextSlide = () => {
    const { remainPictures } = this.state;
    const {
      step,
      infinite,
      itemWidth,
      images,
      frameSize,
    } = this.props;

    if (remainPictures === 0 && !infinite) {
      return;
    }

    if (remainPictures === 0 && infinite) {
      this.setState({
        move: 0,
        remainPictures: images.length - frameSize,
      });

      return;
    }

    if (remainPictures >= step) {
      this.setState(prevState => (
        {
          remainPictures: prevState.remainPictures - step,
          move: prevState.move + itemWidth * step,
        }));
    } else {
      this.setState(prevState => (
        {
          move: prevState.move + itemWidth * prevState.remainPictures,
          remainPictures: 0,
        }));
    }
  };

  prevSlide = () => {
    const {
      images,
      step,
      frameSize,
      infinite,
      itemWidth,
    } = this.props;
    const { remainPictures } = this.state;

    if (remainPictures === (images.length - frameSize) && infinite) {
      this.setState({
        move: itemWidth * remainPictures,
        remainPictures: 0,
      });

      return;
    }

    if ((images.length - frameSize - remainPictures) >= step) {
      this.setState(prevState => (
        {
          remainPictures: prevState.remainPictures + step,
          move: prevState.move - itemWidth * step,
        }));
    } else {
      this.setState(
        {
          remainPictures: images.length - frameSize,
          move: 0,
        },
      );
    }
  };

  render() {
    const { move, remainPictures } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    return (
      <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
        <ul className="Carousel__list">
          {images.map((image, index) => {
            const key = index + 1;

            return (
              (
                <li
                  className="Carousel__item"
                  style={{ transform: `translateX(-${move}px)` }}
                  key={key}
                >
                  <img
                    src={image}
                    alt={String(index + 1)}
                    style={{ width: `${itemWidth}px` }}
                  />
                </li>
              )
            );
          })}
        </ul>

        <div className="Carousel__buttons arrow-1">
          <button
            type="button"
            onClick={this.prevSlide}
            className="button button__prev"
            disabled={remainPictures === images.length - frameSize && !infinite}
            data-cy="next"
          >
            ᐸ
          </button>
          <button
            type="button"
            onClick={this.nextSlide}
            className="button button__next"
            disabled={remainPictures === 0 && !infinite}
          >
            ᐳ
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

import React from 'react';
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
  scroll: number;
  hiddenImages: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
    hiddenImages: this.props.images.length - this.props.frameSize,
  };

  listSize = this.props.frameSize * this.props.itemWidth;

  prevScroll = () => {
    const { hiddenImages } = this.state;
    const {
      images, step, itemWidth, frameSize, infinite,
    } = this.props;

    if (hiddenImages === (images.length - frameSize) && infinite) {
      this.setState({ scroll: itemWidth * hiddenImages, hiddenImages: 0 });

      return;
    }

    if (hiddenImages === (images.length - frameSize) && !infinite) {
      return;
    }

    if ((images.length - frameSize - hiddenImages) >= step) {
      this.setState(prevState => ({
        hiddenImages: prevState.hiddenImages + step,
        scroll: prevState.scroll - (itemWidth * step),
      }));
    } else {
      this.setState({ scroll: 0, hiddenImages: images.length - frameSize });
    }
  };

  nextScroll = () => {
    const { hiddenImages } = this.state;
    const {
      images, step, itemWidth, frameSize, infinite,
    } = this.props;

    if (hiddenImages === 0 && infinite) {
      this.setState({ scroll: 0, hiddenImages: images.length - frameSize });

      return;
    }

    if (hiddenImages === 0 && !infinite) {
      return;
    }

    if (hiddenImages >= step) {
      this.setState(prevState => ({
        hiddenImages: prevState.hiddenImages - step,
        scroll: prevState.scroll + (itemWidth * step),
      }));
    } else {
      this.setState(prevState => ({
        scroll: prevState.scroll + (itemWidth * prevState.hiddenImages),
        hiddenImages: 0,
      }));
    }
  };

  render() {
    const { scroll, hiddenImages } = this.state;
    const {
      images, itemWidth, animationDuration, frameSize, infinite,
    } = this.props;

    return (
      <div className="Carousel">
        <ul className="Carousel__list" style={{ width: `${frameSize * itemWidth}px` }}>
          {images.map((image, index) => {
            return (
              <>
                <li
                  className="Carousel__item"
                  key={String(index + 1)}
                  style={{ transform: `translateX(-${scroll}px)`, transition: `${animationDuration}ms` }}
                >
                  <img src={image} alt={String(index + 1)} style={{ width: `${itemWidth}px` }} />
                </li>
              </>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button Carousel__button--prev"
            disabled={hiddenImages === (images.length - frameSize) && !infinite}
            onClick={this.prevScroll}
          >
            <div />
          </button>

          <button
            type="button"
            className="Carousel__button Carousel__button--next"
            data-cy="next"
            disabled={hiddenImages === 0 && !infinite}
            onClick={this.nextScroll}
          >
            <div />
          </button>
        </div>
      </div>
    );
  }
}

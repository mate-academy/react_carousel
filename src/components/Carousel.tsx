import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  scroll: number,
  hiddenImages: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
    hiddenImages: this.props.images.length - this.props.frameSize,
  };

  handleForward = () => {
    const { hiddenImages } = this.state;
    const {
      images,
      step,
      itemWidth,
      frameSize,
      infinite,
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

  handleBackward = () => {
    const { hiddenImages } = this.state;
    const {
      images,
      step,
      itemWidth,
      frameSize,
      infinite,
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

  render() {
    const { scroll, hiddenImages } = this.state;
    const {
      images,
      itemWidth,
      animationDuration,
      frameSize,
      infinite,
    } = this.props;

    return (
      <div className="Carousel">
        <ul className="Carousel__list" style={{ width: `${frameSize * itemWidth}px` }}>
          {images.map((image, index) => {
            return (
              <>
                <li
                  className="Carousel__item"
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{
                    transform: `translate(-${scroll}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    src={image}
                    alt={`${index}`}
                    style={{ width: `${itemWidth}px` }}
                  />
                </li>
              </>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button Carousel__button--backward"
            disabled={hiddenImages === (images.length - frameSize) && !infinite}
            onClick={this.handleBackward}
          >
            {'<'}
          </button>

          <button
            type="button"
            data-cy="next"
            className="Carousel__button Carousel__button--forward"
            disabled={hiddenImages === 0 && !infinite}
            onClick={this.handleForward}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

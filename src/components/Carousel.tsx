import React from 'react';
import './Carousel.scss';

type State = {
  position: number,
  currentStartImg: number,
};

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
    currentStartImg: 0,
  };

  static getDerivedStateFromProps(props:Props, state:State) {
    return {
      position: state.currentStartImg * props.itemWidth,
    };
  }

  moveSliderRigth = () => {
    const {
      images,
      step,
      frameSize,
      infinite,
    } = this.props;

    const imagesLength = images.length;
    const lastSlidePosition = imagesLength - frameSize;

    this.setState((prevState) => {
      const prevCurrentStartImg = prevState.currentStartImg;
      const slideWidth = step;

      if (prevCurrentStartImg === lastSlidePosition && infinite) {
        return ({
          currentStartImg: 0,
        });
      }

      if (prevCurrentStartImg + slideWidth > lastSlidePosition) {
        return ({
          currentStartImg: lastSlidePosition,
        });
      }

      return ({
        currentStartImg: prevCurrentStartImg + step,
      });
    });
  };

  moveSliderLeft = () => {
    const {
      images,
      step,
      frameSize,
      infinite,
    } = this.props;

    const imagesLength = images.length;
    const lastSlidePosition = imagesLength - frameSize;
    const lastSlideWidth = imagesLength % frameSize;

    this.setState((prevState) => {
      const prevCurrentStartImg = prevState.currentStartImg;
      const slideWidth = step;

      if (prevCurrentStartImg === 0 && infinite) {
        return ({
          currentStartImg: lastSlidePosition,
        });
      }

      if (prevCurrentStartImg === lastSlideWidth
        || prevCurrentStartImg < slideWidth) {
        return ({
          currentStartImg: 0,
        });
      }

      return ({
        currentStartImg: prevCurrentStartImg - step,
      });
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translate(-${this.state.position}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
        <div className="buttons">
          <button
            className="buttons__button buttons__button--right"
            type="button"
            onClick={() => {
              this.moveSliderLeft();
            }}
          >
            {' '}
          </button>
          <button
            className="buttons__button buttons__button--left"
            type="button"
            data-cy="next"
            onClick={() => {
              this.moveSliderRigth();
            }}
          >
            {' '}
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

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

enum ControlButton {
  Prev,
  Next,
}

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

  moveSlider = (buttonName: ControlButton) => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const imagesLength = itemWidth * images.length;
    const lastSlidePosition = imagesLength - (frameSize * itemWidth);
    const lastSlideWidth = (images.length % frameSize) * itemWidth;

    this.setState((prevState) => {
      const prevPosition = prevState.position;
      const slideWidth = step * itemWidth;

      if (buttonName === ControlButton.Next) {
        if (prevPosition === lastSlidePosition && infinite) {
          return ({
            position: 0,
            currentStartImg: 0,
          });
        }

        if (prevPosition + slideWidth > lastSlidePosition) {
          return ({
            position: lastSlidePosition,
            currentStartImg: images.length - step,
          });
        }

        return ({
          position: prevPosition + slideWidth,
          currentStartImg: prevState.currentStartImg + step,
        });
      }

      if (buttonName === ControlButton.Prev) {
        if (prevPosition === 0 && infinite) {
          return ({
            position: lastSlidePosition,
            currentStartImg: images.length - step,
          });
        }

        if (prevPosition === lastSlideWidth || prevPosition < slideWidth) {
          return ({
            position: 0,
            currentStartImg: 0,
          });
        }

        return ({
          position: prevPosition - slideWidth,
          currentStartImg: prevState.currentStartImg - step,
        });
      }

      return ({
        position: 0,
        currentStartImg: prevState.currentStartImg + step,
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
              this.moveSlider(ControlButton.Prev);
            }}
          >
            {' '}
          </button>
          <button
            className="buttons__button buttons__button--left"
            type="button"
            data-cy="next"
            onClick={() => {
              this.moveSlider(ControlButton.Next);
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

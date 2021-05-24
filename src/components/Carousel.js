import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    imagesOrder: [...this.props.images],
    gap: 50,
    shift: 0,
    transitionNeed: true,
    direction: null,
    shiftCounter: 1,
    shiftLimit: Math.ceil(this.props.images.length / this.props.step),
    rightRemainder: this.props.images.length - this.props.step,
    leftRemainder: 0,
  }

  componentDidUpdate(prevProps) {
    if (this.state.direction === 'left') {
      setTimeout(() => {
        this.setState(({ imagesOrder: prevImagesOrder }) => ({
          imagesOrder: [...prevImagesOrder.slice(0, -prevProps.step)],
          shift: 0,
          transitionNeed: true,
          direction: null,
        }));
      }, 0);
    }

    if (this.state.direction === 'right') {
      setTimeout(() => {
        this.setState(({ imagesOrder: prevImagesOrder }) => ({
          imagesOrder: [...prevImagesOrder.slice(prevProps.step)],
          shift: 0,
          transitionNeed: false,
          direction: null,
        }));
      }, this.props.animationDuration);
    }
  }

  blockButtons = (duration) => {
    const buttons = document.querySelectorAll('.Carousel__button');

    buttons.forEach(button => button.setAttribute('disabled', 'disabled'));

    setTimeout(() => {
      buttons.forEach(button => button.removeAttribute('disabled'));
    }, duration);
  }

  prevImage = () => {
    const {
      step,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    if (infinite) {
      this.blockButtons(animationDuration);

      this.setState(({
        imagesOrder: prevImagesOrder,
        gap,
        shift: prevShift,
      }) => ({
        imagesOrder: [
          ...prevImagesOrder.slice(-step),
          ...prevImagesOrder,
        ],
        shift: prevShift - ((itemWidth + gap) * step),
        transitionNeed: false,
        direction: 'left',
      }));
    } else if (!infinite && this.state.shift !== 0) {
      this.setState(({
        gap,
        shift,
        shiftCounter,
        rightRemainder,
        leftRemainder,
      }) => {
        if (leftRemainder < step) {
          return {
            shift: shift + ((itemWidth + gap) * leftRemainder),
            shiftCounter: shiftCounter - 1,
            rightRemainder: rightRemainder + leftRemainder,
            leftRemainder: 0,
          };
        }

        return {
          shift: shift + ((itemWidth + gap) * step),
          shiftCounter: shiftCounter - 1,
          rightRemainder: rightRemainder + step,
          leftRemainder: leftRemainder - step,
        };
      });
    }
  }

  nextImage = () => {
    const {
      step,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { shiftCounter, shiftLimit } = this.state;

    if (infinite) {
      this.blockButtons(animationDuration);

      this.setState(({
        imagesOrder: prevImagesOrder,
        shift: prevShift,
        gap,
      }) => ({
        imagesOrder: [
          ...prevImagesOrder,
          ...prevImagesOrder.slice(0, step),
        ],
        shift: prevShift - ((itemWidth + gap) * step),
        direction: 'right',
        transitionNeed: true,
      }));
    } else if (!infinite && shiftCounter !== shiftLimit) {
      this.setState(({
        gap,
        shift,
        shiftCounter: prevshiftCounter,
        rightRemainder,
        leftRemainder,
      }) => {
        if (rightRemainder < step) {
          return {
            shift: shift - ((itemWidth + gap) * rightRemainder),
            shiftCounter: prevshiftCounter + 1,
            rightRemainder: 0,
            leftRemainder: leftRemainder + rightRemainder,
          };
        }

        return {
          shift: shift - ((itemWidth + gap) * step),
          shiftCounter: prevshiftCounter + 1,
          rightRemainder: rightRemainder - step,
          leftRemainder: leftRemainder + step,
        };
      });
    }
  }

  render() {
    const {
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const {
      shift,
      imagesOrder,
      transitionNeed,
      gap,
    } = this.state;

    const stylesForListWrapper = {
      width: itemWidth * frameSize + (frameSize - 1) * gap,
    };

    const stylesForList = transitionNeed ? {
      transform: `translateX(${shift}px)`,
      transition: `transform linear ${animationDuration}ms`,
      gap: `${gap}px`,
    } : {
      transform: `translateX(${shift}px)`,
      gap: `${gap}px`,
    };

    const stylesForImage = {
      width: itemWidth,
      height: itemWidth,
    };

    return (
      <div className="Carousel">
        <div className="Carousel__list-wrapper" style={stylesForListWrapper}>
          <ul className="Carousel__list" style={stylesForList}>
            {imagesOrder.map((image, index) => (
              <li key={uuidv4()} className="Carousel__item">
                <img
                  className="Carousel__img"
                  src={image}
                  alt={`${index}`}
                  style={stylesForImage}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="Carousel__button Carousel__button_prev"
          onClick={this.prevImage}
          disabled={this.state.shiftCounter === 1 && !this.props.infinite}
        >
          &lt;
        </button>

        <button
          type="button"
          className="Carousel__button Carousel__button_next"
          onClick={this.nextImage}
          disabled={(this.state.shiftCounter === this.state.shiftLimit)
            && !this.props.infinite}
        >
          &gt;
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};

export default Carousel;

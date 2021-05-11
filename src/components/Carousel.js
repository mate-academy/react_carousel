/* eslint-disable no-lonely-if */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-unreachable */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    translateX: this.props.startTranslateX,
    isLeftButtonDisabled: true,
    isRightButtonDisabled: false,
    currentLeftPoint: this.props.startLeftPoint,
    renderedArray: this.props.images,
    fullSize: this.props.step * 2 + this.props.frameSize,
    noAnimation: false,
  }

  componentDidUpdate(PrevProps) {
    if (PrevProps !== this.props) {
      this.setState({
        noAnimation: false,
        fullSize: this.props.step * 2 + this.props.frameSize,
        isLeftButtonDisabled: !this.props.infinite,
        isRightButtonDisabled: false,
        translateX: this.props.startTranslateX,
        currentLeftPoint: this.props.startLeftPoint,
        renderedArray: this.generateArr(
          this.props.step * 2 + this.props.frameSize,
          this.props.infinite,
          this.props.images,
          this.props.images.length - this.props.step,
        ),
      });
    }
  }

  generateArr = (fullSize, infinite, sourceArr, leftPoint) => {
    const startIndex = (leftPoint >= sourceArr.length || leftPoint < 0)
      ? Math.abs(Math.abs(leftPoint) - sourceArr.length)
      : leftPoint;
    const infinityArr = [];

    let count = startIndex;

    for (let i = 0; i < fullSize; i++) {
      count = (count > sourceArr.length - 1)
        ? 0
        : count;
      infinityArr.push(sourceArr[count]);
      count++;
    }

    if (!infinite) {
      return sourceArr;
    }

    this.setState({
      currentLeftPoint: startIndex,
    });

    return infinityArr;
  }

  slideRight = () => {
    const maxRightSlade = this.props.images.length * this.props.itemWidth
      - this.props.frameSize * this.props.itemWidth;
    const slideByStep = this.state.translateX
      + this.props.step * this.props.itemWidth;

    if (this.props.infinite) {
      this.setState(state => ({
        currentLeftPoint: state.currentLeftPoint + this.props.step,
        translateX: state.translateX + this.props.step * this.props.itemWidth,
        isLeftButtonDisabled: false,
        noAnimation: false,
      }));
      setTimeout(() => {
        this.setState(state => ({
          noAnimation: true,
          renderedArray: this.generateArr(
            state.fullSize,
            this.props.infinite,
            this.props.images,
            state.currentLeftPoint,
          ),
          translateX: (this.props.step) * this.props.itemWidth,
        }));
      }, 1000);
    } else {
      if (slideByStep < maxRightSlade) {
        this.setState(state => ({
          translateX: state.translateX
            + (this.props.step * this.props.itemWidth),
          isLeftButtonDisabled: false,
        }));
      } else {
        this.setState({
          translateX: maxRightSlade,
          isRightButtonDisabled: true,
          isLeftButtonDisabled: false,
        });
      }
    }
  }

  slideLeft = () => {
    if (this.props.infinite) {
      this.setState(state => ({
        currentLeftPoint: state.currentLeftPoint - this.props.step,
        translateX: state.translateX - (this.props.step * this.props.itemWidth),
        isLeftButtonDisabled: false,
        noAnimation: false,
      }));
      setTimeout(() => {
        this.setState(state => ({
          noAnimation: true,
          renderedArray: this.generateArr(
            state.fullSize,
            this.props.infinite,
            this.props.images,
            state.currentLeftPoint,
            this.props.step,
            this.props.frameSize,
          ),
          translateX: (this.props.step) * this.props.itemWidth,
        }));
      }, 1000);
    } else {
      if (this.state.translateX > this.props.step * this.props.itemWidth) {
        this.setState(state => ({
          translateX: state.translateX
            - (this.props.step * this.props.itemWidth),
          isRightButtonDisabled: false,
        }));
      } else {
        this.setState({
          translateX: 0,
          isLeftButtonDisabled: true,
          isRightButtonDisabled: false,
        });
      }
    }
  }

  render() {
    const {
      translateX,
      isLeftButtonDisabled,
      isRightButtonDisabled,
      renderedArray,
      noAnimation,
    } = this.state;
    const {
      step, frameSize, itemWidth, animationDuration, infinite,
    } = this.props;

    const styleFocus = (!noAnimation)
      ? {
        transform: `translateX(-${translateX}px)`,
        transition: `${animationDuration}ms`,
      }
      : {
        transform: `translateX(-${translateX}px)`,
      };

    const focusWith = itemWidth * frameSize;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * (frameSize + 1)}px` }}
      >
        <div style={{ width: `${focusWith}px` }} className="focus">
          <ul
            style={styleFocus}
            className="Carousel__list"
          >
            {renderedArray.map((image, index) => (
              <li key={index}>
                <img src={image} alt={index + 1} />
              </li>
            ))}

          </ul>
        </div>
        <button
          className="button"
          disabled={isLeftButtonDisabled}
          type="button"
          onClick={() => (
            this.slideLeft(step, translateX, itemWidth, infinite)
          )}
        >
          ←
        </button>
        <button
          className="button"
        // 50px - button width
          style={{ left: `${itemWidth * (frameSize + 1) - 50}px` }}
          disabled={isRightButtonDisabled}
          type="button"
          onClick={() => (
            this.slideRight(step, frameSize, translateX, itemWidth, infinite)
          )}
        >
          →
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  startTranslateX: PropTypes.bool.isRequired,
  startLeftPoint: PropTypes.bool.isRequired,
};

export default Carousel;

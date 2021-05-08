/* eslint-disable no-unreachable */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    width: `${this.props.itemWidth * this.props.frameSize}`,
    translateX: this.props.itemWidth,
    leftButton: true,
    rightButton: false,
    currentLeftPoint: 0,
    resArr: this.props.images,
    fullSize: this.props.step * 2 + this.props.frameSize,
    noAnim: false,
  }

  componentDidMount() {
    if (this.props.infinite === true) {
      this.setState(state => ({
        leftButton: false,
        translateX: this.props.itemWidth * this.props.step,
        currentLeftPoint: this.props.images.length - this.props.step,
        resArr: this.generateArr(
          state.fullSize,
          this.props.infinite,
          this.props.images,
          this.props.images.length - this.props.step,
          this.props.step + this.props.frameSize - 1,
        ),
      }));
    }
  }

  generateArr = (fullSize, infinite, arr, leftPoint) => {
    const start = (leftPoint >= arr.length || leftPoint < 0)
      ? Math.abs(Math.abs(leftPoint) - arr.length)
      : leftPoint;
    const resArr = [];

    let count = start;

    for (let i = 0; i < fullSize; i++) {
      count = (count > arr.length - 1)
        ? 0
        : count;
      resArr.push(arr[count]);
      count++;
    }

    this.setState({
      currentLeftPoint: start,
    });

    switch (infinite) {
      case false:
        return arr;

        break;
      default:
        return resArr;
    }
  }

  slideRight = (step, frame, translateX, itemWidth, infinite) => {
    const maxRightSlade = 1300 - frame * itemWidth;
    const slideByStep = translateX + step * itemWidth;

    switch (infinite) {
      case true:
        this.setState(state => ({
          currentLeftPoint: state.currentLeftPoint + step,
          translateX: state.translateX + step * itemWidth,
          leftButton: false,
          noAnim: false,
        }));
        setTimeout(() => {
          this.setState(state => ({
            noAnim: true,
            resArr: this.generateArr(
              state.fullSize,
              this.props.infinite,
              this.props.images,
              state.currentLeftPoint,
            ),
            translateX: (step) * itemWidth,
          }));
        }, 1000);

        break;
      default:
        if (slideByStep < maxRightSlade) {
          this.setState(state => ({
            translateX: state.translateX + (step * itemWidth),
            leftButton: false,
          }));
        } else {
          this.setState({
            translateX: maxRightSlade,
            rightButton: true,
            leftButton: false,
          });
        }
    }
  }

  slideLeft = (step, translateX, itemWidth, infinite) => {
    switch (infinite) {
      case true:
        this.setState(state => ({
          currentLeftPoint: state.currentLeftPoint - step,
          translateX: state.translateX - (step * itemWidth),
          leftButton: false,
          noAnim: false,
        }));
        setTimeout(() => {
          this.setState(state => ({
            noAnim: true,
            resArr: this.generateArr(
              state.fullSize,
              this.props.infinite,
              this.props.images,
              state.currentLeftPoint,
              this.props.step,
              this.props.frameSize,
            ),
            translateX: (step) * itemWidth,
          }));
        }, 1000);

        break;
      default:
        if (translateX > step * itemWidth) {
          this.setState(state => ({
            translateX: state.translateX - (step * itemWidth),
            rightButton: '',
          }));
        } else {
          this.setState({
            translateX: 0,
            leftButton: true,
            rightButton: false,
          });
        }
    }
  }

  render() {
    const {
      width, translateX, leftButton, rightButton, resArr, noAnim,
    } = this.state;
    const {
      step, frameSize, itemWidth, animationDuration, infinite,
    } = this.props;

    const styleFocus = (!noAnim)
      ? {
        transform: `translateX(-${translateX}px)`,
        transition: `${animationDuration}ms`,
      }
      : {
        transform: `translateX(-${translateX}px)`,
      };

    const buttonStyle = {
      top: '50%',
      position: 'absolute',
      display: 'block',
      'border-radius': '15px',
      width: '50px',
      height: '30px',
    };
    const rightButtonStyle = {
      ...buttonStyle,
      left: `${+width + itemWidth - parseFloat(buttonStyle.width)}px`,
    };

    return (
      <div
        className="Carousel"
        style={{ width: `${+width + itemWidth}px` }}
      >
        <div style={{ width: `${width}px` }} className="focus">
          <ul
            style={styleFocus}
            className="Carousel__list"
          >
            {resArr.map((image, index) => (
              <li key={index}>
                <img src={image} alt={index + 1} />
              </li>
            ))}

          </ul>
        </div>
        <button
          style={buttonStyle}
          className="prev"
          disabled={leftButton}
          type="button"
          onClick={() => (
            this.slideLeft(step, translateX, itemWidth, infinite)
          )}
        >
          ←
        </button>
        <button
          style={rightButtonStyle}
          className="next"
          disabled={rightButton}
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
};

export default Carousel;

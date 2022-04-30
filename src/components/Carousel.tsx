import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite:boolean,
  rebuildCarousel: boolean,
}

interface State {
  isRightButtonDisabled: boolean,
  isLeftButtonDisabled: boolean,
  positionsArray: number[],
  makeTransition: number,
  stepsCompleted: number,
}

class Carousel extends React.Component<Props, State> {
  state = {
    isRightButtonDisabled: false,
    isLeftButtonDisabled: !this.props.infinite,
    positionsArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    makeTransition: 0,
    stepsCompleted: 0,
  };

  componentDidUpdate(prevProps: { rebuildCarousel: boolean; }) {
    if (prevProps.rebuildCarousel !== this.props.rebuildCarousel) {
      this.setState({
        isRightButtonDisabled: false,
        isLeftButtonDisabled: !this.props.infinite,
        makeTransition: 0,
        stepsCompleted: 0,
        positionsArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      });
    }
  }

  changePositions = (arr: number[], steps: number) => {
    const newArr = [...arr];
    let step = steps;

    if (steps < 0) {
      step = this.props.images.length + steps;
    }

    for (let i = 0; i < arr.length; i += 1) {
      newArr[i] -= this.props.itemWidth;
    }

    newArr[step] = this.props.itemWidth * (this.props.images.length - 1)
    - this.props.itemWidth * step;

    return newArr;
  };

  changePositionsReverse = (arr: number[], steps: number) => {
    const newArr = [...arr];

    for (let i = 0; i < arr.length; i += 1) {
      newArr[i] += this.props.itemWidth;
    }

    if (steps > 0) {
      newArr[steps - 1]
      -= (this.props.itemWidth * (this.props.images.length));
    } else {
      newArr[this.props.images.length - 1 + steps]
      = -(this.props.itemWidth * (this.props.images.length - 1)
      + this.props.itemWidth * steps);
    }

    return newArr;
  };

  changeImgCyclic = () => {
    this.setState((prevState) => {
      return {
        positionsArray: this
          .changePositions(prevState.positionsArray, prevState.stepsCompleted),
        stepsCompleted:
          prevState.stepsCompleted === this.props.images.length - 1
            ? 0
            : prevState.stepsCompleted + 1,
      };
    });
  };

  changeImgCyclicReverse = () => {
    this.setState((prevState) => {
      return {
        positionsArray: this
          .changePositionsReverse(prevState.positionsArray,
            prevState.stepsCompleted),
        stepsCompleted:
          prevState.stepsCompleted === -(this.props.images.length - 1)
            ? 0
            : prevState.stepsCompleted - 1,
      };
    });
  };

  changeImg = (direction: number) => {
    this.setState((prevState) => {
      return {
        makeTransition: prevState.makeTransition
          + this.props.itemWidth * direction,
        isLeftButtonDisabled: false,
        isRightButtonDisabled: false,
        stepsCompleted: prevState.stepsCompleted - direction,
      };
    });
  };

  scrollLeft = () => {
    const maxStepsNumber = this.props.images.length - this.props.frameSize;

    setTimeout(() => {
      if (this.props.infinite) {
        this.changeImgCyclic();
      } else if (this.state.stepsCompleted < maxStepsNumber) {
        this.changeImg(-1);
        if (this.state.stepsCompleted >= maxStepsNumber) {
          this.setState({
            isRightButtonDisabled: true,
          });
        }
      }
    }, 0);
  };

  scrollRight = () => {
    setTimeout(() => {
      if (this.props.infinite) {
        this.changeImgCyclicReverse();
      } else if (this.state.makeTransition < 0) {
        this.changeImg(1);
        if (this.state.stepsCompleted === 0) {
          this.setState({
            isLeftButtonDisabled: true,
          });
        }
      }
    }, 0);
  };

  render() {
    return (
      <div
        className="Carousel"
        style={{
          width: this.props.itemWidth * this.props.frameSize,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: this.props.itemWidth * this.props.images.length,
            height: this.props.itemWidth,
            transform: `translateX(${this.state.makeTransition}px)`,
            transition: `${this.props.animationDuration}ms`,
          }}
        >
          {this.props.images.map((image, index) => (
            <li
              className="Carousel__item"
              key={`${index + 1}`}
              style={{
                transform: `
                translateX(${this.state.positionsArray[index]}px)`,
                transition: `transform ${this.props.animationDuration}ms`,
              }}
            >
              <img
                className="Carousel__img"
                style={{
                  width: this.props.itemWidth,
                  height: this.props.itemWidth,
                }}
                src={image}
                alt={`${index + 1}`}
              />
            </li>
          ))}
        </ul>

        <div className="ButtonContainer">
          <button
            type="button"
            className="LeftButton"
            disabled={this.state.isLeftButtonDisabled}
            onClick={() => {
              for (let i = 0; i < this.props.step; i += 1) {
                this.scrollRight();
              }
            }}
          >
            &lt;
          </button>
          <button
            type="button"
            className="RightButton"
            disabled={this.state.isRightButtonDisabled}
            onClick={() => {
              for (let i = 0; i < this.props.step; i += 1) {
                this.scrollLeft();
              }
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

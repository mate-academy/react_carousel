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
  makeTransition: number,
  stepsCompleted: number,
  startReached: boolean,
  endReached: boolean,
  maxStepsNumber: number,
}

class Carousel extends React.Component<Props, State> {
  state = {
    isRightButtonDisabled: false,
    isLeftButtonDisabled: !this.props.infinite,
    makeTransition: 0,
    stepsCompleted: 0,
    startReached: true,
    endReached: false,
    maxStepsNumber: this.props.images.length - this.props.frameSize,
  };

  componentDidUpdate(prevProps: { rebuildCarousel: boolean; }) {
    if (prevProps.rebuildCarousel !== this.props.rebuildCarousel) {
      this.setState({
        isRightButtonDisabled: false,
        isLeftButtonDisabled: !this.props.infinite,
        makeTransition: 0,
        stepsCompleted: 0,
        startReached: true,
        endReached: false,
        maxStepsNumber: this.props.images.length - this.props.frameSize,
      });
    }
  }

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

  changeImgCyclic = () => {
    for (let i = 0; i < this.props.step; i += 1) {
      if (!this.state.endReached) {
        this.changeImg(-1);

        if (this.state.stepsCompleted >= this.state.maxStepsNumber) {
          this.setState({
            endReached: true,
          });
        }
      }
    }
  };

  resetCycleAfterEndReached = () => {
    this.setState({
      makeTransition: 0,
      stepsCompleted: 0,
      startReached: true,
      endReached: false,
    });
  };

  moveLeftCyclic = () => {
    if (this.state.stepsCompleted !== 0) {
      this.setState({
        startReached: false,
      });
    }

    if (this.state.endReached) {
      this.resetCycleAfterEndReached();

      return;
    }

    this.changeImgCyclic();
  };

  changeImgCyclicReverse = () => {
    for (let i = 0; i < this.props.step; i += 1) {
      if (!this.state.startReached) {
        this.changeImg(1);

        if (this.state.stepsCompleted === 0) {
          this.setState({
            startReached: true,
          });
        }
      }
    }
  };

  resetCycleAfterStartReached = () => {
    this.setState((state) => ({
      makeTransition: -state.maxStepsNumber * this.props.itemWidth,
      stepsCompleted: state.maxStepsNumber,
      startReached: false,
      endReached: true,
    }));
  };

  moveRightCyclic = () => {
    if (this.state.stepsCompleted !== this.state.maxStepsNumber) {
      this.setState({
        endReached: false,
      });
    }

    if (this.state.startReached) {
      this.resetCycleAfterStartReached();

      return;
    }

    this.changeImgCyclicReverse();
  };

  moveLeft = () => {
    for (let i = 0; i < this.props.step; i += 1) {
      if (this.state.stepsCompleted < this.state.maxStepsNumber) {
        this.changeImg(-1);
        if (this.state.stepsCompleted >= this.state.maxStepsNumber) {
          this.setState({
            isRightButtonDisabled: true,
          });
        }
      }
    }
  };

  moveRight = () => {
    for (let i = 0; i < this.props.step; i += 1) {
      if (this.state.makeTransition < 0) {
        this.changeImg(1);
        if (this.state.stepsCompleted === 0) {
          this.setState({
            isLeftButtonDisabled: true,
          });
        }
      }
    }
  };

  scrollLeft = () => {
    setTimeout(() => {
      if (this.props.infinite) {
        this.moveLeftCyclic();
      } else {
        this.moveLeft();
      }
    }, 0);
  };

  scrollRight = () => {
    setTimeout(() => {
      if (this.props.infinite) {
        this.moveRightCyclic();
      } else {
        this.moveRight();
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
              this.scrollRight();
            }}
          >
            &lt;
          </button>
          <button
            type="button"
            className="RightButton"
            disabled={this.state.isRightButtonDisabled}
            onClick={() => {
              this.scrollLeft();
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

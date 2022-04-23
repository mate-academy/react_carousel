import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite:boolean,
}

interface State {
  currentCount: number,
  isRightButtonDisabled: boolean,
  isLeftButtonDisabled: boolean,
  imagesArray: string[],
}

class Carousel extends React.Component<Props, State> {
  state = {
    currentCount: 0,
    isRightButtonDisabled: false,
    isLeftButtonDisabled: !this.props.infinite,
    imagesArray: [...this.props.images],
  };

  changeImgArrayCyclic = (direction: number) => {
    this.setState((prevState) => {
      return {
        imagesArray: [...prevState.imagesArray.slice(direction),
          ...prevState.imagesArray.slice(0, direction)],
      };
    });
  };

  changeImgArray = (direction: number) => {
    this.setState((prevState) => {
      return {
        imagesArray: [...prevState.imagesArray.slice(direction),
          ...prevState.imagesArray.slice(0, direction)],
        isLeftButtonDisabled: false,
        isRightButtonDisabled: false,
        currentCount: prevState.currentCount + direction,
      };
    });
  };

  scrollLeft = () => {
    if (this.props.infinite) {
      setTimeout(() => {
        this.changeImgArrayCyclic(1);
      }, this.props.animationDuration);
    } else {
      setTimeout(() => {
        if (this.state.currentCount < (this.state.imagesArray.length
          - this.props.step - (this.props.frameSize - this.props.step))) {
          this.changeImgArray(1);

          if (this.state.currentCount >= (this.state.imagesArray.length
            - this.props.step - (this.props.frameSize - this.props.step))) {
            this.setState({
              isRightButtonDisabled: true,
            });
          }
        }
      }, this.props.animationDuration);
    }
  };

  scrollRight = () => {
    if (this.props.infinite) {
      setTimeout(() => {
        this.changeImgArrayCyclic(-1);
      }, this.props.animationDuration);
    } else {
      setTimeout(() => {
        if (this.state.currentCount > 0) {
          this.changeImgArray(-1);

          if (this.state.currentCount < 1) {
            this.setState({
              isLeftButtonDisabled: true,
            });
          }
        }
      }, this.props.animationDuration);
    }
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
          }}
        >
          {this.state.imagesArray.map((image, index) => (
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

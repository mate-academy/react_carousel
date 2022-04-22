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
}

class Carousel extends React.Component<Props, State> {
  state = {
    currentCount: 0,
    isRightButtonDisabled: false,
    isLeftButtonDisabled: !this.props.infinite,
  };

  imagesArray = [...this.props.images];

  scrollLeft = () => {
    if (this.props.infinite) {
      setTimeout(() => {
        const temp = this.imagesArray[0];

        for (let i = 0; i < this.imagesArray.length - 1; i += 1) {
          this.imagesArray[i] = this.imagesArray[i + 1];
        }

        this.imagesArray[this.imagesArray.length - 1] = temp;

        this.setState({
          currentCount: 0,
        });
      }, this.props.animationDuration);
    } else {
      setTimeout(() => {
        if (this.state.currentCount < (this.imagesArray.length
          - this.props.step - (this.props.frameSize - this.props.step))) {
          const temp = this.imagesArray[0];

          for (let i = 0; i < this.imagesArray.length - 1; i += 1) {
            this.imagesArray[i] = this.imagesArray[i + 1];
          }

          this.imagesArray[this.imagesArray.length - 1] = temp;

          this.setState((prevState) => {
            return {
              isLeftButtonDisabled: false,
              currentCount: prevState.currentCount + 1,
            };
          });

          if (this.state.currentCount >= (this.imagesArray.length
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
        const temp
          = this.imagesArray[this.imagesArray.length - 1];

        for (let i = this.imagesArray.length - 1; i > 0; i -= 1) {
          this.imagesArray[i] = this.imagesArray[i - 1];
        }

        this.imagesArray[0] = temp;

        this.setState({
          currentCount: 0,
        });
      }, this.props.animationDuration);
    } else {
      setTimeout(() => {
        if (this.state.currentCount > 0) {
          const temp
            = this.imagesArray[this.imagesArray.length - 1];

          for (let i = this.imagesArray.length - 1; i > 0; i -= 1) {
            this.imagesArray[i] = this.imagesArray[i - 1];
          }

          this.imagesArray[0] = temp;

          this.setState((prevState) => {
            return {
              isRightButtonDisabled: false,
              currentCount: prevState.currentCount - 1,
            };
          });

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
          {this.imagesArray.map((image, index) => (
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

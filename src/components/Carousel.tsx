import { Component } from 'react';
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
  scrollAmount: number,
};

export class Carousel extends Component<Props, State> {
  state = {
    scrollAmount: 0,
  };

  slideRight = () => {
    let scrollLength = this.props.step * this.props.itemWidth;
    const fieldLength = this.props.itemWidth * this.props.images.length;
    const lastFrame = this.props.frameSize * this.props.itemWidth;

    this.setState((prevState) => {
      if (prevState.scrollAmount + lastFrame >= fieldLength) {
        return { scrollAmount: 0 };
      }

      if (prevState.scrollAmount + scrollLength >= fieldLength - lastFrame) {
        scrollLength = fieldLength - prevState.scrollAmount - lastFrame
          || this.props.itemWidth;
      }

      return { scrollAmount: prevState.scrollAmount + scrollLength };
    });
  };

  slideLeft = () => {
    let scrollLength = this.props.step * this.props.itemWidth;
    const fieldLength = this.props.itemWidth * this.props.images.length;
    const lastFrame = this.props.frameSize * this.props.itemWidth;

    this.setState((prevState) => {
      if (prevState.scrollAmount <= 0) {
        return { scrollAmount: fieldLength - lastFrame };
      }

      if (prevState.scrollAmount - scrollLength < 0) {
        scrollLength = prevState.scrollAmount;
      }

      return { scrollAmount: prevState.scrollAmount - scrollLength };
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;
    const { scrollAmount } = this.state;
    const fieldWidth = frameSize * itemWidth;
    const maxScroll = itemWidth * images.length;

    return (
      <div className="wrapper">
        <button
          type="button"
          className="button"
          onClick={this.slideLeft}
          disabled={!infinite
            && scrollAmount === 0}
        >
          Prev
        </button>
        <div
          className="carousel"
          style={{
            width: `${fieldWidth}px`,
            height: `${itemWidth}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              left: `-${scrollAmount}px`,
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map((image, i) => (
              <li
                key={image}
              >
                <img
                  src={image}
                  alt={`pic #${i}`}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="button"
          data-cy="next"
          onClick={this.slideRight}
          disabled={!infinite
            && scrollAmount === maxScroll - fieldWidth}
        >
          Next
        </button>
      </div>
    );
  }
}

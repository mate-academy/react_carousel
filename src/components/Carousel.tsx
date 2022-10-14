import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
};

type State = {
  allPositions: number[];
  currentPosition: number;
  currentIndex: number;
  infinity: boolean;
};

export class Carousel extends Component<Props, State> {
  state = {
    allPositions: [],
    currentPosition: 0,
    currentIndex: 0,
    infinity: this.props.infinity,
  };

  carousel = 0;

  componentDidMount() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const keyPoints: number[] = [];
    const fullLength = itemWidth * images.length;
    const stepLength = itemWidth * step;
    const windowSize = itemWidth * frameSize;
    const stopLength = fullLength - windowSize;
    const currentPosition = 0;

    for (let i = currentPosition; i < fullLength; i += stepLength) {
      if (i > stopLength) {
        keyPoints.push(stopLength - stopLength * 2);
        break;
      }

      keyPoints.push(i - i * 2);
    }

    this.setState({ allPositions: keyPoints });

    let pointIndex = 0;

    if (!this.state.infinity) {
      this.carousel = window.setInterval(() => {
        this.setState({ currentPosition: keyPoints[pointIndex] });
        if (pointIndex !== keyPoints.length - 1) {
          pointIndex += 1;
        } else {
          pointIndex = 0;
        }

        this.setState({ currentIndex: pointIndex });
      }, animationDuration);
    }
  }

  componentDidUpdate() {
    if (this.state.infinity) {
      window.clearInterval(this.carousel);
    }
  }

  clickNext = () => {
    const {
      allPositions,
      currentIndex,
      infinity,
    } = this.state;
    let newIndex = currentIndex;

    if (!infinity) {
      this.setState({ infinity: true });
    } else if (newIndex !== allPositions.length - 1) {
      newIndex += 1;
    } else {
      newIndex = 0;
    }

    this.setState({
      currentIndex: newIndex,
      currentPosition: allPositions[newIndex],
    });
  };

  clickPrev = () => {
    const {
      allPositions,
      currentIndex,
      infinity,
    } = this.state;

    if (!infinity) {
      this.setState({ infinity: true });
    }

    let newIndex = currentIndex;

    if (newIndex !== 0) {
      newIndex -= 1;
    } else {
      newIndex = allPositions.length - 1;
    }

    this.setState({
      currentIndex: newIndex,
      currentPosition: allPositions[newIndex],
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const {
      currentPosition,
    } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${currentPosition}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((imageUrl, index) => (
            <li
              key={imageUrl}
              className="Carousel__item"
            >
              <img
                src={imageUrl}
                alt={`${index + 1}`}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.clickPrev}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={this.clickNext}
        >
          next
        </button>
      </div>
    );
  }
}

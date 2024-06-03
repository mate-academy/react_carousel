import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  position: number;
};

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    position: 0,
  };

  static defaultProps = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  get gap(): number {
    return this.props.itemWidth * 0.25;
  }

  get buttonStyle() {
    const { itemWidth } = this.props;

    return { borderWidth: `${itemWidth / 2}px ${itemWidth}px` };
  }

  get wrapperStyle() {
    const { itemWidth, frameSize } = this.props;

    return {
      width: `${frameSize * (itemWidth + this.gap) - this.gap}px`,
    };
  }

  get listStyle() {
    const { itemWidth, animationDuration } = this.props;

    return {
      gap: `${this.gap}px`,
      width: `${this.listSize * (itemWidth + this.gap) - this.gap}px`,
      transition: `transform ${animationDuration / 1000}s linear 0s`,
    };
  }

  get imageStyle() {
    const { itemWidth } = this.props;

    return {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
    };
  }

  get additionalSpaceForAnimations(): number {
    const { step, animationDuration } = this.props;
    const clicksPerSecondRecord = 15;

    return step * clicksPerSecondRecord * (animationDuration / 1000);
  }

  get listSize(): number {
    return this.props.images.length;
  }

  get beginningIndexOfCurrentList(): number {
    return this.getListIndexByPosition(this.state.position) * this.listSize;
  }

  get endIndexOfCurrentList(): number {
    return this.beginningIndexOfCurrentList + this.listSize - 1;
  }

  getListTranslation = (listIndex: number) => {
    const { itemWidth } = this.props;
    const { position } = this.state;

    return {
      transform: `translateX(${(itemWidth + this.gap) * (listIndex * this.listSize - position)}px)`,
    };
  };

  getListIndexByPosition = (position: number): number => {
    if (this.listSize === 0) {
      return 0;
    }

    return Math.floor(position / this.listSize);
  };

  getLists = () => {
    const { images, frameSize } = this.props;
    const { position } = this.state;
    const lists: JSX.Element[] = [];

    const firstListIndex = this.getListIndexByPosition(
      position - this.additionalSpaceForAnimations,
    );

    const lastListIndex = this.getListIndexByPosition(
      position + frameSize - 1 + this.additionalSpaceForAnimations,
    );

    for (let i = firstListIndex; i <= lastListIndex; i++) {
      lists.push(
        <ul
          className="Carousel__list"
          style={{ ...this.listStyle, ...this.getListTranslation(i) }}
          key={i}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                className="Carousel__image"
                style={this.imageStyle}
                src={image}
                alt={'' + index}
              />
            </li>
          ))}
        </ul>,
      );
    }

    return lists;
  };

  isPositionBeforeRange = (position: number): boolean => {
    return !this.props.infinite && position < this.beginningIndexOfCurrentList;
  };

  isPositionBehindRange = (position: number): boolean => {
    const { frameSize, infinite } = this.props;

    return !infinite && position + frameSize - 1 > this.endIndexOfCurrentList;
  };

  correctPosition = (position: number): number => {
    let correctPosition = position;

    if (this.isPositionBeforeRange(correctPosition)) {
      correctPosition = this.beginningIndexOfCurrentList;
    } else if (this.isPositionBehindRange(correctPosition)) {
      correctPosition = this.endIndexOfCurrentList - this.props.frameSize + 1;
    }

    return correctPosition;
  };

  rotate = (step: number) => {
    this.setState({
      position: this.correctPosition(this.state.position + step),
    });
  };

  handleNext = () => {
    this.rotate(this.props.step);
  };

  handlePrev = () => {
    this.rotate(-1 * this.props.step);
  };

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps !== this.props) {
      this.setState({ position: this.correctPosition(this.state.position) });
    }
  }

  render(): React.ReactNode {
    const { position } = this.state;

    return (
      <div className="Carousel">
        <button
          className={`Carousel__button Carousel__button--prev${
            this.isPositionBeforeRange(position - 1)
              ? ' Carousel__button--disabled'
              : ''
          }`}
          style={this.buttonStyle}
          type="button"
          onClick={this.handlePrev}
        ></button>

        <div className="Carousel__wrapper" style={this.wrapperStyle}>
          {this.getLists()}
        </div>

        <button
          className={`Carousel__button Carousel__button--next${
            this.isPositionBehindRange(position + 1)
              ? ' Carousel__button--disabled'
              : ''
          }`}
          style={this.buttonStyle}
          type="button"
          onClick={this.handleNext}
          data-cy="next"
        ></button>
      </div>
    );
  }
}

export default Carousel;

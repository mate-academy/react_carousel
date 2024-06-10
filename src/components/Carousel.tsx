import React, { CSSProperties } from 'react';
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
  duringAnimation: boolean;
};

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    position: 0,
    duringAnimation: false,
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

  get buttonStyle(): CSSProperties {
    const { itemWidth } = this.props;

    return { borderWidth: `${itemWidth / 2}px ${itemWidth}px` };
  }

  get wrapperStyle(): CSSProperties {
    const { itemWidth, frameSize } = this.props;

    return {
      width: `${frameSize * (itemWidth + this.gap) - this.gap}px`,
    };
  }

  get listStyle(): CSSProperties {
    const { itemWidth, animationDuration, infinite } = this.props;
    const listStyle: CSSProperties = {
      gap: `${this.gap}px`,
      width: `${this.listSize * (itemWidth + this.gap) - this.gap}px`,
      transition: 'none',
      position: 'static',
    };

    if (this.state.duringAnimation) {
      listStyle.transition = `transform ${animationDuration / 1000}s linear 0s`;
    }

    if (infinite) {
      listStyle.position = 'absolute';
    }

    return listStyle;
  }

  get listSize(): number {
    return this.props.images.length;
  }

  get positionInMainList(): number {
    const { frameSize } = this.props;
    let { position } = this.state;

    if (position <= -frameSize) {
      position = (this.listSize + (position % this.listSize)) % this.listSize;
    }

    if (position >= this.listSize) {
      position = position % this.listSize;
    }

    return position;
  }

  getListTranslation = (listIndex: number): CSSProperties => {
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

  getLists = (): JSX.Element[] => {
    const { itemWidth, images, frameSize, step, infinite } = this.props;
    const { position } = this.state;
    const lists: JSX.Element[] = [];
    let firstListIndex = 0;
    let lastListIndex = 0;

    if (infinite) {
      firstListIndex = this.getListIndexByPosition(position - step);

      lastListIndex = this.getListIndexByPosition(
        position + frameSize - 1 + step,
      );
    }

    for (let i = firstListIndex; i <= lastListIndex; i++) {
      lists.push(
        <ul
          className="Carousel__list"
          style={{
            ...this.listStyle,
            ...this.getListTranslation(i),
          }}
          key={i}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                className="Carousel__image"
                width={itemWidth}
                height={itemWidth}
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
    return !this.props.infinite && position < 0;
  };

  isPositionBehindRange = (position: number): boolean => {
    const { frameSize, infinite } = this.props;

    return !infinite && position + frameSize - 1 >= this.listSize;
  };

  correctPosition = (position: number): number => {
    let correctPosition = position;

    if (this.isPositionBeforeRange(correctPosition)) {
      correctPosition = 0;
    } else if (this.isPositionBehindRange(correctPosition)) {
      correctPosition = this.listSize - this.props.frameSize;
    }

    return correctPosition;
  };

  rotate = (step: number) => {
    this.setState({
      position: this.correctPosition(this.state.position + step),
      duringAnimation: true,
    });

    setTimeout(() => {
      this.setState({
        position: this.positionInMainList,
        duringAnimation: false,
      });
    }, this.props.animationDuration);
  };

  handleNext = () => {
    this.rotate(this.props.step);
  };

  handlePrev = () => {
    this.rotate(-1 * this.props.step);
  };

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps !== this.props) {
      this.setState({
        position: this.correctPosition(this.positionInMainList),
      });
    }
  }

  render(): React.ReactNode {
    const { position, duringAnimation } = this.state;

    return (
      <div className="Carousel">
        <button
          className={`Carousel__button Carousel__button--prev ${
            this.isPositionBeforeRange(position - 1) &&
            'Carousel__button--disabled'
          } ${duringAnimation && 'Carousel__button--locked'}`}
          style={this.buttonStyle}
          type="button"
          onClick={this.handlePrev}
        ></button>

        <div className="Carousel__wrapper" style={this.wrapperStyle}>
          {this.getLists()}
        </div>

        <button
          className={`Carousel__button Carousel__button--next ${
            this.isPositionBehindRange(position + 1) &&
            'Carousel__button--disabled'
          } ${duringAnimation && 'Carousel__button--locked'}`}
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

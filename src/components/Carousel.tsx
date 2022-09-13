// import { type } from 'os';
import uuid from 'react-uuid';
import React, { CSSProperties } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type State = {
  translate: number;
  leftDisable: boolean;
  rightDisable: boolean;
  frameSize: number;
};

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

class Carousel extends React.Component<Props, State> {
  gap = 20;

  state: Readonly<State> = {
    translate: 0,
    leftDisable: !this.props.infinite,
    rightDisable: false,
    frameSize: this.props.frameSize,
  };

  newFrameSize = this.state.frameSize;

  moveNext = () => {
    const {
      translate: prevTranslate,
    } = this.state;

    const {
      step,
      itemWidth,
      infinite,
    } = this.props;

    if (step > (10 - this.newFrameSize) && !infinite) {
      return;
    }

    const itemWidthWithGap = itemWidth + this.gap;

    const newTranslate = prevTranslate - step * itemWidthWithGap;
    const maxShift = -itemWidthWithGap * (10 - this.newFrameSize);

    if (newTranslate >= maxShift) {
      this.setState({
        translate: newTranslate,
        rightDisable: newTranslate === maxShift ? !infinite : false,
        leftDisable: false,
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (prevTranslate === maxShift && infinite) {
        this.setState({
          translate: 0,
          rightDisable: !infinite,
        });
      } else {
        this.setState({
          translate: maxShift,
          rightDisable: !infinite,
        });
      }
    }
  };

  moveBack = () => {
    const {
      translate: prevTranslate,
    } = this.state;
    const {
      step,
      itemWidth,
      infinite,
    } = this.props;

    if (step > (10 - this.newFrameSize) && !infinite) {
      return;
    }

    const itemWidthWithGap = itemWidth + this.gap;

    const newTranslate = prevTranslate + step * itemWidthWithGap;
    const maxShift = -itemWidthWithGap * (10 - this.newFrameSize);

    if (newTranslate <= 0) {
      this.setState({
        translate: newTranslate,
        leftDisable: newTranslate === 0 ? !infinite : false,
        rightDisable: false,
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (prevTranslate === 0 && infinite) {
        this.setState({
          translate: maxShift,
          leftDisable: !infinite,
        });
      } else {
        this.setState({
          translate: 0,
          leftDisable: !infinite,
        });
      }
    }
  };

  setLeftButton = () => {
    const {
      translate: prevTranslate,
    } = this.state;
    const {
      infinite,
    } = this.props;

    if (prevTranslate < 0) {
      return false;
    }

    return !infinite;
  };

  setRightButton = () => {
    const {
      translate: prevTranslate,
    } = this.state;

    const {
      itemWidth,
      infinite,
    } = this.props;

    const itemWidthWithGap = itemWidth + this.gap;

    const maxShift = -itemWidthWithGap * (10 - this.newFrameSize);

    if (prevTranslate >= maxShift) {
      return prevTranslate === maxShift ? !infinite : false;
    }

    return !infinite;
  };

  calcWrapperWidth = () => {
    const {
      itemWidth,
      frameSize,
    } = this.props;

    const itemWidthWithGap = itemWidth + this.gap;

    if (frameSize * itemWidthWithGap - 20 > 1300) {
      this.newFrameSize = Math.trunc(
        1300 / (itemWidthWithGap),
      );

      return this.newFrameSize * itemWidthWithGap - this.gap;
    }

    this.newFrameSize = frameSize;

    return frameSize * itemWidthWithGap - this.gap;
  };

  render() {
    const {
      images,
      itemWidth,
      animationDuration,
    } = this.props;

    let { rightDisable, leftDisable } = this.state;

    const wrapperStyle: CSSProperties = {
      width: this.calcWrapperWidth(),
    };

    const itemStyle: CSSProperties = {
      width: itemWidth,
    };

    const listStyle: CSSProperties = {
      transitionDuration: `${animationDuration}ms`,
      transform: `translateX(${this.state.translate}px)`,
      gap: this.gap,
    };

    leftDisable = this.setLeftButton();
    rightDisable = this.setRightButton();

    return (
      <div
        className="wrapper"
        style={wrapperStyle}
      >
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={listStyle}
          >
            {images.map((image, index) => (
              <li key={uuid()}>
                <img src={image} alt={String(index + 1)} style={itemStyle} />
              </li>
            ))}
          </ul>

          <div className="Carousel__controls">
            <button
              type="button"
              className={classNames(
                'Carousel__button',
                { 'Carousel__button--enabled': !leftDisable },
              )}
              onClick={this.moveBack}
            >
              {'<'}
            </button>

            <button
              type="button"
              data-cy="next"
              className={classNames(
                'Carousel__button',
                { 'Carousel__button--enabled': !rightDisable },
              )}
              onClick={this.moveNext}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;

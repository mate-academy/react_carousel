// import { type } from 'os';
import uuid from 'react-uuid';
import React, { CSSProperties } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type State = {
  translate: number;
  leftDisable: boolean;
  rightDisable: boolean;
};

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
};

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    translate: 0,
    leftDisable: true,
    rightDisable: false,
  };

  frameSize = this.props.frameSize;

  gap = 20;

  itemWidthWithGap = this.props.itemWidth + this.gap;

  newFrameSize = this.props.frameSize;

  moveNext = () => {
    const { translate: prevTranslate } = this.state;
    const {
      step,
    } = this.props;

    const newTranslate = prevTranslate - step * this.itemWidthWithGap;

    if (newTranslate > -this.itemWidthWithGap * (10 - this.newFrameSize)) {
      this.setState({
        translate: newTranslate,
        rightDisable: false,
        leftDisable: false,
      });
    } else {
      this.setState({
        translate: -this.itemWidthWithGap * (10 - this.newFrameSize),
        rightDisable: true,
        leftDisable: false,
      });
    }
  };

  moveBack = () => {
    const { translate: prevTranslate } = this.state;
    const {
      step,
    } = this.props;

    const newTranslate = prevTranslate + step * this.itemWidthWithGap;

    if (newTranslate < 0) {
      this.setState({
        translate: newTranslate,
        leftDisable: false,
        rightDisable: false,
      });
    } else {
      this.setState({
        translate: 0,
        leftDisable: true,
        rightDisable: false,
      });
    }
  };

  calcWrapperWidth = (frameSize: number) => {
    if (frameSize * this.itemWidthWithGap - 20 > 1300) {
      this.newFrameSize = Math.trunc(1300
        / (this.itemWidthWithGap));

      return this.newFrameSize * this.itemWidthWithGap - this.gap;
    }

    return frameSize * this.itemWidthWithGap - this.gap;
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
    } = this.props;

    const { rightDisable, leftDisable } = this.state;

    const wrapperStyle: CSSProperties = {
      width: this.calcWrapperWidth(frameSize),
    };

    const itemStyle: CSSProperties = {
      width: itemWidth,
    };

    const listStyle: CSSProperties = {
      transitionDuration: `${1000}ms`,
      transform: `translateX(${this.state.translate}px)`,
      gap: this.gap,
    };

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

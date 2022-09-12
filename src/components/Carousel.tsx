// import { type } from 'os';
import uuid from 'react-uuid';
import React, { CSSProperties } from 'react';
import './Carousel.scss';

type State = {
  translate: number;
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
      this.setState({ translate: newTranslate });
    } else {
      this.setState({
        translate: -this.itemWidthWithGap * (10 - this.newFrameSize),
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
      this.setState({ translate: newTranslate });
    } else {
      this.setState({ translate: 0 });
    }
  };

  calcWrapperWidth = (frameSize: number) => {
    if (frameSize * this.itemWidthWithGap - 20 > 1300) {
      this.newFrameSize = Math.trunc(1300
        / (this.itemWidthWithGap - this.gap / 2));

      return this.newFrameSize * this.itemWidthWithGap;
    }

    return frameSize * this.itemWidthWithGap;
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
    } = this.props;

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
          <h2>{listStyle.transform}</h2>
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

          <button type="button" onClick={this.moveBack}>Prev</button>
          <button type="button" onClick={this.moveNext}>Next</button>
        </div>
      </div>
    );
  }
}

export default Carousel;

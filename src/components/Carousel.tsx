import React, { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export class Carousel extends Component<Props, {}> {
  state = {
    offset: 0,
    autoOff: false,
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
  };

  offsetRight(newOffsetRight: number, visibleOffset: number) {
    this.setState({
      offset: newOffsetRight < -visibleOffset ? 0 : newOffsetRight,
    });
  }

  offsetLeft(newOffsetLeft: number) {
    this.setState({ offset: Math.min(newOffsetLeft, 0) });
  }

  autoOffset(event: React.MouseEvent<HTMLInputElement>) {
    this.setState({ autoOff: event.currentTarget.checked });
  }

  render() {
    const {
      images,
      infinite,
    } = this.props;
    const {
      offset,
      step = 3,
      frameSize = 3,
      itemWidth = 130,
      animationDuration = 1000,
    } = this.state;
    const newFrameSize = frameSize * itemWidth;
    const newOffsetRight = offset - step * itemWidth;
    const newOffsetLeft = offset + step * itemWidth;
    const visibleOffset = Math.floor(images.length / frameSize) * newFrameSize;

    // if (newOffsetRight - itemWidth < -visibleOffset) {
    //   this.setState({ offset: 0 });
    // }

    // console.log(newOffsetLeft, newOffsetRight - itemWidth, visibleOffset);

    if (this.state.autoOff || infinite) {
      setTimeout(() => {
        this.offsetRight(newOffsetRight, visibleOffset);
      }, animationDuration);
    }

    return (
      <>
        <div
          className="Carousel"
          style={{
            width: `${itemWidth * images.length}px`,
          }}
        >
          <div
            className="Carousel__window"
            style={{ width: newFrameSize }}
          >
            <ul
              className="Carousel__list"
              style={{
                transform: `translateX(${offset}px)`,
              }}
            >
              { images.map((img) => (
                <li key={`li_${img}`}>
                  <img
                    key={img}
                    src={img}
                    alt="1"
                    width={itemWidth}
                  />
                </li>
              )) }
            </ul>
          </div>
        </div>
        <div className="Buttons">
          <button
            type="button"
            onClick={() => {
              this.offsetLeft(newOffsetLeft);
            }}
          >
            Prev
          </button>
          <button
            data-cy="next"
            type="button"
            onClick={() => {
              this.offsetRight(newOffsetRight, visibleOffset);
            }}
          >
            Next
          </button>
          <input
            type="checkbox"
            id="autoScroll"
            onClick={(event) => {
              this.autoOffset(event);
            }}
          />
          <label htmlFor="autoScroll"> Auto scroll</label>
        </div>
        <div className="SettingsCarousel box">
          <form className="SettingsCarousel">
            <label htmlFor="itemId">
              Item width
              <input
                id="itemId"
                type="number"
                placeholder="130"
                className="SettingsCarousel__field"
                onChange={(event) => {
                  this.setState({ itemWidth: event.currentTarget.value });
                }}
                min={0}
              />
            </label>

            <label htmlFor="frameId">
              Frame size
              <input
                id="frameId"
                type="number"
                placeholder="3"
                className="SettingsCarousel__field"
                onChange={(event) => {
                  this.setState({ frameSize: event.currentTarget.value });
                }}
                max={images.length}
                min={0}
              />
            </label>

            <label htmlFor="stepId">
              Step
              <input
                id="stepId"
                type="number"
                placeholder="3"
                className="SettingsCarousel__field"
                onChange={(event) => {
                  this.setState({ step: event.currentTarget.value });
                }}
                max={images.length}
                min={0}
              />
            </label>

            Animation duration
            <input
              type="number"
              placeholder="1000"
              className="SettingsCarousel__field"
              onChange={(event) => {
                this.setState({ animationDuration: event.currentTarget.value });
              }}
              min={0}
            />
          </form>
        </div>
      </>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexOfFirstImg: 0,
      images: this.props.children,
      frameSize: 3,
      itemWidthAndHeight: 130,
      step: 3,
    };
  }

  getNextImages = () => {
    if (this.handleScroll.scrollLeft > this.state.itemWidthAndHeight
      * (this.state.images.length - this.state.frameSize - 1)) {
      this.handleScroll.scrollLeft = 0;
    } else {
      this.handleScroll.scrollLeft += this.state.step
        * this.state.itemWidthAndHeight;
    }

    this.setState(prevState => ({
      indexOfFirstImg: this.handleScroll.scrollLeft
        / prevState.itemWidthAndHeight,
    }));
  }

  getPrevImages = () => {
    if (this.handleScroll.scrollLeft === 0) {
      this.handleScroll.scrollLeft = this.state.itemWidthAndHeight
        * (this.state.images.length - this.state.frameSize);
    } else {
      this.handleScroll.scrollLeft -= this.state.step
        * this.state.itemWidthAndHeight;
    }

    this.setState(prevState => ({
      indexOfFirstImg: this.handleScroll.scrollLeft
        / prevState.itemWidthAndHeight,
    }));
  }

  changeFrameSize = event => (
    this.setState({
      frameSize: event.target.value,
    })
  )

  changeItemSize = (event) => {
    this.setState({
      itemWidthAndHeight: event.target.value,
    });
    this.handleScroll.scrollLeft = (this.state.indexOfFirstImg
      + this.state.frameSize) * this.state.itemWidthAndHeight;
  }

  changeStep = event => (
    this.setState({
      step: event.target.value,
    })
  )

  render() {
    const {
      getNextImages,
      getPrevImages,
      changeFrameSize,
      changeItemSize,
      changeStep,
      state: {
        images,
        frameSize,
        itemWidthAndHeight,
        step,
      },
    } = this;

    const buttonStyles = {
      width: `${itemWidthAndHeight / 5}px`,
      height: `${itemWidthAndHeight / 5}px`,
      top: `${itemWidthAndHeight / 2}px`,
    };

    const leftButtonStyles = {
      ...buttonStyles,
      left: `-${itemWidthAndHeight / 5}px`,
    };

    const rightButtonStyles = {
      ...buttonStyles,
      right: `-${itemWidthAndHeight / 5}px`,
    };

    return (
      <div className="Carousel">
        <div className="Carousel-interface">
          Amount of pictures:
          <select value={frameSize} onChange={changeFrameSize}>
            {images.map((elem, i) => (
              <option value={i + 1} key={elem}>{i + 1}</option>
            ))}
          </select>
          Size of pictures:
          <input
            type="range"
            min="130"
            max="390"
            value={itemWidthAndHeight}
            onChange={changeItemSize}
          />
          Step:
          <select value={step} onChange={changeStep}>
            {images.map((elem, i) => (
              i === 0 ? null : <option value={i} key={elem}>{i}</option>
            ))}
          </select>
        </div>

        <div
          className="Carousel-wraper"
          style={{ width: `${frameSize * itemWidthAndHeight}px` }}
        >
          <button
            style={leftButtonStyles}
            type="button"
            onClick={getPrevImages}
            className="button-prev"
          />
          <div
            className="Carousel__list-wraper"
            ref={(div) => { this.handleScroll = div; }}
          >
            <ul
              className="Carousel__list"
              style={{ width: `${itemWidthAndHeight * images.length}px` }}
            >
              {images.map((elem, i) => (
                <li key={`li for ${elem}`}>
                  <img
                    style={{
                      width: `${itemWidthAndHeight}px`,
                      height: `${itemWidthAndHeight}px;`,
                    }}
                    src={elem}
                    key={elem}
                    alt={`№${i + 1}`}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            style={rightButtonStyles}
            type="button"
            onClick={getNextImages}
            className="button-next"
          />
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Carousel;

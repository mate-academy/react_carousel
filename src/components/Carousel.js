import React from 'react';

import './Carousel.css';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleImages: this.props.children,
      selectedStep: 3,
      selectedFrameSize: 3,
      itemWidth: 130,
      indexFirstImage: 0,
    };

    this.getNextImages = this.getNextImages.bind(this);
    this.getPreviousImages = this.getPreviousImages.bind(this);
  }

  setStep = event => (
    this.setState({
      selectedStep: event.target.value,
    })
  );

  setFrameSize = event => (
    this.setState({
      selectedFrameSize: event.target.value,
    })
  );

  getNextImages = () => (
    this.setState(prevState => ({
      indexFirstImage: this.handledScroll.scrollLeft / prevState.itemWidth,
    })),
    this.handledScroll.scrollLeft > this.state.itemWidth
    * (this.state.visibleImages.length - this.state.selectedFrameSize - 1)
      ? (this.handledScroll.scrollLeft = 0)
      : (this.handledScroll.scrollLeft
          += this.state.selectedStep * this.state.itemWidth)
  );

  getPreviousImages = () => (
    this.setState(prevState => ({
      indexFirstImage: this.handledScroll.scrollLeft / prevState.itemWidth,
    })),
    this.handledScroll.scrollLeft === 0
      ? (this.handledScroll.scrollLeft = this.state.itemWidth
        * (this.state.visibleImages.length - this.state.selectedFrameSize))
      : (this.handledScroll.scrollLeft
        -= this.st * this.state.itemWidth)
  );

  changeItemWidth = (event) => {
    this.setState({
      itemWidth: event.target.value,
    });
    this.handledScroll.scrollLeft = (this.state.indexFirstImage
      + this.state.selectedFrameSize)
      * this.state.itemWidth;
  }

  render() {
    const {
      getNextImages,
      getPreviousImages,
      setStep,
      setFrameSize,
      changeItemWidth,
      state: {
        visibleImages,
        selectedStep,
        selectedFrameSize,
        itemWidth,
      },
    } = this;

    const leftButtonStyle = {
      width: `${itemWidth / 4}px`,
      height: `${itemWidth / 4}px`,
      left: `-${itemWidth / 4}px`,
    };
    const rightButtonStyle = {
      width: `${itemWidth / 4}px`,
      height: `${itemWidth / 4}px`,
      right: `-${itemWidth / 4}px`,
    };

    return (
      <div className="Carousel">
        <div className="buttons-container">
          <p>Step</p>
          <select
            className="setting-step"
            value={selectedStep}
            onChange={setStep}
          >
            {visibleImages
              .map((image, index) => (
                <option key={image} value={index + 1}>{index + 1}</option>
              ))
            }
          </select>

          <p>Number of pictures in a frame:</p>
          <select
            className="setting-frame-size"
            value={selectedFrameSize}
            onChange={setFrameSize}
          >
            {visibleImages
              .map((image, index) => (
                <option key={image} value={index + 1}>{index + 1}</option>
              ))
            }
          </select>

          <p className="setting-image-width__name">Pictures size:</p>
          <p>0</p>
          <input
            className="setting-image-width"
            type="range"
            value={itemWidth}
            onChange={changeItemWidth}
            min="130"
            max="400"
          />
          <p>400</p>
        </div>

        <div
          className="Carousel__container"
          style={{ width: `${selectedFrameSize * itemWidth}px` }}
        >
          <button
            style={leftButtonStyle}
            type="button"
            className="button arrow left"
            onClick={getPreviousImages}
          />
          <button
            style={rightButtonStyle}
            type="button"
            className="button arrow right"
            onClick={getNextImages}
          />
          <div
            className="Carousel__list-wrapper"
            style={{ width: `${selectedFrameSize * itemWidth}px` }}
            ref={(div) => { this.handledScroll = div; }}
          >

            <ul id="container" className="Carousel__list">
              {
                visibleImages.map((image, index) => (
                  <li key={image}>
                    <img
                      style={{ width: `${itemWidth}px` }}
                      src={image}
                      alt={index + 1}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;

import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

class Carousel extends React.PureComponent {
  state = {
    images: this.props.images,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    leftPosition: 0,
    animation: true,
    lastImg: this.props.frameSize,
    firstImg: 1,
  }

  isAnimation = () => {
    setTimeout(() => {
      this.setState(prevState => ({
        ...prevState,
        animation: true,
      }));
    }, this.state.animationDuration);
  }

  buttonNextClick = (event) => {
    this.setState((prevState) => {
      const imagesArrLength = prevState.images.length;
      let newLeftPosition = prevState.lastImg === imagesArrLength ? prevState.leftPosition : prevState.leftPosition - (prevState.itemWidth * prevState.step);
      let newLastImg = prevState.lastImg === imagesArrLength ? prevState.lastImg : prevState.lastImg + prevState.step;
      let newFirstImg = prevState.lastImg === imagesArrLength ? prevState.firstImg : prevState.firstImg + prevState.step;

      if (prevState.animation === false) {
        return;
      }

      if (imagesArrLength < newLastImg) {
        newLeftPosition = prevState.leftPosition - ((imagesArrLength - prevState.lastImg) * prevState.itemWidth);
        newLastImg = imagesArrLength;
        newFirstImg = imagesArrLength - prevState.frameSize + 1;
      }

      this.isAnimation();

      return ({
        ...prevState,
        leftPosition: newLeftPosition,
        animation: false,
        lastImg: newLastImg,
        firstImg: newFirstImg,
      });
    });
  };

  buttonPrevClick = (event) => {
    this.setState((prevState) => {
      let newLeftPosition = prevState.firstImg === 1 ? prevState.leftPosition : prevState.leftPosition + (prevState.itemWidth * prevState.step);
      let newLastImg = prevState.firstImg === 1 ? prevState.lastImg : prevState.lastImg - prevState.step;
      let newFirstImg = prevState.firstImg === 1 ? prevState.firstImg : prevState.firstImg - prevState.step;

      if (prevState.animation === false) {
        return;
      }

      if (newFirstImg < 1) {
        newLeftPosition = 0;
        newLastImg = prevState.step;
        newFirstImg = 1;
      }

      this.isAnimation();

      return ({
        ...prevState,
        leftPosition: newLeftPosition,
        animation: false,
        lastImg: newLastImg,
        firstImg: newFirstImg,
      });
    });
  }

  render() {
    const { images, itemWidth, frameSize, animationDuration, leftPosition } = this.state;

    return (
      <>
        <div className="overflow" style={{ width: (itemWidth * frameSize) }}>
          <div className="images" style={{ width: (itemWidth * images.length), left: leftPosition, transition: `left ${animationDuration / 1000}s` }}>
            {images.map(imgSrc => <img className="image" style={{ width: itemWidth }} src={`.${imgSrc}`} alt="" key={imgSrc} />)}
          </div>
        </div>
        <div className="buttons">
          <button className="button" onClick={this.buttonPrevClick}>Previous</button>
          <button className="button" onClick={this.buttonNextClick}>Next</button>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number,
  frameSize: PropTypes.number,
  step: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
};

Carousel.defaultProps = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
}

export default Carousel;

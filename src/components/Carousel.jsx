import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {

  state = {
    marginLimit: this.props.images.length - this.props.frameSize,
    imgMargin: 0,
  }

  setCountChangePosition = (event) => {
    const { name: buttonName, value: step } = event.target;
    const { marginLimit, imgMargin } = this.state;
    const stepDirection = buttonName === 'prev' ? -(+step) : +step;
    

    // console.log(this.props);


    let updatedImgMargin;

    if ((imgMargin === -marginLimit && buttonName !== 'next')
      || (imgMargin === 0 && buttonName !== 'prev')) {
      updatedImgMargin = imgMargin === 0 ? -marginLimit : marginLimit;
    } else {
      const newImageCountInMargin = imgMargin + stepDirection;

      if (newImageCountInMargin < -marginLimit && buttonName === 'prev') {
        updatedImgMargin = -marginLimit - imgMargin;
      }

      if (newImageCountInMargin > 0 && buttonName === 'next') {
        updatedImgMargin = -imgMargin;
      }
    }

    this.setState({
      imgMargin: imgMargin + (updatedImgMargin || stepDirection),
    });
  };

  render() {
    const {
      frameSize,
      itemWidth,
      images,
      step,
      animationDuration,
      infinite,
    } = this.props;

    const updatedFrameSize = itemWidth * frameSize;
    const updatedMargin = this.state.imgMargin * itemWidth;

    return (
      <div className="Carousel">
        <div className="images-frame" style={{ width: updatedFrameSize }}>
          <ul
            className="images-list"
            style={{
              marginLeft: updatedMargin, transition: `${animationDuration}ms`,
            }}
          >
            {
              images.map(img => (
                <li key={img} className="image">
                  <img style={{ width: +itemWidth }} src={img} alt="smile" />
                </li>
              ))
            }
          </ul>
        </div>

        <button
          type="button"
          className="button prev"
          name="prev"
          value={step}
          onClick={this.setCountChangePosition}
        />
        <button
          type="button"
          className="button next"
          name="next"
          value={step}
          onClick={this.setCountChangePosition}
        />
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

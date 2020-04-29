import React from 'react';
import './Carousel.css';

class Carousel extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return props;
  }

  state = {
    imgPosition: 0,
    imgIndex: 3,
  }

  next = () => {
    const { step, frameSize, itemWidth, images, imgIndex } = this.state;

    if (imgIndex === images.length) {
      this.setState({
        imgPosition: 0,
        imgIndex: step,
      });
    } else if (images.length - imgIndex < frameSize) {
      this.setState({
        imgPosition: -((images.length - frameSize) * itemWidth),
        imgIndex: images.length,
      });
    } else {
      this.setState(prev => ({
        imgPosition: prev.imgPosition - itemWidth * step,
        imgIndex: prev.imgIndex + step,
      }));
    }
  }

  prev = () => {
    const { step, frameSize, itemWidth, images, imgIndex } = this.state;

    if (imgIndex === step) {
      this.setState({
        imgPosition: -((images.length - frameSize) * itemWidth),
        imgIndex: images.length,
      });
    } else if (imgIndex - step < frameSize) {
      this.setState({
        imgPosition: 0,
        imgIndex: step,
      });
    } else {
      this.setState(prev => ({
        imgPosition: prev.imgPosition + itemWidth * step,
        imgIndex: prev.imgIndex - step,
      }));
    }
  }

  render() {
    const { imgPosition, animationDuration, images } = this.state;

    const divStyle = {
      transform: `translateX(${imgPosition}px)`,
      transition: `${animationDuration}ms`,
    };

    return (
      <div className="Carousel">
        <ul className="Carousel__list" style={divStyle}>
          {images.map((image, i) => (
            <li key={image}><img src={image} alt={i + 1} /></li>
          ))}
        </ul>

        <button type="button" onClick={this.prev}>Prev</button>
        <button type="button" onClick={this.next}>Next</button>
      </div>
    );
  }
}

export default Carousel;

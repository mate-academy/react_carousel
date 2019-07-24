import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import ControlButton from './ControlButton';
import Customization from './Customization';
import './Carousel.css';

class Carousel extends React.Component {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    translateStep: 0,
    animationDuration: 1000,
    infinite: false,
  }

  changeView = (sign) => {
    this.setState((prev) => {
      const itemCollectionWidth = this.props.images.length * prev.itemWidth;
      const viewSize = prev.itemWidth * prev.frameSize;
      const nextStep = sign * (prev.itemWidth * prev.step);
      const lastStep = itemCollectionWidth - prev.itemWidth * prev.frameSize;

      if (prev.infinite && sign === -1 && prev.translateStep === -lastStep) {
        return {
          translateStep: 0,
        };
      }

      if (prev.infinite && sign === 1 && prev.translateStep === 0) {
        return {
          translateStep: -lastStep,
        };
      }

      if (sign === -1 && (
        itemCollectionWidth - (sign * nextStep + sign * prev.translateStep)
      ) <= (viewSize)) {
        return {
          translateStep: sign * lastStep,
        };
      }

      if (sign === 1 && -(nextStep + prev.translateStep) <= 0) {
        return {
          translateStep: 0,
        };
      }

      return {
        translateStep: nextStep + prev.translateStep,
      };
    });
  }

  updateState = (event) => {
    const { name, value, checked } = event.target;

    if (name === 'infinite') {
      this.setState({
        [name]: checked,
      });
    } else {
      this.setState({
        [name]: +value,
      });
    }
  }

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      translateStep,
      animationDuration,
      step,
      infinite,
    } = this.state;

    return (
      <div
        className="Carousel"
      >
        <Customization
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
          updateState={this.updateState}
        />

        <Image
          images={images}
          itemWidth={itemWidth}
          translateStep={translateStep}
          animationDuration={animationDuration}
          frameSize={frameSize}
        />

        <ControlButton
          text="Prev"
          changeView={() => this.changeView(1)}
          className="Carousel__control-prev"
        />

        <ControlButton
          text="Next"
          changeView={() => this.changeView(-1)}
          className="Carousel__control-next"
        />
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;

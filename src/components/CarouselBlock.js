import React from 'react';
import Carousel from './Carousel';
import СarouselSettings from './СarouselSettings';

class CarouselBlock extends React.Component {
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.state = {
      images: this.props.images,
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      infinite: false,
    };
  }

  changeState(name, value) {
    const { images } = this.state;

    let date = value;

    if ((name === 'step' || name === 'frameSize') && value > images.length) {
      date = images.length;
    }

    if ((name === 'step' || name === 'frameSize') && value < 1) {
      date = 1;
    }

    if (name === 'itemWidth' && value < 100) {
      date = 100;
    }

    if (name === 'itemWidth' && value > 250) {
      date = 250;
    }

    if (name === 'animationDuration' && value < 500) {
      date = 500;
    }

    if (name === 'animationDuration' && value > 2000) {
      date = 2000;
    }

    this.setState({
      [name]: date,
    });
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <СarouselSettings
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          changeState={this.changeState}
        />
      </>
    );
  }
}

export default CarouselBlock;

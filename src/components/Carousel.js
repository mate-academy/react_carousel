import React, { Component } from 'react';
import styles from './Carousel.module.css';
import { CarouselTrack } from './CarouselTrack/CarouselTrack';
import { CarouselShape, CarouselDefaults } from './Shapes/carouselShapes';

export class Carousel extends Component {
  state = {
    value: 0,
  }

  leftScrollHandler = () => {
    if (!this.props.infinite && this.state.value >= 0) {
      return;
    }

    this.setState(prevState => (
      {
        value: prevState.value + this.props.itemWidth * this.props.step,
      }));

    if (this.props.infinite) {
      const lastElements = this.props.images.length - this.props.step;
      const removedElements = this.props.images
        .splice(lastElements, this.props.step);

      this.props.images.unshift(...removedElements);

      this.setState({ value: 0 });
    }
  }

  rightScrollHandler = () => {
    const maximalIndex = this.props.images.length - this.props.step + 1;

    if (this.state.value <= -maximalIndex * this.props.itemWidth) {
      return;
    }

    this.setState(prevState => (
      {
        value: prevState.value - this.props.itemWidth * this.props.step,
      }));

    if (this.props.infinite) {
      const removedElements = this.props.images.splice(0, this.props.step);

      this.props.images.push(...removedElements);

      this.setState({ value: 0 });
    }
  };

  render() {
    return (
      <div className={styles.carousel}>
        <CarouselTrack
          itemWidth={this.props.itemWidth}
          frameSize={this.props.frameSize}
          images={this.props.images}
          amountToShift={this.state.value}
          animationDuration={this.props.animationDuration}
          infinite={this.props.infinite}
        />
        <button type="button" onClick={this.leftScrollHandler}>Prev</button>
        <button type="button" onClick={this.rightScrollHandler}>Next</button>
      </div>
    );
  }
}
Carousel.defaultProps = CarouselDefaults;
Carousel.propTypes = CarouselShape;

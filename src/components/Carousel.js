import React, { Component } from 'react';
import PropType from 'prop-types';
import styles from './Carousel.module.css';
import { Image } from './Image/Image';

export class Carousel extends Component {
  state = {
    value: 0,
  }

  leftScrollHandler = () => {
    if (this.state.value >= 0) {
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
  }

  render() {
    return (
      <div className={styles.carousel}>
        <div style={{
          width: `${this.props.itemWidth * this.props.frameSize}px`,
          overflow: 'hidden',
        }}
        >
          <ul
            className={styles.carousel__list}
            style={{
              transition: `transform ${this.props.animationDuration}ms ease`,
              transform: `translateX(${this.state.value}px)`,
            }}
          >

            {this.props.images.map((image, index) => (
              <li>
                <Image
                  key={image}
                  image={image}
                  imageWidth={this.props.itemWidth}
                  alt={index + 1}
                />
              </li>
            ))}
          </ul>

        </div>

        <button type="button" onClick={this.leftScrollHandler}>Prev</button>
        <button type="button" onClick={this.rightScrollHandler}>Next</button>
      </div>
    );
  }
}
Carousel.defaultProps = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
};

Carousel.propTypes = {
  images: PropType.arrayOf(PropType.string).isRequired,
  itemWidth: PropType.number,
  frameSize: PropType.number,
  step: PropType.number,
  animationDuration: PropType.number,
  infinite: PropType.bool,
};

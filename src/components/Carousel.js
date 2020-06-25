import React, { Component } from 'react';
import PropType from 'prop-types';
import styles from './Carousel.module.css';
import { Image } from './Image/Image';

export class Carousel extends Component {
  state = {
    counter: 1,
    value: 0,
  }

  componentDidUpdate() {

  }

  leftScrollHandler = () => {
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
    this.setState(prevState => (
      {
        value: prevState.value - this.props.itemWidth * this.props.step,
        counter: prevState.counter + this.props.step,
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

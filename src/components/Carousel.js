import React, { Component } from 'react';
import PropType from 'prop-types';
import styles from './Carousel.module.css';
import { Image } from './Image/Image';

export class Carousel extends Component {
  state = {
    value: 0,
  }

  leftScrollHandler = () => {
    this.setState(prevState => (
      {
        value: prevState.value + this.props.itemWidth * this.props.step,
      }));
  }

  rightScrollHandler = () => {
    this.setState(prevState => (
      {
        value: prevState.value - this.props.itemWidth * this.props.step,
      }));
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
            style={{ transform: `translateX(${this.state.value}px)` }}
          >

            {this.props.images.map((image, index) => (
              <li>
                <Image
                  key={image}
                  image={image}
                  imageWidth={this.props.itemWidth}
                  alt={index}
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
};

Carousel.propTypes = {
  images: PropType.arrayOf(PropType.string).isRequired,
  itemWidth: PropType.number,
  frameSize: PropType.number,
  step: PropType.number,
};

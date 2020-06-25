import React, { Component } from 'react';
import PropType from 'prop-types';
import styles from './Carousel.module.css';
import { Image } from './Image/Image';

export class Carousel extends Component {
  state = {
    value: 0,
  }

  leftScrollHandler = () => {
    this.setState(prevState => ({ value: prevState.value - 260 }));
  }

  render() {
    return (
      <div className={styles.carousel}>
        <div style={{
          width: '260px',
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
                  alt={index}
                />
              </li>
            ))}
          </ul>

        </div>

        <button type="button">Prev</button>
        <button type="button" onClick={this.leftScrollHandler}>Next</button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropType.arrayOf(PropType.string).isRequired,
};

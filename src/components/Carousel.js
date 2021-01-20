import React from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class Carousel extends React.Component {
  getImageId = element => element.match(/\d/g).join('');

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      translateX,
      prevButton,
      nextButton,
    } = this.props;

    return (
      <>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              width: `${frameSize * itemWidth}px`,
            }}
          >
            {images.map(image => (
              <li
                key={this.getImageId(image)}
                style={{
                  transition: `transform ${animationDuration}ms ease`,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                <img
                  src={image}
                  alt="1"
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
          <div
            className="buttonGroup"
            style={{
              width: `${frameSize * itemWidth}px`,
            }}
          >
            <Button
              type="button"
              onClick={prevButton}
              variant="warning"
            >
              Prev
            </Button>
            <Button
              type="button"
              onClick={nextButton}
              variant="danger"
            >
              Next
            </Button>
          </div>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  translateX: PropTypes.number.isRequired,
  prevButton: PropTypes.func.isRequired,
  nextButton: PropTypes.func.isRequired,
};

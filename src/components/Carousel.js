import React from 'react';
import './Carousel.css';
import { MainShape } from '../shapes';
import { Buttons } from './Buttons/Buttons';
import { CarouselItem } from './CarouselItem/CarouselItem';

export class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
      step: this.props.step,
      frameSize: this.props.frameSize,
      itemWidth: this.props.itemWidth,
      animationDuration: this.props.animationDuration,
      infinite: this.props.infinite,
      translateX: 0,
    };
  }

  maxTranslate = () => {
    const { itemWidth, images, frameSize } = this.state;

    return itemWidth * images.length - (itemWidth * frameSize);
  }

  prevSlide = () => {
    const { itemWidth, translateX, step, infinite } = this.state;

    if (infinite) {
      if (translateX >= 0) {
        this.setState(prevState => (
          { translateX: -this.maxTranslate() }
        ));

        return false;
      }
    }

    if (translateX >= 0) {
      this.setState(prevState => (
        { translateX: 0 }
      ));
    }

    this.setState(prevState => ({
      translateX: Math.min(prevState.translateX + itemWidth * step, 0),
    }));

    return true;
  }

  nextSlide = () => {
    const { itemWidth, translateX, step, images, infinite } = this.state;

    if (infinite) {
      if (Math.abs(translateX) >= this.maxTranslate()) {
        this.setState(prevState => (
          { translateX: 0 }
        ));

        return false;
      }
    }

    if (Math.abs(translateX) >= this.maxTranslate()) {
      this.setState(prevState => (
        { translateX: -this.maxTranslate() }
      ));
    }

    const lastMove = -itemWidth * (images.length - step);

    this.setState(prevState => ({
      translateX: Math.max(prevState.translateX - itemWidth * step, lastMove),
    }));

    return true;
  }

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      translateX,
    } = this.state;

    return (
      <div className="carousel" style={{ width: itemWidth * frameSize }}>
        <ul
          className="carousel__list"
          style={{
            transition: `transform ${animationDuration}ms ease`,
            transform: `translateX(${translateX}px)`,
          }}
        >
          {
            images.map(img => (
              <li key={img.match(/\d+/)[0]}>
                <CarouselItem img={img} itemWidth={itemWidth} />
              </li>
            ))
          }
        </ul>
        <Buttons prevSlide={this.prevSlide} nextSlide={this.nextSlide} />
      </div>
    );
  }
}

Carousel.propTypes = MainShape.isRequired;

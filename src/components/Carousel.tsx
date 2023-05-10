/* eslint-disable react/no-unused-prop-types */
import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

class Carousel extends Component<Props, {}> {
  scrollWidth = 0;

  nextSlideHandler = () => {
    const carouselList
      = document.querySelector('.Carousel__list') as HTMLUListElement;

    if (this.scrollWidth < this.props.itemWidth * 10) {
      this.scrollWidth += this.props.itemWidth * 2;
    }

    carouselList.style.transform = `translate(-${this.scrollWidth}px, 0)`;
  };

  prevSlideHandler = () => {

  };

  render() {
    const { images } = this.props;

    return (
      <div className="Carousel">
        <ul className="Carousel__list">
          {images.map((image, i) => (
            <li key={image}>
              <img src={image} alt={`${i + 1}`} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="Carousel__button Carousel__button--prev"
          onClick={this.prevSlideHandler}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className="Carousel__button Carousel__button--next"
          onClick={this.nextSlideHandler}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

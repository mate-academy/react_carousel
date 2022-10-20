import { useRef } from 'react';
import Slider from 'react-slick';
import { images } from '../utils/images';

type Props = {
  carouselLength: number
};

export const Carousel: React.FC<Props> = ({ carouselLength }) => {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    className: 'carousel',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: carouselLength,
    slidesToScroll: carouselLength,
  };

  return (
    <div className="carousel">
      <div className="carousel__header">
        <h1>
          Carousel with
          {` ${carouselLength} `}
          images
        </h1>

        <div className="carousel__buttons">
          <button
            type="button"
            className="button"
            onClick={previous}
          >
            {'<'}
          </button>

          <button
            type="button"
            className="button"
            onClick={next}
          >
            {'>'}
          </button>
        </div>

      </div>
      <Slider ref={sliderRef} {...settings}>
        {images.map((item) => (
          <div>
            <div className="container">
              <img src={item} alt="logo" />
            </div>
          </div>
        ))}
      </Slider>

    </div>
  );
};

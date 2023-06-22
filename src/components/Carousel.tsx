import React from 'react';
import Slider from 'react-slick';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const settings = {
    infinite,
    speed: animationDuration,
    slidesToShow: frameSize,
    slidesToScroll: step,
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
      }}
    >

      <Slider {...settings}>
        {images.map((img, index) => (
          <div className="Slider__item" key={img}>
            <img src={img} alt={`slick ${index}`} className="Slider__img" width={itemWidth} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

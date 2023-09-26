import React from 'react';
import './Carousel.scss';

interface Image {
  id: number,
  url: string,
}

type Props = {
  images: Image[]
  itemWidth: number,
  frameSize: number,
  // step: number,
  // animationDuration: number,
  // infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  // step,
  // animationDuration,
  // infinite,
}) => {
  const frameWidth = itemWidth * frameSize;

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={{ width: `${frameWidth}px` }}>
        {images.map(image => (
          <li>
            <img
              src={image.url}
              alt={image.id.toString()}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button type="button">Prev</button>
        <button type="button">Next</button>
      </div>

    </div>
  );
};

export default Carousel;

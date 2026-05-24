import { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const gap = 16;

export default function Carousel({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}: Props) {
  const [offset, setOffset] = useState(0);
  const hasImages = images.length > 0;

  const lastVisibleIndex = Math.max(images.length - frameSize, 0);
  const frameWidth = itemWidth * frameSize + gap * (frameSize - 1);
  const shift = offset * (itemWidth + gap);

  useEffect(() => {
    setOffset(current => Math.min(current, lastVisibleIndex));
  }, [lastVisibleIndex]);

  const showNext = () => {
    if (!hasImages) {
      return;
    }

    if (infinite) {
      setOffset(current => (current + step) % images.length);

      return;
    }

    setOffset(current => Math.min(current + step, lastVisibleIndex));
  };

  const showPrevious = () => {
    if (!hasImages) {
      return;
    }

    if (infinite) {
      setOffset(
        current => (current - step + images.length * step) % images.length,
      );

      return;
    }

    setOffset(current => Math.max(current - step, 0));
  };

  let visibleImages = images;

  if (infinite) {
    visibleImages = Array.from({ length: frameSize }, (_, index) => {
      const imageIndex = (offset + index) % images.length;

      return {
        image: images[imageIndex],
        id: `${offset}-${index}-${images[imageIndex]}`,
        alt: `${imageIndex + 1}`,
      };
    });
  }

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={{ width: `${frameWidth}px` }}>
        {infinite ? (
          <ul className="Carousel__track">
            {visibleImages.map(({ image, id, alt }) => (
              <li className="Carousel__slide" key={id}>
                <img
                  src={image}
                  alt={alt}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul
            className="Carousel__track"
            style={{
              transform: `translateX(-${shift}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {visibleImages.map((image, index) => (
              <li className="Carousel__slide" key={`${image}-${index}`}>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="Carousel__actions">
        <button type="button" onClick={showPrevious}>
          Prev
        </button>
        <button type="button" data-cy="next" onClick={showNext}>
          Next
        </button>
      </div>
    </div>
  );
}

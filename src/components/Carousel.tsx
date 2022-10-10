import React, { useEffect, useRef, useState } from 'react';

type Images = {
  images: string[];
  size: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const buttonStyle = `h-full
            p-5 text-2xl
            hover:bg-accent-focus/20
            transition-all
            ease-in duration-75`;

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const Carousel: React.FC<Images> = ({
  images,
  size,
  frameSize,
  step,
  animationDuration,
}) => {
  const [scrollTo, setScrollTo] = useState(0);
  const prevSize = usePrevious<number>(size);

  useEffect(() => {
    if (prevSize) {
      setScrollTo((scrollTo / prevSize) * size);
    }
  }, [size]);

  const scrollLeft = () => {
    // we need 8 to not show empty box in slider on last element;
    if (scrollTo > (size * 8 * -1)) {
      setScrollTo(Math
        .max(
          scrollTo - size * step,
          (size * (images.length - frameSize) * -1),
        ));
    }
  };

  const scrollRight = () => {
    if (scrollTo < 0) {
      setScrollTo(Math.min(scrollTo + size * step, 0));
    }
  };

  return (
    <div className="Carousel">
      <div className="flex m-10 border-gray-300 border shadow-xl rounded-md">
        <button
          style={{ height: `${size}px` }}
          className={buttonStyle}
          type="button"
          onClick={scrollRight}
        >
          {'<'}
        </button>
        <div
          className="overflow-hidden"
          style={{
            width: size * frameSize,
          }}
        >
          <ul
            className="Carousel__list w-full flex flex-nowrap"
            style={{ translate: scrollTo, transitionDuration: `${animationDuration}ms` }}
          >
            {images.map((image) => (
              <li
                key={image}
                className="flex-shrink-0"
              >
                <img src={image} alt="emoji" style={{ width: `${size}px`, height: `${size}px` }} />
              </li>
            ))}
          </ul>
        </div>
        <button
          style={{ height: `${size}px` }}
          className={buttonStyle}
          type="button"
          onClick={scrollLeft}
        >
          {'>'}
        </button>
      </div>

    </div>
  );
};

export default Carousel;

import React, { useState } from 'react';
import './Carousel.scss';

interface Image {
  id: number;
  src: string;
}

interface Props {
  images: Image[];
}

const Carousel: React.FC<Props> = ({ images }) => {
  const defaultAnimationDuration = 1000;
  const defaultItemWidth = 130;
  const defaultFrameSize = 3;
  const defaultStep = 3;
  const defaultInfinite = false;
  const defaultCurentIndex = 0;
  const [itemWidth, setItemWidth] = useState<number>(defaultItemWidth);
  const [frameSize, setFrameSize] = useState<number>(defaultFrameSize);
  const [animationDuration, setAnimationDuration] = useState<number>(
    defaultAnimationDuration,
  );
  const [infinite, setInfinite] = useState<boolean>(defaultInfinite);
  const [step, setStep] = useState<number>(defaultStep);
  const [currentIndex, setCurrentIndex] = useState<number>(defaultCurentIndex);
  const maxIndex = images.length - frameSize;

  //console.log(curentIndex);

  function handelPrevClick() {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex - step + images.length) % images.length;
      }

      return Math.max(prevIndex - step, 0);
    });
  }

  function handelNextClick() {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex + step) % images.length;
      }

      return Math.min(prevIndex + step, maxIndex);
    });
  }

  const translateX = currentIndex > maxIndex ? maxIndex : currentIndex;

  return (
    <>
      <div className="Control-panel">
        <div className="Control-item">
          <label htmlFor="itemWidth">Image width</label>
          <input
            type="number"
            name="itemWidth"
            id="itemWidth"
            value={`${itemWidth}`}
            onChange={ev => setItemWidth(Number(ev.target.value))}
          />
        </div>

        <div className="Control-item">
          <label htmlFor="frameSize">Frame size</label>
          <input
            type="number"
            name="frameSize"
            id="frameSize"
            min="1"
            max="10"
            value={`${frameSize}`}
            onChange={ev => setFrameSize(Number(ev.target.value))}
          />
        </div>

        <div className="Control-item">
          <label htmlFor="step">Step</label>
          <input
            type="number"
            name="step"
            id="step"
            min="1"
            max="10"
            value={`${step}`}
            onChange={ev => setStep(Number(ev.target.value))}
          />
        </div>

        <div className="Control-item">
          <label htmlFor="animationDuration">Animation duration</label>
          <input
            type="number"
            name="animationDuration"
            id="animationDuration"
            min="100"
            max="1000"
            value={`${animationDuration}`}
            onChange={ev => setAnimationDuration(Number(ev.target.value))}
          />
        </div>

        <div className="Control-item">
          <label htmlFor="infinite">Infinite</label>
          <input
            type="checkbox"
            name="infinite"
            id="infinite"
            checked={infinite}
            onChange={ev => setInfinite(ev.target.checked)}
          />
        </div>
      </div>

      <div className="Carousel">
        <div
          className="carousel__container"
          style={{
            transform: `translateX(-${translateX * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul className="Carousel__list">
            {images.map(image => (
              <li key={image.id}>
                <img
                  src={image.src}
                  alt={`Image №${image.id}`}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="carousel__buttons">
          <button
            type="button"
            disabled={!infinite && currentIndex === 0}
            onClick={() => {
              handelPrevClick();
            }}
          >
            Prev
          </button>

          <button
            type="button"
            data-cy="next"
            disabled={!infinite && currentIndex + frameSize >= images.length}
            onClick={() => {
              handelNextClick();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;

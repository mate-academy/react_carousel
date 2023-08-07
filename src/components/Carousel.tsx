import React, { useState } from 'react';
import './Carousel.scss';
import { Image } from '../types/Image';
import { Params } from '../types/Params';

type Props = {
  images: Image[];
  params: Params;
  changeCarousel: (key: string, value: number | boolean) => void
};

const Carousel: React.FC<Props> = ({
  images,
  params,
  changeCarousel,
}) => {
  const [firstVisibleImg, setFirstVisibleImg] = useState(1);

  const scrolRight = () => {
    let nextVisibleImg = firstVisibleImg + params.step;

    if ((nextVisibleImg + params.frameSize) >= images.length) {
      nextVisibleImg = images.length - params.frameSize + 1;
    }

    if (params.infinite && (firstVisibleImg === nextVisibleImg)) {
      nextVisibleImg = 1;
    }

    setFirstVisibleImg(nextVisibleImg);
  };

  const scrolLeft = () => {
    let nextVisibleImg = firstVisibleImg - params.step;

    if (nextVisibleImg < 1) {
      nextVisibleImg = 1;
    }

    setFirstVisibleImg(nextVisibleImg);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          type="button"
          className="Carousel__button"
          onClick={scrolLeft}
          disabled={firstVisibleImg === 1}
        >
          Prev
        </button>

        <div
          style={{
            width: `${params.itemWidth * params.frameSize}px`,
            transition: `${params.animationDuration}ms`,
          }}
        >
          <ul className="Carousel__list">
            {images.map(image => (
              <li
                key={image.id}
                style={{
                  transform: `translateX(${-params.itemWidth * (firstVisibleImg - 1)}px)`,
                  transition: `${params.animationDuration}ms`,
                }}
              >
                <img
                  src={image.url}
                  alt={image.id.toString()}
                  style={{
                    width: `${params.itemWidth}px`,
                    height: `${params.itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          data-cy="next"
          className="Carousel__button"
          onClick={scrolRight}
          disabled={(!params.infinite
            && (firstVisibleImg === (images.length - params.frameSize + 1)))
            || params.frameSize === images.length}
        >
          Next
        </button>
      </div>

      <div className="Carousel__props Props">
        <div className="Props__container">
          <label htmlFor="itemWidth">Item size: </label>

          <input
            type="range"
            id="itemWidth"
            name="itemWidth"
            className="Props__range"
            min={50}
            max={300}
            step={1}
            value={params.itemWidth}
            onChange={(e) => changeCarousel('itemWidth', +e.target.value)}
          />

          <span>{`${params.itemWidth}x${params.itemWidth} px`}</span>
        </div>

        <div className="Props__container">
          <label htmlFor="step">
            {'Number of images scrolled per click: '}
          </label>

          <input
            type="number"
            id="step"
            name="step"
            className="Props__number"
            min={1}
            max={images.length - 1}
            step={1}
            value={params.step}
            onChange={(e) => changeCarousel('step', +e.target.value)}
          />
        </div>

        <div className="Props__container">
          <label htmlFor="frameSize">
            {'Number of images displayed at the same time: '}
          </label>

          <input
            type="number"
            id="frameSize"
            name="frameSize"
            className="Props__number"
            min={1}
            max={images.length}
            step={1}
            value={params.frameSize}
            onChange={(e) => changeCarousel('frameSize', +e.target.value)}
          />
        </div>

        <div className="Props__container">
          <label htmlFor="animationDuration">
            {'Itime in ms to show the new portion of images: '}
          </label>

          <input
            type="range"
            id="animationDuration"
            name="animationDuration"
            className="Props__range"
            min={300}
            max={3000}
            step={100}
            value={params.animationDuration}
            onChange={
              (e) => changeCarousel('animationDuration', +e.target.value)
            }
          />
          <span>{`${params.animationDuration} ms`}</span>
        </div>

        <div className="Props__container">
          <label htmlFor="infinite">
            {'To do the carousel cyclic '}
          </label>

          <input
            type="checkbox"
            id="infinite"
            name="infinite"
            className="Props__checkbox"
            min={300}
            max={3000}
            step={100}
            defaultChecked={params.infinite}
            onChange={
              (e) => changeCarousel('infinite', e.target.checked)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;

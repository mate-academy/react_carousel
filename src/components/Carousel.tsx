import React, { useState } from 'react';
import './Carousel.scss';
import { Image } from '../types/Image';
import { Params } from '../types/Parameters';

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

  const changeFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeCarousel('frameSize', +e.target.value);

    if ((params.frameSize + firstVisibleImg) > images.length) {
      if ((images.length - params.frameSize) > 0) {
        setFirstVisibleImg(images.length - params.frameSize);
      } else {
        setFirstVisibleImg(1);
      }
    }
  };

  return (
    <>
      <div
        className="Carousel"
        style={{
          width: `${params.itemWidth * params.frameSize}px`,
          transition: `${params.animationDuration}ms`,
        }}
      >
        <ul
          className="Carousel__list"
        >
          {images.map(image => (
            <li
              key={image.id}
              style={{
                transform: `translateX(${-params.itemWidth * (firstVisibleImg - 1)}px)`,
                transition: `transform ${params.animationDuration}ms`,
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

      <div className="button-section">
        <button
          className="button-63"
          disabled={firstVisibleImg === 1}
          type="button"
          onClick={scrolLeft}
        >
          Prev
        </button>
        <button
          className="button-63"
          disabled={(!params.infinite
            && (firstVisibleImg === (images.length - params.frameSize + 1)))
            || params.frameSize === images.length}
          type="button"
          data-cy="next"
          onClick={scrolRight}
        >
          Next
        </button>
      </div>

      <div className="form">
        <label>
          {'Step: '}
          <input
            min={1}
            max={images.length - 1}
            name="step"
            value={params.step}
            type="number"
            onChange={(e) => changeCarousel('step', +e.target.value)}
          />
        </label>

        <label>
          {'Frame size: '}
          <input
            min={1}
            max={images.length}
            name="frameSize"
            value={params.frameSize}
            type="number"
            onChange={changeFrameSize}
          />
        </label>

        <label>
          {'Item width: '}
          <input
            min={130}
            step={130}
            max={520}
            name="itemWidth"
            value={params.itemWidth}
            type="number"
            onChange={(e) => changeCarousel('itemWidth', +e.target.value)}
          />
        </label>

        <label>
          {'Animation duration: '}
          <input
            min={100}
            step={100}
            max={3000}
            name="animationDuration"
            value={params.animationDuration}
            type="number"
            onChange={
              (e) => changeCarousel('animationDuration', +e.target.value)
            }
          />
        </label>

        <label>
          {'Infinity: '}
          <input
            name="infinity"
            defaultChecked={params.infinite}
            type="checkbox"
            onChange={
              (e) => changeCarousel('infinite', e.target.checked)
            }
          />
        </label>
      </div>
    </>
  );
};

export default Carousel;

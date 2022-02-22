import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import './CarouselForm.scss';

type Props = {
  images: string[];
};

const CarouselForm: React.FC<Props> = ({ images }) => {
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [infiniteLoop, setInfiniteLoop] = useState(false);

  return (
    <>
      <Carousel
        images={images}
        frameSize={frameSize}
        step={step}
        itemWidth={itemWidth}
        infiniteLoop={infiniteLoop}
      />
      <form className="form">
        <label
          className="label"
          htmlFor="step"
        >
          Step:
          {' '}
          <input
            type="number"
            className="input__number"
            id="step"
            name="step"
            min={1}
            max={frameSize}
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>
        <label
          className="label"
          htmlFor="frameSize"
        >
          Frame Size:
          {' '}
          <input
            type="number"
            className="input__number"
            id="frameSize"
            name="frameSize"
            min={1}
            max={5}
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>
        <label
          className="label"
          htmlFor="itemWidth"
        >
          Item Width:
          {' '}
          <input
            type="range"
            className="input__range"
            id="itemWidth"
            name="itemWidth"
            min={100}
            max={200}
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>
        <label htmlFor="infinite">
          Infinite:
          {' '}
          <input
            type="checkbox"
            className="input__checkbox"
            id="infinite"
            name="infinite"
            checked={infiniteLoop}
            onChange={e => setInfiniteLoop(e.target.checked)}
          />
        </label>
      </form>
    </>
  );
};

export default CarouselForm;

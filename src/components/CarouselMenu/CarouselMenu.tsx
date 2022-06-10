import React, { useState } from 'react';
import { Carousel } from '../Carousel/Carousel';
import './CarouselMenu.scss';

type Props = {
  images: string[];
};

export const CarouselMenu: React.FC<Props> = ({ images }) => {
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [isInfinite, setIsInfinite] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <>
      <Carousel
        images={images}
        frameSize={frameSize}
        step={step}
        itemWidth={itemWidth}
        isInfinite={isInfinite}
        animationDuration={animationDuration}
      />
      <ul className="list">
        <li className="list__item">
          <span>Step:</span>
          <input
            type="number"
            id="step"
            name="step"
            min={1}
            max={frameSize}
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </li>
        <li className="list__item">
          <span>Frame Size:</span>
          <input
            type="number"
            id="frameSize"
            name="frameSize"
            min={1}
            max={5}
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </li>
        <li className="list__item">
          <span>Item Width:</span>
          <input
            type="number"
            id="itemWidth"
            name="itemWidth"
            min={100}
            step={10}
            max={200}
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </li>
        <li className="list__item">
          <span>Animation Duration:</span>
          <input
            type="number"
            id="itemWidth"
            name="itemWidth"
            min={0}
            step={500}
            max={5000}
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </li>
        <li className="list__item">
          <span>Is Infinite:</span>
          <input
            type="checkbox"
            className="input__checkbox"
            id="infinite"
            name="infinite"
            checked={isInfinite}
            onChange={e => setIsInfinite(e.target.checked)}
          />
        </li>
      </ul>
    </>
  );
};

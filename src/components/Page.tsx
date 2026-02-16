import { useState } from 'react';
import Carousel from './Carousel';

interface Prop {
  images: string[];
}

export const Page = ({ images }: Prop) => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <>
      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={false}
      />

      <form>
        <label htmlFor="itemId">Item Width</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={e => setItemWidth(Number(e.target.value))}
        />

        <label htmlFor="frameId">Frame Size</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={e => setFrameSize(Number(e.target.value))}
        />

        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />

        <label htmlFor="animationDuration">Animation Duration</label>
        <input
          id="animationDuration"
          type="number"
          value={animationDuration}
          onChange={e => setAnimationDuration(Number(e.target.value))}
        />
      </form>
    </>
  );
};

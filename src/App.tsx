import { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { images } from './components/img/Images';
import { CarouselSettings } from './components/CarouselSettings';

export const App = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <CarouselSettings
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
        onItemWidthChange={(e) => setItemWidth(parseInt(e.target.value, 10))}
        onFrameSizeChange={(e) => setFrameSize(parseInt(e.target.value, 10))}
        onStepChange={(e) => setStep(parseInt(e.target.value, 10))}
        onAnimationDurationChange={
          (e) => setAnimationDuration(parseInt(e.target.value, 10))
        }
        onInfiniteChange={(e) => setInfinite(e.target.checked)}
      />
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

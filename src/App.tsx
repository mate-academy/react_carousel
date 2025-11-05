import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { CarouselSettings } from './components/CarouselSettings';

const images = [
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
  './img/8.png',
  './img/9.png',
  './img/10.png',
];

interface SliderSettings {
  animationDuration: number;
  frameSize: number;
  itemWidth: number;
  step: number;
  infinite: boolean;
}

const App: React.FC = () => {
  const [sliderSettings, setSliderSettings] = useState<SliderSettings>({
    animationDuration: 1000,
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    infinite: false,
  });

  const handleChangeSetup = <K extends keyof SliderSettings>(
    key: K,
    value: SliderSettings[K],
  ) => {
    setSliderSettings(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const { step, animationDuration, frameSize, infinite, itemWidth } =
    sliderSettings;

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <CarouselSettings
        duration={animationDuration}
        frameSize={frameSize}
        itemWidth={itemWidth}
        step={step}
        infinite={infinite}
        onChangeDuration={(val: number) =>
          handleChangeSetup('animationDuration', val)
        }
        onChangeFrameSize={(val: number) => handleChangeSetup('frameSize', val)}
        onChangeItemWidth={(val: number) => handleChangeSetup('itemWidth', val)}
        onChangeStep={(val: number) => handleChangeSetup('step', val)}
        onChangeInfinite={(val: boolean) => handleChangeSetup('infinite', val)}
      />

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        infinite={infinite}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;

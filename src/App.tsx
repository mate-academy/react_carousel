import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { useState } from 'react';
// eslint-disable-next-line max-len
import { OptionForCarousel } from './components/OptionForCarousel/OptionForCarousel';

export interface State {
  images: string[];
}

const App: React.FC<{}> = () => {
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(1);
  const [prev, setPrev] = useState(1);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [visibleItem] = useState<State>({
    images: [
      `./img/1.png`,
      `./img/2.png`,
      `./img/3.png`,
      `./img/4.png`,
      `./img/5.png`,
      `./img/6.png`,
      `./img/7.png`,
      `./img/8.png`,
      `./img/9.png`,
      `./img/10.png`,
    ],
  });

  const { images } = visibleItem;

  return (
    <div className="App">
      <h1>Carousel with {images.length} images</h1>

      <OptionForCarousel
        setPrev={setPrev}
        setStep={setStep}
        frameSize={frameSize}
        setFrameSize={setFrameSize}
        setItemWidth={setItemWidth}
        setAnimationDuration={setAnimationDuration}
      />

      <Carousel
        prev={prev}
        setPrev={setPrev}
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;

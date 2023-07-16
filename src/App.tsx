import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { InputField } from './components/InputField/InputField';

const images: string[] = [
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

const App: React.FC = () => {
  const [imageSize, setImageSize] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="form">
        <InputField
          forId="itemId"
          type="number"
          text="Set image size"
          step={100}
          value={imageSize}
          setValue={setImageSize}
        />

        <InputField
          forId="frameId"
          type="number"
          text="Set frame size"
          step={1}
          value={frameSize}
          setValue={setFrameSize}
        />

        <InputField
          forId="stepId"
          type="number"
          text="Set step"
          step={1}
          value={step}
          setValue={setStep}
        />

        <InputField
          forId="animationDuration"
          type="number"
          text="Set animation duration"
          step={100}
          value={animationDuration}
          setValue={setAnimationDuration}
        />
      </form>

      <Carousel
        images={images}
        itemWidth={imageSize}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;

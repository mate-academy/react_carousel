import { useEffect, useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

const IMAGES: string[] = Array.from({ length: 10 }, (_, i) => `./img/${i + 1}.png`);

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'Carousel';
  }, []);

  const [itemWidth, setItemWidth] = useState<number>(130);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);

  return (
    <div className="section content">
      <h1 data-cy="title">Carousel</h1>

      <div className="controls">
        <label htmlFor="itemId">itemWidth</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={(e) => setItemWidth(Number(e.target.value))}
        />

        <label htmlFor="frameId">frameSize</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={(e) => setFrameSize(Number(e.target.value))}
        />

        <label htmlFor="stepId">step</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />

        <label htmlFor="animId">animationDuration</label>
        <input
          id="animId"
          type="number"
          value={animationDuration}
          onChange={(e) => setAnimationDuration(Number(e.target.value))}
        />
      </div>

      <Carousel
        images={IMAGES}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;

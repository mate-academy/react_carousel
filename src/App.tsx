import { useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import { imagesData } from './imagesData';

import './App.scss';

import Querry from './components/Querry/Querry';
import { Querries } from './types/Queries';

const App = () => {
  const [width, setWidth] = useState(130);
  const [frame, setFrame] = useState(3);
  const [step, setStep] = useState(3);
  const [animation, setAnimation] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const handleQuerry = (value: number, querry: string) => {
    if (querry === Querries.itemWidth) {
      setWidth(value);
    }

    if (querry === Querries.frameSize) {
      setFrame(value);
    }

    if (querry === Querries.step) {
      setStep(value);
    }

    if (querry === Querries.animationDuration) {
      setAnimation(value);
    }

    if (querry === Querries.infinite) {
      const boolState = value ? true : false;

      setInfinite(boolState);
    }
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {imagesData.length} images</h1>
      <Querry onChange={handleQuerry} />
      <Carousel
        images={imagesData}
        step={step}
        frameSize={frame}
        itemWidth={width}
        animationDuration={animation}
        infinite={infinite}
      />
    </div>
  );
};

export default App;

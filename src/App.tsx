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

  const handleQuerry = (num: number, querry: string) => {
    if (querry === Querries.itemWidth) {
      setWidth(num);
    }

    if (querry === Querries.frameSize) {
      setFrame(num);
    }

    if (querry === Querries.step) {
      setStep(num);
    }

    if (querry === Querries.animationDuration) {
      setAnimation(num);
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
        infinite={false}
      />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';
import { initialImages } from './api/images/images';
import { FormParams } from './types/formParams';
import { Form } from './components/Form/Forms';

const App: React.FC = () => {
  const [visabilityParams, setVisabilityParams] = useState<FormParams>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, type, value, checked,
    } = event.target;

    setVisabilityParams(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : +value,
    }));
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      < h1 > Carousel with {initialImages.length} images</h1>

      <Carousel
        images={initialImages}
        visabilityParams={visabilityParams}
      />
      <Form
        visabilityParams={visabilityParams}
        max={initialImages.length}
        onChangeValue={changeValue}
      />
    </div>
  );
};

export default App;

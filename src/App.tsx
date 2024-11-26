import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { CarouselForm } from './components/CarouselForm/CarouselForm';

const App = () => {
  const [options, setOptions] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  });

  const [isInfinity, setIsInfinity] = useState(false);

  const { step, frameSize, itemWidth, animationDuration } = options;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Tab',
    ];

    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChangeOption = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOptions(prevState => ({
      ...prevState,
      [name]: +value,
    }));
  };

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

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={isInfinity}
      />

      <CarouselForm
        handleKeyDown={handleKeyDown}
        handleChangeOption={handleChangeOption}
        options={options}
        maxitemsLength={images.length}
        infinity={isInfinity}
        onChangeInfinity={setIsInfinity}
      />
    </div>
  );
};

export default App;

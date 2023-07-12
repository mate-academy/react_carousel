import { useState, FC, ChangeEvent } from 'react';
import { Form } from './components/Form';
import { Carousel } from './components/Carousel/Carousel';
import { CarouselOptions } from './types/CarouselOptions';
import { OptionsEnum } from './enums/OptionsEnum';
import './scss/App.scss';

export const App: FC = () => {
  const [carouselOptions, setCarouselOptions] = useState<CarouselOptions>({
    [OptionsEnum.ItemWidth]: 130,
    [OptionsEnum.FrameSize]: 3,
    [OptionsEnum.Step]: 3,
    [OptionsEnum.AnimationDuration]: 1000,
  });

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

  const handleChangeOptionValue = (event: ChangeEvent<HTMLInputElement>) => {
    const currentOption = event.target.name;
    const newValue = +event.target.value;

    setCarouselOptions(prevOptions => {
      return {
        ...prevOptions,
        [currentOption]: newValue,
      };
    });
  };

  return (
    <div className="App">
      <div className="App-Container">
        <h1 className="App-Title" data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <Form
          carouselOptions={carouselOptions}
          changeOptionValue={handleChangeOptionValue}
          maxSlidesCount={images.length}
        />

        <Carousel images={images} carouselOptions={carouselOptions} />
      </div>
    </div>
  );
};

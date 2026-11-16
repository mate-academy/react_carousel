import { useState } from 'react';
import { Carousel } from './components/Carousel';
import { Page, WrapperInputs, Title } from './App.styled';
import { Input } from './components/Inputs';

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

export const App = () => {
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [step, setSpet] = useState<number>(3);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);
  const [infinite, setInfinite] = useState<boolean>(false);

  return (
    <Page>
      <Title data-cy="title">Carousel with {images.length} images</Title>
      <WrapperInputs>
        <Input
          id="itemId"
          type="number"
          label="Item width"
          value={itemWidth}
          onChange={val => setItemWidth(Number(val))}
        />
        <Input
          id="frameId"
          type="number"
          label="Frame size"
          value={frameSize}
          onChange={val => setFrameSize(Number(val))}
        />
        <Input
          id="stepId"
          type="number"
          label="Step"
          value={step}
          onChange={val => setSpet(Number(val))}
        />
        <Input
          id="animationId"
          type="number"
          label="Animation duration"
          value={animationDuration}
          onChange={val => setAnimationDuration(Number(val))}
        />
        <Input
          id="infiniteId"
          type="checkbox"
          label="Infinite"
          value={infinite}
          onChange={val => setInfinite(val as boolean)}
        />
      </WrapperInputs>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </Page>
  );
};

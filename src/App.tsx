import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

export const App = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [imgOnPage, setImgOnPage] = useState(3);
  const [imgForChange, setImgForChange] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  function handleChangeWidth(query: React.ChangeEvent<HTMLInputElement>) {
    if (+query.target.value > 50) {
      setItemWidth(+query.target.value);
    } else {
      setItemWidth(130);
    }
  }

  function handleChangeFrame(qty: React.ChangeEvent<HTMLInputElement>) {
    setImgOnPage(+(qty.target.value));
  }

  function handleChangeStep(step: React.ChangeEvent<HTMLInputElement>) {
    setImgForChange(+(step.target.value));
  }

  function handleAnimationChange(time: React.ChangeEvent<HTMLInputElement>) {
    setAnimationDuration(+(time.target.value));
  }

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>
      <input
        name="ItemWidth"
        onChange={handleChangeWidth}
      />

      <input
        name="ImgOnPage"
        onChange={handleChangeFrame}
      />

      <input
        name="ImgForChange"
        onChange={handleChangeStep}
      />

      <input
        name="animation"
        onChange={handleAnimationChange}
      />

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={imgOnPage}
        step={imgForChange}
        animationDuration={animationDuration}
      // infinite={false}
      />
    </div>
  );
};

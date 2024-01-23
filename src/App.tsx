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
  const [itemWidth, setItemWidth] = useState('130px');
  const [imgOnPage, setImgOnPage] = useState(10);
  const [imgForChange, setImgForChange] = useState(3);

  function handleChangeWidth(query: React.ChangeEvent<HTMLInputElement>) {
    if (query.target.value.length > 2) {
      setItemWidth(`${query.target.value}px`);
    }
  }

  function handleChangeFrame(qty: React.ChangeEvent<HTMLInputElement>) {
    setImgOnPage(+(qty.target.value));
  }

  function handleChangeStep(step: React.ChangeEvent<HTMLInputElement>) {
    setImgForChange(+(step.target.value));
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

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={imgOnPage}
        step={imgForChange}
      // animationDuration={1000}
      // infinite={false}
      />
    </div>
  );
};

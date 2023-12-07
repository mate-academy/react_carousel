import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

/* type StateProps = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
} */

export const App: React.FC = () => {
/*   const [state, setState] = useState({
    images: [
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
    ],
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  } as StateProps); */

  const [pictures] = useState([
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
  ]);

  const [itemWidth, setItemWidth] = useState(130);

  document.documentElement.style.setProperty('--itemLength', `${pictures.length}px`);
  document.documentElement.style.setProperty('--carouselWidth', `${pictures.length * itemWidth}px`);

  // const [step, setStep] = useState(3);

 // const [frameSize, setFrameSize] = useState(3);

 // const [animationDuration, setAnimationDuration] = useState(1000);
 // const [infinite, setInfinite] = useState(false);

/*   const changeHadler = (value: number, key: keyof StateProps) => {
    setState(prevState => {
      const newState: StateProps = { ...prevState };

      newState[key] = value;

      return newState;
    });
  }; */

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1>Carousel with {pictures.length} images</h1>

      <Carousel images={pictures} />
      <input
        type="number"
        name="itemWidth"
        id="itemWidth"
        value={itemWidth}
        min={50}
        max={500}
        step={10}
        onChange={e => {
          setItemWidth(+e.target.value);
          document.documentElement.style.setProperty('--itemWidth', `${+e.target.value}px`);
        }}
      />
    </div>
  );
};

export default App;

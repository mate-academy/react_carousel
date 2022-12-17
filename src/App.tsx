import { FC, ChangeEvent, useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

// interface State {
//   images: string[];
//   step: number;
//   frameSize: number;
//   itemWidth: number;
//   // infinite: boolean;
// }

const App: FC = () => {
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

  const [carouselElements, setCarouselElements] = useState(
    {
      step: 2,
      frameSize: 3,
      itemWidth: 130,
      animationDuration: 1000,
      infinite: false,
    },
  );

  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = carouselElements;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    if (id === 'infinite') {
      setCarouselElements(state => (
        {
          ...state,
          infinite: !state.infinite,
        }
      ));

      return;
    }

    setCarouselElements(state => (
      {
        ...state,
        [id]: +value,
      }
    ));
  };

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel with
        {images.length}
      </h1>

      <div className="container">
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>

      <div>
        <label htmlFor="itemWidth">Item Width:</label>
        <input
          type="number"
          value={itemWidth}
          onChange={handleChange}
          id="itemWidth"
          min="0"
        />
      </div>

      <div>
        <label htmlFor="frameSize">Frame size:</label>
        <input
          type="number"
          value={frameSize}
          onChange={handleChange}
          id="frameSize"
          min="0"
        />
      </div>

      <div>
        <label htmlFor="step">step:</label>
        <input
          type="number"
          value={step}
          onChange={handleChange}
          id="step"
          min="0"
        />
      </div>

      <div>
        <label htmlFor="animationDuration">animation duration:</label>
        <input
          type="number"
          value={animationDuration}
          onChange={handleChange}
          id="animationDuration"
          min="0"
        />
      </div>

      <form>
        <label htmlFor="infinite">infinite:</label>
        <input
          type="checkbox"
          name="infinite"
          id="infinite"
          onChange={handleChange}
          checked={infinite === true}
        />
      </form>
    </div>
  );
};

export default App;

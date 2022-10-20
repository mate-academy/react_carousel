import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './App.scss';
import { useState } from 'react';
import { Carousel } from './components/Carousel';
import { carouselLengthSelector } from './utils/carouselLengthSelector';

export const App = () => {
  const [carouselLength, setCarouselLength] = useState(3);

  return (
    <div className="App">
      <Carousel carouselLength={carouselLength} />

      <div className="select">
        <h4 className="select__title">Chose length of carousel:</h4>
        <select
          value={carouselLength}
          defaultValue={3}
          onChange={(event) => {
            setCarouselLength(+event.target.value);
          }}
        >
          {carouselLengthSelector.map(selector => (
            <option
              value={selector.number}
              key={selector.id}
            >
              {selector.number}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

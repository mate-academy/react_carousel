import React from 'react';

import './Carousel.scss';

const Carousel = () => (
  <div className="Carousel">
    <ul className="Carousel__list">
      <li><img src="./img/1.png" alt="1" /></li>
      <li><img src="./img/1.png" alt="2" /></li>
      <li><img src="./img/1.png" alt="3" /></li>
      <li><img src="./img/1.png" alt="4" /></li>
    </ul>

    <button type="button">Prev</button>
    <button type="button">Next</button>
  </div>
);

export default Carousel;

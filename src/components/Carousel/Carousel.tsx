import React from 'react';
import { Buttons } from '../Buttons';
import { CarouselList } from '../CarouselList';

import './Carousel.scss';

export const Carousel: React.FC = () => (
  <div className="carousel">
    <CarouselList />

    <Buttons />
  </div>
);

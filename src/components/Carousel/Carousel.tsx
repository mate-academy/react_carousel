import React from 'react';

import { CarouselButton } from '../CarouselButton/CarouselButton';
import { CarouselList } from '../CarouselList';
import { Form } from '../Form';
import './Carousel.scss';

type Props = {
  images: string[];
};

export const Carousel: React.FC<Props> = ({ images }) => (
  <div className="Carousel">
    <Form />

    <CarouselList images={images} />

    <CarouselButton />
  </div>
);

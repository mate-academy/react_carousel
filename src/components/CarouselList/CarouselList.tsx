import { FC } from 'react';
import { CarouselStyles } from '../../types/CarouselStyles';

type Props = {
  slides: string[];
  styles: CarouselStyles;
};

export const CarouselList: FC<Props> = ({ slides, styles }) => {
  const { imgStyles, listStyles } = styles;

  return (
    <ul className="Carousel-List" style={listStyles}>
      {slides.map((image, idx) => (
        <li key={image} className="Carousel-ListItem">
          <img
            src={image}
            alt={`${idx + 1}`}
            style={imgStyles}
          />
        </li>
      ))}
    </ul>
  );
};

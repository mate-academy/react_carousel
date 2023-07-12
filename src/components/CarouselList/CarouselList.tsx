import { FC } from 'react';
import { CarouselStyles } from '../../types/CarouselStyles';

type Props = {
  slides: string[];
  itemWidth: number;
  styles: CarouselStyles;
};

export const CarouselList: FC<Props> = ({ slides, styles, itemWidth }) => {
  return (
    <ul className="Carousel-List" style={styles}>
      {slides.map((image, idx) => (
        <li key={image} className="Carousel-ListItem">
          <img
            width={itemWidth}
            height={itemWidth}
            src={image}
            alt={`${idx + 1}`}
          />
        </li>
      ))}
    </ul>
  );
};

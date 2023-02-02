import { PureComponent } from 'react';
import { CarouselItem } from '../CarouselItem';
import { CarouselProps } from '../../../../types/CarouselProps';

import './CarouselList.scss';

type PrivatelProps = Pick<
CarouselProps, 'itemWidth' | 'animationDuration'
>;

interface Props {
  translate: number,
  images: string[],
}

export class CarouselList extends PureComponent<Props & PrivatelProps, {}> {
  render() {
    const {
      images,
      translate,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${translate}px)`,
          transition: `transform ${animationDuration}ms linear`,
        }}
      >
        {images.map((image: string) => (
          <CarouselItem
            key={image}
            image={image}
            itemWidth={itemWidth}
          />
        ))}
      </ul>
    );
  }
}

import { PureComponent } from 'react';
import { CarouselProps } from '../../../../types/CarouselProps';

type PrivatelProps = Pick<CarouselProps, 'itemWidth'>;

interface Props {
  image: string;
}

export class CarouselItem extends PureComponent<Props & PrivatelProps, {}> {
  render() {
    const { image, itemWidth } = this.props;

    return (
      <li className="Carousel__item">
        <img
          src={image}
          alt={image}
          className="Carousel__img"
          style={{ width: `${itemWidth}px` }}
          width={itemWidth}
        />
      </li>
    );
  }
}

import React from 'react';
import './Carousel.scss';

type Props = {
  img: string[]
  width: number,
  frame: number,
  animation: number,
};

const Carousel: React.FC<Props> = ({
  img, width, frame, animation,
}) => (
  <ul className="Carousel__list" style={{ width: `${frame * width}px`, transition: `${animation}` }}>
    {img.map(im => <li className="Carousel__list--item" key={im}><img src={im} alt={im} width={width} /></li>)}
  </ul>
);

export default Carousel;

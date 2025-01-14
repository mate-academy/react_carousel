import React from 'react';
type Props = {
  image: string;
  imageWidth: number;
  imageNumber: number;
};
export const CarouselCard: React.FC<Props> = ({
  image,
  imageWidth,
  imageNumber,
}) => (
  <li>
    <img
      src={image}
      alt={`emoji${imageNumber}`}
      style={{
        width: `${imageWidth}px`,
        height: `${imageWidth}px`,
      }}
    />
  </li>
);

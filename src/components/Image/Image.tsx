import React from 'react';

interface Props {
  image: string;
  index: number;
  imageSize: number;
}
export const Image: React.FC<Props> = ({
  image,
  index,
  imageSize,
}) => {
  return (
    <li>
      <img
        src={image}
        alt={`${index}`}
        style={{ width: `${imageSize}px` }}
      />
    </li>
  );
};

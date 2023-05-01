import React from 'react';

interface Props {
  image: string;
  index: number;
  imageSize: number;
  isVisible: boolean
}
export const Image: React.FC<Props> = ({
  image,
  index,
  imageSize,
  isVisible,

}) => {
  return (
    <li>
      <img
        src={image}
        alt={`${index + 1}`}
        width={imageSize}
        style={{
          width: `${imageSize}px`,
          visibility: isVisible ? 'visible' : 'hidden',
          transition: 'visibility 2s',
        }}
      />
    </li>
  );
};

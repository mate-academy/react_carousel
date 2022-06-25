import React from 'react';
import './ImageList.scss';
import { imegeListShape } from '../../types';
import { Image } from '../Image/Image';

export const ImageList = ({ listStyles, imgStyles, images }) => (
  <ul style={listStyles} className="image-list">
    {images.map(image => (
      <li key={Math.random()}>
        <Image
          imgStyles={imgStyles}
          image={image}
        />
      </li>
    ))}
  </ul>
);

ImageList.propTypes = imegeListShape;

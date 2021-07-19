import React from 'react';
import { imegeListShape } from '../../types';

export const Image = ({ imgStyles, image }) => (
  <img style={imgStyles} src={image} alt="emoji" />
);

Image.propTypes = imegeListShape;

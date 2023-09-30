import React from 'react';

import './CarouselButton.scss';

export const CarouselButton: React.FC = () => (
  <div className="button-wrapper">
    <button type="button" className="button">Prev</button>
    <button type="button" className="button">Next</button>
    {/* <a href="#" className="button">Prev</a>
    <a href="#" className="button">Next</a> */}
  </div>
);

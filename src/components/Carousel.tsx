/* eslint-disable */
import { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<Props> = ( props ) => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const oneStep = props.itemWidth * props.step;
  const listLength = props.itemWidth * props.images.length;

  return (
    <div className="Carousel">
      <div
        className="container"
        style={{ width: props.itemWidth * props.frameSize }}
      >
        <ul
          className="Carousel__list"
          style={{ transition: `transform ${props.animationDuration}ms`,
          transform: `translateX(${-scrollWidth}px)`}}
        >
          {props.images.map((image, i) => {
            return (
              <li key={i}>
                <img
                  src={image}
                  alt={`${i}`}
                  style={{ width: props.itemWidth, transition: `width ${props.animationDuration}ms` }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className='swipe-buttons'>
        <button 
          type="button"
          disabled={scrollWidth === 0 ? true : false}
          onClick={() => setScrollWidth(prev => {
            if (prev - oneStep < 0) {
              return 0;
            }
            return prev - oneStep;
          })}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={scrollWidth === listLength - oneStep ? true : false}
          data-qa="next"
          onClick={() => setScrollWidth(prev => {
            if (prev + oneStep + oneStep > listLength) {
              return listLength - oneStep;
            } 
             return prev + oneStep;
          })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

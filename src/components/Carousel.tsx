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
          // onClick={() => setScrolled(0)}
        >
          Prev
        </button>
        <button
          type="button"
          data-qa="next"
          onClick={() => setScrollWidth(prev => {
            return prev + (props.itemWidth * props.step);
          })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

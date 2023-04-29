import React from 'react';
import './Carousel.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type Props = {
  arrOfCarousel: string[],
  frameSize: number,
  itemWidth: number,
};

export const Carousel: React.FC<Props>
  = ({ arrOfCarousel = [], frameSize = 390, itemWidth = 130 }) => (
    <div className="Carousel__list" style={{ width: `${frameSize}px` }}>
      <TransitionGroup>
        {arrOfCarousel.map((image) => (
          <CSSTransition
            key={image}
            timeout={400}
            classNames="example"
          >

            <img
              src={image}
              alt="1"
              className="Carousel__image"
              style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
              key={image}
            />
          </CSSTransition>

        ))}
      </TransitionGroup>
    </div>
  );

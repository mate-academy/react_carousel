import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

const Carousel = ({
  images,
  steep,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  updateList,
}) => {
  const widthCarousel = itemWidth * images.length;
  const widthOneScroll = steep * itemWidth;
  let startPosCarousel = null;
  const maxWidthScroll = widthCarousel - frameSize * itemWidth;
  let possibilityMove = true;

  const validScrollStyle = (scroll) => {
    const navButtLeft = document.querySelector('.Carousel__navButton--prev');
    const navButtRight = document.querySelector('.Carousel__navButton--next');

    const valid = (validScroll, butt) => {
      if (validScroll) {
        butt.classList.add('Carousel__navButton--noScroll');
      } else {
        butt.classList.remove('Carousel__navButton--noScroll');
      }
    };

    valid((scroll <= 0), navButtLeft);
    valid(scroll >= maxWidthScroll, navButtRight);
  };

  const validMove = () => {
    possibilityMove = false;
    setTimeout(() => {
      possibilityMove = true;
    }, animationDuration);
  };

  const changeTransformAnim = (elem, transform, anim) => (11);

  if (updateList) {
    const carousel = document.querySelector('.Carousel__list-scroll');

    changeTransformAnim(carousel, 0, 500);
    validScrollStyle(0);
  }

  const scrollCarousel = (isNext) => {
    const carusel = document.querySelector('.Carousel__list-scroll');
    const scroll = carusel.getBoundingClientRect().x;

    startPosCarousel = !startPosCarousel ? scroll : startPosCarousel;
    let oneScroll = widthOneScroll - (scroll - startPosCarousel);

    if (!isNext) {
      oneScroll -= widthOneScroll * 2;
    }

    if (oneScroll >= maxWidthScroll) {
      oneScroll = maxWidthScroll;
    }

    changeTransformAnim(carusel, oneScroll, animationDuration);

    if (infinite) {
      if (scroll - startPosCarousel === -maxWidthScroll
        && isNext) {
        changeTransformAnim(carusel, 0, animationDuration);
      } else if (scroll === startPosCarousel
        && !isNext) {
        changeTransformAnim(carusel, maxWidthScroll, animationDuration);
      }

      return;
    }

    validScrollStyle(oneScroll);
  };

  return (
    <div className="Carousel">

      <button
        type="button"
        className={`
        Carousel__navButton
        Carousel__navButton--prev
        ${!infinite && 'Carousel__navButton--noScroll'}`}
        onClick={({ target }) => {
          if (!possibilityMove) {
            return;
          }

          scrollCarousel(false, target);
          validMove();
        }}
      />

      <ul className="Carousel__list" style={{ width: frameSize * itemWidth }}>
        <div className="Carousel__list-scroll">
          {images.map((img, index) => (
            <li key={new Date()}>
              <img
                src={img}
                alt={index + 1}
                width={itemWidth}
              />
            </li>
          ))}
        </div>
      </ul>

      <button
        type="button"
        className="
        Carousel__navButton
        Carousel__navButton--next"
        onClick={({ target }) => {
          if (!possibilityMove) {
            return;
          }

          scrollCarousel(true, target);
          validMove();
        }}
      />

    </div>
  );
};

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  steep: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  updateList: PropTypes.bool.isRequired,
};

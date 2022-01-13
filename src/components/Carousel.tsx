import React from 'react';
import './Carousel.scss';

type Props = {
  step: number,
  imagesList: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number,
};

const Carousel: React.FC<Props> = (props) => (
  <div className="container">
    <button
      className="button button__prev"
      type="button"
      onClick={() => {
        const imagesContainer: HTMLElement | null = document.querySelector('.Carousel__list');

        if (imagesContainer) {
          imagesContainer.style.transform += `translateX(${props.itemWidth * props.step}px)`;
          /* eslint-disable-next-line */
          console.log(imagesContainer.style.left);
        }
      }}
    >
      press for
      <br />
      <br />
      <strong>PREV</strong>
    </button>
    <div
      className="Carousel"
      style={{
        width: props.frameSize * props.itemWidth,
      }}
    >
      <ul className="Carousel__list" style={{ transition: `transform ${props.animationDuration}ms` }}>
        {props.imagesList.map((item, index) => (
          <>
            <li>
              <img
                src={item}
                alt={index.toString()}
                className="Carousel__item"
                style={{ width: props.itemWidth }}
              />
            </li>
          </>
        ))}
      </ul>
    </div>
    <button
      className="button button__prev"
      type="button"
      onClick={() => {
        const imagesContainer: HTMLElement | null = document.querySelector('.Carousel__list');

        if (imagesContainer) {
          imagesContainer.style.transform += `translateX(${-props.itemWidth * props.step}px)`;
          /* eslint-disable-next-line */
        }
      }}
    >
      press for
      <br />
      <br />
      <strong>NEXT</strong>
    </button>
  </div>
);

export default Carousel;

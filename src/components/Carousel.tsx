import { useState } from 'react';
import './Carousel.scss';
// import classNames from 'classnames';
import { State } from '../types/State';
// import 'bulma';

// interface Carousel {
//   step: 3
//   frameSize: 3
//   itemWidth: 130
//   animationDuration: 1000
//   infinite: false
//   images: ['url1', 'url2']
// }

// const items = {
//   first: 0,
//   last: 9,
// };

const Carousel: React.FC<State> = ({ images }: State) => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [translate, setTranslate] = useState(0);
  const [position, setPositon] = useState(0);
  // const [duration, setDuration] = useState(0);
  const width = itemWidth * frameSize;
  const maxPosition = 10 - frameSize;
  // const [index, setIndex] = useState(0);

  return (

    <div className="Carousel" data-cy="title">
      <div
        className="container"
        style={{

          overflow: 'hidden',
          width: `${width}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{

            transform: `translateX(${-translate}px)`,
            // transitionDuration: `${duration}s`,
          }}
        >

          {
            images.map(((img, idx) => (

              <li
                key={img}
                className="Carousel__Item"
              >
                <img
                  className="Carousel__img"
                  src={img}
                  // src={(idx === index) ? img : ''}
                  alt={`${idx}`}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            )
            ))
          }
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={() => {
            if (position >= 0 || position < maxPosition) {
              setTranslate(prevTranslate => prevTranslate
                - frameSize * step * itemWidth);
              setPositon(prevPosition => prevPosition - step * frameSize);
            }
          }}
          className="Carousel__btn--prev"
          // disabled={position === 0}
          // onClick={() => {
          //   const newIndex = index - 1;
          //   setIndex(newIndex < 0 ? images.length - 1 : newIndex);
          //   }}
        >
          Prev
        </button>

        <button
          type="button"
          onClick={() => {
            if (position >= 0 || position < maxPosition) {
              setTranslate(prevTranslate => prevTranslate
                + frameSize * step * itemWidth);
              setPositon(prevPosition => prevPosition + step * frameSize);
            }
          }}
          className="Carousel__btn--next"
          // disabled={position === maxPosition}
          data-cy="next"
          // onClick={() => {
          //    const newIndex = index + 1;
          //    setIndex(newIndex >= images.length ? 0 : newIndex);
          //   }}
        >
          Next
        </button>
      </div>

      <form
        action=""
        className="Carousel__form"
      >

        <input
          className="input is-primary"
          type="text"
          placeholder="frameSize"
          onChange={(event) => {
            setFrameSize(+event.target.value);
          }}
        />

        <input
          className="input is-primary"
          type="text"
          placeholder="itemWidth"
          onChange={(event) => {
            setItemWidth(+event.target.value);
          }}
        />

        <input
          id="stepId"
          className="input is-primary"
          type="text"
          placeholder="Step"
          onChange={(event) => {
            setStep(+event.target.value);
          }}
        />

        <input
          className="input is-primary"
          type="text"
          placeholder="animationDuration"
          // onChange={(event) => setDuration(+event.target.value)}
        />

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button type="button" className="button is-link is-light">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Carousel;

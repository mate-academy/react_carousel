import { useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';
import { images } from '../utils/images';
import { carouselLengthSelector } from '../utils/carouselLengthSelector';

export const Carousel: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDurarion, setAnimationDurarion] = useState(1000);
  const [isInfinite, setInfinite] = useState(false);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = useMemo(() => {
    return {
      className: 'carousel',
      dots: true,
      infinite: isInfinite,
      speed: animationDurarion,
      slidesToShow: frameSize,
      slidesToScroll: step,
      arrows: false,
    };
  }, [isInfinite, animationDurarion, frameSize, step]);

  return (
    <>
      <div className="carousel">
        <div className="carousel__header">
          <h1>
            Carousel with
            {` ${frameSize} `}
            images
          </h1>

          <div className="carousel__buttons">
            <button
              type="button"
              className="button"
              onClick={previous}
            >
              {'<'}
            </button>

            <button
              type="button"
              className="button"
              onClick={next}
            >
              {'>'}
            </button>
          </div>

        </div>
        <Slider ref={sliderRef} {...settings}>
          {images.map((item) => (
            <div>
              <div className="container">
                <img style={{ width: itemWidth }} src={item} alt="logo" />
              </div>
            </div>
          ))}
        </Slider>

      </div>
      <div className="select">
        <h4 className="select__title">Chose image width:</h4>
        <button
          type="button"
          onClick={() => {
            setItemWidth(itemWidth - 1);
          }}
        >
          -
        </button>
        <input style={{ width: 25 }} type="text" value={itemWidth} />
        <button
          type="button"
          onClick={() => {
            setItemWidth(itemWidth + 1);
          }}
        >
          +
        </button>
        <br />
        <br />
        <h4 className="select__title">Choose frame size:</h4>
        <select
          value={frameSize}
          defaultValue={3}
          onChange={(event) => {
            setFrameSize(+event.target.value);
          }}
        >
          {carouselLengthSelector.map(selector => (
            <option
              value={selector.number}
              key={selector.id}
            >
              {selector.number}
            </option>
          ))}
        </select>
        <br />
        <br />
        <h4 className="select__title">Chose steps:</h4>
        <select
          value={step}
          defaultValue={3}
          onChange={(event) => {
            setStep(+event.target.value);
          }}
        >
          {carouselLengthSelector.map(selector => (
            <option
              value={selector.number}
              key={selector.id}
            >
              {selector.number}
            </option>
          ))}
        </select>
        <br />
        <br />
        <h4 className="select__title">Chose animation duration:</h4>
        <button
          type="button"
          onClick={() => {
            setAnimationDurarion(animationDurarion - 1);
          }}
        >
          -
        </button>
        <input style={{ width: 35 }} type="text" value={animationDurarion} />
        <button
          type="button"
          onClick={() => {
            setAnimationDurarion(animationDurarion + 1);
          }}
        >
          +
        </button>
        <br />
        <br />
        <input
          type="checkbox"
          id="1"
          checked={isInfinite}
          onClick={() => {
            setInfinite(!isInfinite);
          }}
        />
        <label htmlFor="1">Infinite</label>
      </div>

    </>
  );
};

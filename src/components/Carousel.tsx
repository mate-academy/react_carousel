import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  listimage: string[]
  itemWidth: number,
  FrameSize: number,
  step: number,
  infinite: boolean,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  listimage, itemWidth, FrameSize, step, infinite, animationDuration,
}) => {
  const [countStep, setCountStep] = useState(0);
  const [copyListImages, setCopyListImages] = useState<string[]>([]);
  const [styleObject, setStyleObject] = useState(
    {
      width: FrameSize * itemWidth,
      translate: itemWidth * -2,
      transition: `all ${animationDuration / 1000}s ease`,
    },
  );

  useEffect(() => {
    if (infinite) {
      setCopyListImages([
        ...listimage.slice(listimage.length - step, listimage.length),
        ...listimage,
        ...listimage.slice(0, step),
      ]);
    } else {
      setCopyListImages(listimage);
    }
  }, [infinite]);

  useEffect(() => {
    setStyleObject({
      ...styleObject,
      width: FrameSize * itemWidth,
      translate: infinite ? itemWidth * -step : 0,
      transition: `all ${animationDuration / 1000}s ease`,
    });
    setCountStep(0);
  }, [itemWidth, FrameSize, step, infinite, animationDuration]);

  useEffect(() => {
    if (styleObject.translate > 0 && infinite) {
      setTimeout(() => {
        setStyleObject({
          ...styleObject,
          translate: (listimage.length - 1) * -itemWidth,
          transition: '',
        });
      }, 0);
    }

    if (styleObject.translate <= -(listimage.length * itemWidth) && infinite) {
      setTimeout(() => {
        setStyleObject({
          ...styleObject,
          translate: itemWidth * -1,
          transition: '',
        });
      }, 0);
    }

    if (
      (styleObject.translate !== 0
      && styleObject.transition === '')
      || (styleObject.translate !== -(listimage.length * itemWidth)
      && styleObject.transition === '')) {
      setTimeout(() => {
        setStyleObject({
          ...styleObject,
          transition: `all ${animationDuration / 1000}s ease`,
        });
      }, animationDuration / 10);
    }
  }, [styleObject, infinite, animationDuration]);

  const changeTranslate = (prev: boolean) => {
    if (infinite) {
      const infiniteSteps = prev
        ? styleObject.translate + (step * itemWidth)
        : styleObject.translate - (step * itemWidth);

      setStyleObject({
        ...styleObject,
        translate: infiniteSteps,
      });
    } else if (!infinite) {
      if (countStep && prev) {
        setStyleObject({
          ...styleObject,
          translate: styleObject.translate + (step * itemWidth),
        });
        setCountStep(countStep - 1);
      }

      if (countStep < Math.floor(copyListImages.length / step) && !prev) {
        setStyleObject({
          ...styleObject,
          translate: styleObject.translate - (step * itemWidth),
        });
        setCountStep(countStep + 1);
      }
    }
  };

  return (
    <div className="Carousel" style={{ width: `${styleObject.width}px` }}>
      <ul
        className="Carousel__list"
        style={{ translate: `${styleObject.translate}px`, transition: `${styleObject.transition}` }}
      >
        {copyListImages
          .map((el: string, index: number) => (
            <li key={`${index + 1}`}>
              <img src={el} alt={`${index}`} width={`${itemWidth}`} style={{ width: `${itemWidth}px` }} />
            </li>
          ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          changeTranslate(true);
        }}
        data-cy="prev"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          changeTranslate(false);
        }}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

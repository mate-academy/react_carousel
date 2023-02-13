import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  listimage: string[]
  itemWidth: number,
  frameSize: number,
  step: number,
  infinite: boolean,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  listimage, itemWidth, frameSize, step, infinite, animationDuration,
}) => {
  const [countStep, setCountStep] = useState<number>(0);
  const [copyListImages, setCopyListImages]
    = useState<string[]>([]);
  const [styleObject, setStyleObject] = useState(
    {
      width: frameSize * itemWidth,
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
    if (infinite) {
      setStyleObject({
        ...styleObject,
        width: frameSize * itemWidth,
        translate: itemWidth * -step,
        transition: `all ${animationDuration / 1000}s ease`,
      });
    } else {
      setStyleObject({
        ...styleObject,
        width: frameSize * itemWidth,
        translate: 0,
        transition: `all ${animationDuration / 1000}s ease`,
      });
    }

    setCountStep(0);
  }, [itemWidth, frameSize, step, infinite, animationDuration]);

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
              <img src={el} alt={`${index}`} style={{ width: `${itemWidth}px` }} />
            </li>
          ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          changeTranslate(true);
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          changeTranslate(false);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

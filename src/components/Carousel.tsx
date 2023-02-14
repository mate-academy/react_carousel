import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type StyleObject = {
  width: number,
  translate: number,
  transition: string
};

type Props = {
  listimage: string[]
  ItemWidth: number,
  FrameSize: number,
  step: number,
  infinite: boolean,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  listimage, ItemWidth, FrameSize, step, infinite, animationDuration,
}) => {
  const [countStep, setCountStep] = useState(0);
  const [copyListImages, setCopyListImages] = useState<string[]>([]);
  const [styleObject, setStyleObject] = useState(
    {
      width: FrameSize * ItemWidth,
      translate: ItemWidth * -2,
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
      width: FrameSize * ItemWidth,
      translate: infinite ? ItemWidth * -step : 0,
      transition: `all ${animationDuration / 1000}s ease`,
    });
    setCountStep(0);
  }, [ItemWidth, FrameSize, step, infinite, animationDuration]);

  useEffect(() => {
    if (styleObject.translate > 0 && infinite) {
      setTimeout(() => {
        setStyleObject((prev: StyleObject) => {
          return {
            ...prev,
            translate: (listimage.length - 1) * -ItemWidth,
            transition: '',
          };
        });
      }, 0);
    }

    if (styleObject.translate <= -(listimage.length * ItemWidth) && infinite) {
      setTimeout(() => {
        setStyleObject((prev: StyleObject) => {
          return {
            ...prev,
            translate: ItemWidth * -1,
            transition: '',
          };
        });
      }, 0);
    }

    if (
      (styleObject.translate !== 0
      && styleObject.transition === '')
      || (styleObject.translate !== -(listimage.length * ItemWidth)
      && styleObject.transition === '')) {
      setTimeout(() => {
        setStyleObject((prev:StyleObject) => {
          return {
            ...prev,
            transition: `all ${animationDuration / 1000}s ease`,
          };
        });
      }, animationDuration / 10);
    }
  }, [styleObject, infinite, animationDuration]);

  const changeTranslate = (back: boolean) => {
    if (infinite) {
      const infiniteSteps = back
        ? styleObject.translate + (step * ItemWidth)
        : styleObject.translate - (step * ItemWidth);

      setStyleObject((prev:StyleObject) => {
        return {
          ...prev,
          translate: infiniteSteps,
        };
      });
    } else if (!infinite) {
      if (countStep && back) {
        setStyleObject((prev:StyleObject) => {
          return {
            ...prev,
            translate: styleObject.translate + (step * ItemWidth),
          };
        });
        setCountStep(countStep - 1);
      }

      if (countStep < Math.floor(copyListImages.length / step) && !back) {
        setStyleObject((prev:StyleObject) => {
          return {
            ...prev,
            translate: styleObject.translate - (step * ItemWidth),
          };
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
              <img src={el} alt={`${index}`} width={`${ItemWidth}`} style={{ width: `${ItemWidth}px` }} />
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

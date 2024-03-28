import React, { CSSProperties, useEffect, useState } from 'react';
import './Carousel.scss';

interface ImageCollection {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<ImageCollection> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [previousWidth, setPreviousWidth] = useState<number>(itemWidth);

  const [styleList, setStyleList] = useState({
    transform: 0,
    transition: animationDuration / 1000,
  });

  const [disabledBtn, setDisabledBtn] = useState({
    nextBtn: false,
    prevBtn: true,
  });

  const returnClickability = () => {
    if (Object.values(disabledBtn).includes(true)) {
      setDisabledBtn(() => {
        return {
          nextBtn: false,
          prevBtn: false,
        };
      });
    }
  };

  const getOpacityStatus = (index: number): number => {
    const finalNum = styleList.transform;

    const actives = Math.abs(finalNum / itemWidth - frameSize);

    if (index < actives && actives - frameSize <= index) {
      return 1;
    }

    return 0;
  };

  const onNextBtn = (num: number) => {
    let finalNum = styleList.transform;

    const waste = images.length % frameSize;

    returnClickability();

    finalNum += num * step * itemWidth;

    const maxMove =
      (images.length - (frameSize + waste)) * itemWidth + waste * itemWidth;

    if (finalNum <= 0 && Math.abs(finalNum) >= maxMove) {
      finalNum = -1 * maxMove;

      setDisabledBtn(prev => {
        return {
          ...prev,
          nextBtn: true,
        };
      });
    }

    if (finalNum >= 0) {
      finalNum = 0;

      setDisabledBtn(prev => {
        return {
          ...prev,
          prevBtn: true,
        };
      });
    }

    setStyleList({
      ...styleList,
      transform: finalNum,
    });
  };

  useEffect(() => {
    if (previousWidth !== itemWidth) {
      const prev = previousWidth;
      const finalNum = styleList.transform;

      const s = finalNum / prev;

      setStyleList({
        ...styleList,
        transform: s * itemWidth,
      });
      setPreviousWidth(itemWidth);
    }
  }, [itemWidth]);

  useEffect(() => {
    if (infinite) {
      const finalNum = styleList.transform;

      const waste = images.length % frameSize;

      setTimeout(() => {
        if (
          Math.abs(finalNum) >=
          (images.length - (frameSize - waste)) * itemWidth - itemWidth
        ) {
          setStyleList(prev => {
            return {
              ...prev,
              transform: 0,
            };
          });
        } else {
          onNextBtn(-1);
        }
      }, 1000);
    }

    return;
  }, [styleList, infinite]);

  useEffect(() => {
    setStyleList({
      ...styleList,
      transition: animationDuration / 1000,
    });
  }, [animationDuration]);

  useEffect(() => {
    const s = styleList.transform;

    if (s < 0) {
      setStyleList({
        ...styleList,
        transform: s + itemWidth,
      });
    }
  }, [frameSize]);

  const providedUlStlyes: CSSProperties = {
    transform: `translateX(${styleList.transform}px)`,
    transition: `transform ${styleList.transition}s ease-in-out`,
  };

  return (
    <div
      className="Carousel"
      style={{
        maxWidth: `${itemWidth * frameSize}px`,
      }}
    >
      <ul className="Carousel__list" style={providedUlStlyes}>
        {images.map((img, index) => {
          return (
            <li key={img} className="Carousel__item">
              <img
                src={img}
                alt={index.toString()}
                className="Carousel__img"
                width={itemWidth}
                height={itemWidth}
                style={{
                  opacity: getOpacityStatus(index),
                }}
              />
            </li>
          );
        })}
      </ul>

      {!infinite && (
        <>
          <button
            disabled={disabledBtn.prevBtn}
            type="button"
            onClick={() => onNextBtn(1)}
          >
            Prev
          </button>

          <button
            disabled={disabledBtn.nextBtn}
            type="button"
            onClick={() => onNextBtn(-1)}
            data-cy="next"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;

import React, { useEffect, useState } from 'react';
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
    transform: 'translateX(0)',
    transition: `transform ${animationDuration / 1000}s ease-in-out`,
  });

  const [disabledBtn, setDisabledBtn] = useState({
    nextBtn: false,
    prevBtn: true,
  });

  const getCurrentTransform = (): number => {
    const styleStr: string = styleList.transform;

    const border: number = styleStr.indexOf('(');

    const transformProp = styleStr.slice(border + 1, -1);

    let finalNum = 0;

    if (transformProp.endsWith('px')) {
      finalNum = parseInt(transformProp.slice(0, -2));
    } else {
      finalNum = parseInt(transformProp);
    }

    return finalNum;
  };

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
    const finalNum = getCurrentTransform();

    const actives = Math.abs(finalNum / itemWidth - frameSize);

    if (index < actives && actives - frameSize <= index) {
      return 1;
    }

    return 0;
  };

  const onNextBtn = (num: number) => {
    let finalNum = getCurrentTransform();

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
      transform: `translateX(${finalNum}px)`,
    });
  };

  useEffect(() => {
    if (previousWidth !== itemWidth) {
      const prev = previousWidth;
      const finalNum = getCurrentTransform();

      const s = finalNum / prev;

      setStyleList({
        ...styleList,
        transform: `translateX(${s * itemWidth}px)`,
      });
      setPreviousWidth(itemWidth);
    }
  }, [itemWidth]);

  useEffect(() => {
    if (infinite) {
      const finalNum = getCurrentTransform();

      const waste = images.length % frameSize;

      setTimeout(() => {
        if (
          Math.abs(finalNum) >=
          (images.length - (frameSize - waste)) * itemWidth - itemWidth
        ) {
          setStyleList(prev => {
            return {
              ...prev,
              transform: 'translateX(0)',
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
      transition: `transform ${animationDuration / 1000}s ease-in-out`,
    });
  }, [animationDuration]);

  useEffect(() => {
    const s = getCurrentTransform();

    if (s < 0) {
      setStyleList({
        ...styleList,
        transform: `translateX(${s + itemWidth}px)`,
      });
    }
  }, [frameSize]);

  return (
    <div
      className="Carousel"
      style={{
        maxWidth: `${itemWidth * frameSize}px`,
      }}
    >
      <ul className="Carousel__list" style={styleList}>
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

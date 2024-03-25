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
  const [styleList, setStyleList] = useState({
    transform: 'translateX(0)',
    transition: `transform ${animationDuration / 1000}s ease-in-out`,
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

  const onNextBtn = (num: number) => {
    const styleStr: string = styleList.transform;

    const border: number = styleStr.indexOf('(');

    const transformProp = styleStr.slice(border + 1, -1);

    let finalNum = 0;

    if (transformProp.endsWith('px')) {
      finalNum = parseInt(transformProp.slice(0, -2));
    } else {
      finalNum = parseInt(transformProp);
    }

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
    if (infinite) {
      setInterval(() => {
        if (
          styleList.transform.includes(
            (-itemWidth * images.length + itemWidth * frameSize).toString(),
          )
        ) {
          setStyleList({
            ...styleList,
            transform: 'translateX(0)',
          });
        }

        onNextBtn(-1);
      }, 1000);
    }
  }, [styleList]);

  useEffect(() => {
    setStyleList({
      ...styleList,
      transition: `transform ${animationDuration / 1000}s ease-in-out`,
    });
  }, [animationDuration]);

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
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
                style={{
                  minWidth: itemWidth,
                  minHeight: itemWidth,
                }}
              />
            </li>
          );
        })}
      </ul>

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
        data-cy="Next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

import React, { useEffect, useRef, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

enum Buttons {
  next = 'next',
  prev = 'prev',
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [preparedImgs, setPreparedImgs] = useState(images);
  const [currentImg, setCurrentImg] = useState(0);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
  const [isAnimationRun, setIsAnimationRun] = useState(false);

  if (currentImg > 9) {
    setCurrentImg(prevImgIndex => prevImgIndex - 9 - 1);
  }

  if (currentImg < 0) {
    setCurrentImg(prevImgIndex => prevImgIndex + 9 + 1);
  }

  const carouselBlock = useRef<HTMLUListElement | null>(null);
  const nextBtn = useRef<HTMLButtonElement | null>(null);
  const prevBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!infinite && currentImg === 0) {
      setIsPrevBtnDisabled(true);
    }

    if (!infinite && currentImg === 9) {
      setIsNextBtnDisabled(true);
    }

    if (infinite && !isAnimationRun) {
      setIsNextBtnDisabled(false);
      setIsPrevBtnDisabled(false);
    }
  }, [currentImg, infinite, isAnimationRun]);

  function buttonClickHandlerInfinite(btn: Buttons) {
    if (btn === Buttons.prev) {
      setPreparedImgs(prevImgs => {
        return [...prevImgs.slice(-1), ...prevImgs.slice(0, -1)];
      });

      carouselBlock.current?.scroll(itemWidth, 0);
    }

    if (nextBtn.current && prevBtn.current) {
      setIsNextBtnDisabled(true);
      setIsPrevBtnDisabled(true);
    }

    setTimeout(() => {
      if (nextBtn.current && prevBtn.current) {
        setIsNextBtnDisabled(false);
        setIsPrevBtnDisabled(false);
      }
    }, animationDuration);

    const framesCount = Math.floor(60 * (animationDuration / 1000));
    const scrollPerFrame = Math.floor((step * itemWidth) / framesCount);
    let currentDist = 0;
    let picturesBehind = 0;
    const interval = animationDuration / framesCount;

    const timerId = window.setInterval(() => {
      setIsAnimationRun(true);

      if (btn === Buttons.next) {
        carouselBlock.current?.scrollBy(scrollPerFrame, 0);
      } else {
        carouselBlock.current?.scrollBy(-scrollPerFrame, 0);
      }

      currentDist += scrollPerFrame;

      if (currentDist >= itemWidth) {
        currentDist = 0;
        picturesBehind += 1;

        if (btn === Buttons.next) {
          setCurrentImg(prevImgIndex => {
            if (!infinite && prevImgIndex === 8) {
              window.clearInterval(timerId);
              setIsAnimationRun(false);
              setIsNextBtnDisabled(true);
            }

            return prevImgIndex + 1;
          });

          setPreparedImgs(prevImgs => {
            return [...prevImgs.slice(1), ...prevImgs.slice(0, 1)];
          });

          carouselBlock.current?.scroll(0, 0);
        } else {
          setCurrentImg(prevImgIndex => prevImgIndex - 1);

          setPreparedImgs(prevImgs => {
            return [...prevImgs.slice(-1), ...prevImgs.slice(0, -1)];
          });

          carouselBlock.current?.scroll(itemWidth, 0);
        }
      }

      if (picturesBehind === step) {
        window.clearInterval(timerId);
        setIsAnimationRun(false);

        if (btn === Buttons.prev) {
          setPreparedImgs(prevImgs => {
            return [...prevImgs.slice(1), ...prevImgs.slice(0, 1)];
          });

          carouselBlock.current?.scroll(0, 0);
        }
      }
    }, interval);
  }

  function buttonClickHandlerDefault(btn: Buttons) {
    setPreparedImgs(images);
    carouselBlock.current?.scroll(currentImg * itemWidth, 0);

    if (nextBtn.current && prevBtn.current) {
      setIsNextBtnDisabled(true);
      setIsPrevBtnDisabled(true);
    }

    setTimeout(() => {
      if (nextBtn.current && prevBtn.current) {
        setIsNextBtnDisabled(false);
        setIsPrevBtnDisabled(false);
      }
    }, animationDuration);

    const framesCount = Math.floor(60 * (animationDuration / 1000));
    const scrollPerFrame = Math.floor((step * itemWidth) / framesCount);
    let currentDist = 0;
    let picturesBehind = 0;
    const interval = animationDuration / framesCount;

    const timerId = window.setInterval(() => {
      setIsAnimationRun(true);

      if (btn === Buttons.next) {
        carouselBlock.current?.scrollBy(scrollPerFrame, 0);
      } else {
        carouselBlock.current?.scrollBy(-scrollPerFrame, 0);
      }

      currentDist += scrollPerFrame;

      if (currentDist >= itemWidth) {
        currentDist = 0;
        picturesBehind += 1;

        if (btn === Buttons.next) {
          setCurrentImg(prevImgIndex => {
            if (prevImgIndex + step + 1 >= 9) {
              window.clearInterval(timerId);
              setIsAnimationRun(false);
              setIsNextBtnDisabled(true);

              return prevImgIndex;
            }

            carouselBlock.current?.scroll((prevImgIndex + 1) * itemWidth, 0);

            return prevImgIndex + 1;
          });
        } else {
          setCurrentImg(prevImgIndex => {
            if (prevImgIndex - 1 < 0) {
              window.clearInterval(timerId);
              setIsAnimationRun(false);
              setIsPrevBtnDisabled(true);

              return prevImgIndex;
            }

            carouselBlock.current?.scroll((prevImgIndex - 1) * itemWidth, 0);

            return prevImgIndex - 1;
          });
        }
      }

      if (picturesBehind === step) {
        window.clearInterval(timerId);
        setIsAnimationRun(false);
      }
    }, interval);
  }

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        ref={carouselBlock}
        style={{ maxWidth: `${frameSize * itemWidth}px` }}
      >

        {preparedImgs.map((imageSrc, index) => (
          <li key={imageSrc}>
            <img
              src={imageSrc}
              alt={index.toString()}
              style={{ width: itemWidth }}
            />
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button
          type="button"
          onClick={() => (infinite
            ? buttonClickHandlerInfinite(Buttons.prev)
            : buttonClickHandlerDefault(Buttons.prev))}
          disabled={isPrevBtnDisabled}
          ref={prevBtn}
        >
          <i className="fas fa-angle-double-left" />
        </button>

        <button
          type="button"
          onClick={() => (infinite
            ? buttonClickHandlerInfinite(Buttons.next)
            : buttonClickHandlerDefault(Buttons.next))}
          ref={nextBtn}
          disabled={isNextBtnDisabled}
        >
          <i className="fas fa-angle-double-right" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

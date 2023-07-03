import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { CarouselOptions } from '../../types/CarouselOptions';
import { CarouselStyles } from '../../types/CarouselStyles';
import { ButtonsEnum } from '../../enums/ButtonsEnum';
import { CarouselList } from '../CarouselList';
import './Carousel.scss';

type Props = {
  images: string[];
  carouselOptions: CarouselOptions;
};

export const Carousel: FC<Props> = ({ images, carouselOptions }) => {
  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
  } = carouselOptions;

  const startPosition = 0;

  const [translateX, setTranslateX] = useState<number>(0);
  const [currPosition, setCurrPosition] = useState<number>(0);
  const [endPosition, setEndPosition] = useState<number>(
    images.length - frameSize,
  );

  const setButtonClassNames = (buttonType: ButtonsEnum) => {
    const forwardBtnIsDisabeld = buttonType === ButtonsEnum.Forward
      && currPosition === endPosition;
    const backBtnIsDisabeld = buttonType === ButtonsEnum.Back
      && currPosition === startPosition;

    return classNames('Carousel-Button', {
      'Carousel-Button_Forward': buttonType === ButtonsEnum.Forward,
      'Carousel-Button_Back': buttonType === ButtonsEnum.Back,
      'Carousel-Button_Disabled': (forwardBtnIsDisabeld || backBtnIsDisabeld),
    });
  };

  useEffect(() => {
    setEndPosition(images.length - frameSize);
  }, [frameSize]);

  useEffect(() => {
    setTranslateX(prevTranslate => {
      if ((currPosition * itemWidth) > prevTranslate) {
        return -currPosition * itemWidth;
      }

      return currPosition * itemWidth;
    });
  }, [currPosition]);

  const handlePrevSlide = () => {
    setCurrPosition(prevPosition => {
      if (prevPosition - step < startPosition) {
        return startPosition;
      }

      return prevPosition - step;
    });
  };

  const handleNextSlide = () => {
    setCurrPosition(prevPosition => {
      if (prevPosition + step > endPosition) {
        return endPosition;
      }

      return prevPosition + step;
    });
  };

  const styles: CarouselStyles = {
    listStyles: {
      width: `${itemWidth * frameSize}px`,
      transform: `translateX(${translateX}px)`,
      transition: `transform ${animationDuration}ms ease`,
    },

    imgStyles: {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
    },
  };

  return (
    <div className="App-Carousel Carousel">
      <div className="Carousel-Container">
        <CarouselList
          slides={images}
          styles={styles}
        />

        <div className="Carousel-Buttons">
          <button
            onClick={handlePrevSlide}
            className={setButtonClassNames(ButtonsEnum.Back)}
            type="button"
          >
            <Icon>
              {ButtonsEnum.Back}
            </Icon>
          </button>

          <button
            onClick={handleNextSlide}
            className={setButtonClassNames(ButtonsEnum.Forward)}
            type="button"
            data-cy="next"
          >
            <Icon>
              {ButtonsEnum.Forward}
            </Icon>
          </button>
        </div>
      </div>
    </div>
  );
};

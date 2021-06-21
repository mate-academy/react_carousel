/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { useArrowDarkButtonStyles }
  from '@mui-treasury/styles/button/arrowDark';
import PropTypes from 'prop-types';
import './Carousel.scss';

const Carousel = ({
  images, step, frameSize, itemWidth,
  animationDuration, infinite, startLeftPoint, startTranslateX,
}) => {
  const [translateX, setTranslateX] = useState(startTranslateX);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const [currentLeftPoint, setCurrentLeftPoint] = useState(startLeftPoint);
  const [renderedArray, setRenderedArray] = useState(images);
  const fullSize = useMemo(() => (step * 2 + frameSize), [step, frameSize]);
  const [noAnimation, setNoAnimation] = useState(false);
  const maxRightSlade = useMemo(() => (
    images.length * itemWidth - frameSize * itemWidth), [itemWidth, frameSize]);
  const slideByStep = useMemo(() => (
    translateX + step * itemWidth),
  [itemWidth, translateX, step]);

  useEffect(() => {
    setTranslateX(startTranslateX);
    setRenderedArray(infinite ? generateArr(startLeftPoint) : images);
    setIsRightButtonDisabled(false);
    setIsLeftButtonDisabled(!infinite);
    setNoAnimation(false);
  }, [infinite, startTranslateX, itemWidth, frameSize]);

  const generateArr = useCallback((leftPoint) => {
    if (!infinite) {
      return images;
    }

    const startIndex = (leftPoint > images.length || leftPoint < 0)
      ? Math.abs(Math.abs(leftPoint) - images.length)
      : leftPoint;
    const infinityArr = [];

    let count = startIndex;

    for (let i = 0; i < fullSize; i++) {
      count = (count > images.length - 1)
        ? 0
        : count;
      infinityArr.push(images[count]);
      count++;
    }

    setCurrentLeftPoint(startIndex);

    return infinityArr;
  }, [currentLeftPoint, fullSize, infinite]);

  const onSlide = (name) => {
    switch (name) {
      case 'rightButton':
        setCurrentLeftPoint(prev => (infinite ? prev + step : prev));
        setTranslateX(prev => (infinite || slideByStep < maxRightSlade
          ? prev + step * itemWidth
          : maxRightSlade));
        setIsLeftButtonDisabled(infinite);
        setIsRightButtonDisabled(slideByStep >= maxRightSlade || infinite);
        if (infinite) {
          setNoAnimation(false);
          setTimeout(() => {
            setNoAnimation(true);
            setTranslateX(step * itemWidth);
            setRenderedArray(generateArr(currentLeftPoint + step));
            setIsLeftButtonDisabled(false);
            setIsRightButtonDisabled(false);
          }, 1000);
        }

        break;
      case 'leftButton':
        setCurrentLeftPoint(prev => (infinite ? prev - step : prev));
        setTranslateX(prev => (infinite || translateX > itemWidth * step
          ? prev - step * itemWidth
          : 0));
        setIsLeftButtonDisabled(infinite || translateX <= itemWidth * step);
        setIsRightButtonDisabled(infinite);
        if (infinite) {
          setNoAnimation(false);
          setTimeout(() => {
            setNoAnimation(true);
            setTranslateX(step * itemWidth);
            setRenderedArray(generateArr(currentLeftPoint - step));
            setIsLeftButtonDisabled(false);
            setIsRightButtonDisabled(false);
          }, 1000);
        }

        break;
      default:
        break;
    }
  };

  const styleFocus = (!noAnimation)
    ? {
      transform: `translateX(-${translateX}px)`,
      transition: `${animationDuration}ms`,
    }
    : {
      transform: `translateX(-${translateX}px)`,
    };

  const focusWith = useMemo(() => (
    itemWidth * frameSize), [itemWidth, frameSize]);

  const classes = useArrowDarkButtonStyles();

  return (
    <div
      className="Carousel"
      style={{ width: `${itemWidth * (frameSize + 1)}px` }}
    >
      <div
        style={{
          width: `${focusWith}px`,
          height: `${itemWidth}px`,
        }}
        className="focus"
      >
        <ul
          style={styleFocus}
          className="Carousel__list"
        >
          {renderedArray.map((image, index) => (
            <li key={index}>
              <img
                src={image}
                alt={index + 1}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}

        </ul>
      </div>
      <div
        className="buttons"
        style={{ width: `${(frameSize + 1) * itemWidth}px` }}
      >
        <Button
          classes={classes}
          name="leftButton"
          disabled={isLeftButtonDisabled}
          onClick={() => onSlide('leftButton')}
        >
          <KeyboardArrowLeft />
        </Button>
        <Button
          classes={classes}
          name="rightButton"
          disabled={isRightButtonDisabled}
          onClick={() => onSlide('rightButton')}
        >
          <KeyboardArrowRight />
        </Button>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  startTranslateX: PropTypes.bool.isRequired,
  startLeftPoint: PropTypes.bool.isRequired,
};

export default Carousel;

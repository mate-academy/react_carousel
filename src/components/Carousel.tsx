import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}: Props) => {
  const [items, setItems] = useState(images);
  const [nextDisable, setNextDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(false);
  const [transitionAnimation, setTransitionAnimation] = useState(true);

  const [moveAmount, setMoveAmount] = useState(0);

  useEffect(() => {
    setItems(images);
    setMoveAmount(0);
    setNextDisable(false);
    setPrevDisable(!infinite);
    setTransitionAnimation(true);
  }, [images, infinite, step, frameSize]);

  const getNext = () => {
    if (infinite) {
      const newMoveAmount = itemWidth * step;

      setMoveAmount(newMoveAmount);
      setTimeout(() => {
        setItems([...items.slice(step), ...items.slice(0, step)]);
        setTransitionAnimation(false);
        setMoveAmount(0);
      }, animationDuration);

      setTransitionAnimation(true);
    } else {
      setPrevDisable(false);

      const fullMoveAmount = items.length * itemWidth;
      const visibleMoveAmount = frameSize * itemWidth;
      const stepMoveAmount = step * itemWidth;

      const newMoveAmount = moveAmount + stepMoveAmount;

      const overflowSteps = newMoveAmount + stepMoveAmount > fullMoveAmount;
      const overflowVisible =
        newMoveAmount + visibleMoveAmount > fullMoveAmount;

      if (overflowVisible) {
        setMoveAmount(
          moveAmount - visibleMoveAmount + (fullMoveAmount - moveAmount),
        );
        setNextDisable(true);
      } else if (overflowSteps) {
        setMoveAmount(
          moveAmount - stepMoveAmount + (fullMoveAmount - moveAmount),
        );
        setNextDisable(true);
      } else {
        setMoveAmount(newMoveAmount);
      }
    }
  };

  const goPrev = () => {
    if (infinite) {
      setTransitionAnimation(false);
      setMoveAmount(itemWidth * step);
      setItems([...items.slice(-step), ...items.slice(0, -step)]);

      setTimeout(() => {
        setTransitionAnimation(true);
        setMoveAmount(0);
      })
    } else {
      setNextDisable(false);

      const stepMoveAmount = itemWidth * step;
      const newMoveAmount = moveAmount - stepMoveAmount;

      if (newMoveAmount + stepMoveAmount - stepMoveAmount < 0) {
        setMoveAmount(0);
        setPrevDisable(true);
      } else {
        setMoveAmount(newMoveAmount);
      }
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__list">
        <button
          onClick={() => {
            goPrev();
          }}
          className={`prev ${prevDisable ? 'disabled' : ''}`}
          type="button"
        ></button>
        <ul
          className="Carousel__wrapper"
          style={{
            width: `${frameSize * itemWidth}px`,
            overflow: 'hidden',
          }}
        >
          {items.map((img, i) => {
            return (
              <li key={img}>
                <img
                  width={itemWidth}
                  style={{
                    transform: `translate(-${moveAmount}px)`,
                    transition: transitionAnimation
                      ? `transform ${animationDuration / 1000}s linear`
                      : 'none',
                  }}
                  src={img}
                  alt={'Image ' + (i + 1)}
                  className="Carousel__img"
                />
              </li>
            );
          })}
        </ul>
        <button
          data-cy="next"
          onClick={() => {
            getNext();
          }}
          className={`next ${nextDisable ? 'disabled' : ''}`}
          type="button"
        ></button>
      </div>
    </div>
  );
};

export default Carousel;

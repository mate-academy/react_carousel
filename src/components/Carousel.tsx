import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [checked, setChecked] = useState(infinite);
  const [stepChange, setStepChange] = useState(step);
  const [frame, setFrame] = useState(frameSize);
  const [transition, setTransition] = useState(animationDuration);
  const [width, setWidth] = useState(itemWidth);

  const [stepPerClick, setStepPerClick] = useState(() => {
    if (checked) {
      return stepChange;
    }

    return 0;
  });

  const [imagesState, setImagesState] = useState(() => {
    if (checked) {
      return [
        ...images,
        ...images,
        ...images,
      ];
    }

    return images;
  });

  const changeFrame = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrame(+event.target.value);
  };

  const changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepChange(+event.target.value);

    if (checked) {
      setImagesState([
        ...images,
        ...images,
        ...images,
      ]);
      setStepPerClick(images.length);
    }
  };

  const handleCheckBox = () => {
    setChecked(prev => !prev);
    setTransition(0);
    setStepPerClick(0);

    setImagesState([
      ...images,
    ]);

    if (!checked) {
      setStepPerClick(images.length);
      setImagesState([
        ...images,
        ...images,
        ...images,
      ]);
    }

    setTimeout(() => setTransition(transition), 10);
  };

  const handleTurnRight = () => {
    if (!checked) {
      if (stepPerClick < (images.length - 1) - stepChange) {
        setStepPerClick(prev => prev + stepChange);
      }

      if (stepPerClick + stepChange >= images.length - frame) {
        setStepPerClick(images.length - frame);
      }
    }

    if (checked) {
      setStepPerClick(images.length + stepChange);

      setTimeout(() => {
        setImagesState([
          ...imagesState.slice(-(images.length - stepChange)),
          ...imagesState.slice(0, -(images.length - stepChange)),
        ]);

        setTransition(0);
        setStepPerClick(images.length);

        setTimeout(() => setTransition(transition), 10);
      }, transition);
    }
  };

  const handleTurnLeft = () => {
    if (stepPerClick - stepChange < 0) {
      setStepPerClick(0);
    }

    if (stepPerClick - stepChange >= 0) {
      setStepPerClick(prev => prev - stepChange);
    }

    if (checked) {
      setTimeout(() => {
        setImagesState([
          ...imagesState.slice(images.length - stepChange),
          ...imagesState.slice(0, images.length - stepChange),
        ]);

        setStepPerClick(images.length);
        setTransition(0);

        setTimeout(() => setTransition(transition), 10);
      }, transition);
    }
  };

  const handleAnimation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransition(+event.target.value);
  };

  const handleWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(+event.target.value);
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${frame * width}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${width * frame}px`,
          }}
        >
          {
            imagesState.map((image, i) => (
              <li
                key={image}
                style={{
                  transform: `translateX(${stepPerClick * (-100)}%)`,
                  transitionDuration: `${transition}ms`,
                }}
              >
                <img
                  src={image}
                  alt={`${i}`}
                  key={image}
                  style={{
                    width: `${width}px`,
                  }}
                />
              </li>
            ))
          }
        </ul>
      </div>

      <div className="Carousel__button-wrapper">
        <button
          type="button"
          aria-label="left"
          className={cn(
            'Carousel__button',
            'Carousel__button--left',
            {
              'Carousel__button--blocked': stepPerClick === 0,
            },
          )}
          onClick={handleTurnLeft}
        />
        <button
          type="button"
          aria-label="right"
          data-cy="next"
          className={cn(
            'Carousel__button',
            'Carousel__button--right',
            {
              'Carousel__button--blocked': !checked
              && stepPerClick >= images.length - stepChange,
            },
          )}
          onClick={handleTurnRight}
        />
      </div>
      <div className="Carousel__settings">
        <div className="Carousel__settings-wrapper">
          <label htmlFor="frameSize">Images count</label>
          <div className="Carousel__settings-info">
            <input
              type="range"
              id="frameSize"
              defaultValue={frameSize}
              min="1"
              max={checked ? images.length : images.length - stepPerClick}
              step="1"
              onChange={changeFrame}
            />
            <div className="Carousel__settings-range">
              {
                Array.from({ length: images.length }, (_, i) => i + 1)
                  .filter(elem => {
                    if (checked) {
                      return elem;
                    }

                    return elem <= images.length - stepPerClick;
                  })
                  .map(elem => (
                    <a href={`${elem}`} key={elem}>{elem}</a>
                  ))
              }
            </div>
          </div>
        </div>

        <div className="Carousel__settings-wrapper">
          <label htmlFor="width">Size</label>
          <input
            type="number"
            id="width"
            step={10}
            defaultValue={130}
            max={400}
            onChange={handleWidth}
          />
        </div>

        <div className="Carousel__settings-wrapper">
          <label htmlFor="size">Step</label>
          <div className="Carousel__settings-info">
            <input
              type="range"
              id="size"
              defaultValue={stepChange}
              min="1"
              max="10"
              step="1"
              onChange={changeStep}
            />
            <div className="Carousel__settings-range">
              {
                Array.from({ length: images.length }, (_, i) => i + 1)
                  .map(elem => (
                    <a href={`${elem}`} key={elem}>{elem}</a>
                  ))
              }
            </div>
          </div>
        </div>

        <div className="Carousel__settings-wrapper">
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            step={100}
            defaultValue={animationDuration}
            onChange={handleAnimation}
          />
        </div>

        <div className="Carousel__settings-wrapper">
          <label htmlFor="infinite">Infinite</label>
          <div className="Carousel__settings-left">
            <input
              type="checkbox"
              id="infinite"
              checked={checked}
              onChange={handleCheckBox}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

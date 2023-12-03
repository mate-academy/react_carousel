import { useState, useEffect } from 'react';
import './Menu.scss';

type Props = {
  itemWidth: number,
  setItemWidth: (itemWidth: number) => void,
  frameSize: number,
  setFrameSize: (frameSize: number) => void
  step: number,
  setStep: (step: number) => void,
  animationDuration: number,
  setAnimationDuration: (animationDuration: number) => void,
};

export const Menu: React.FC<Props> = ({
  itemWidth,
  setItemWidth,
  frameSize,
  setFrameSize,
  step,
  setStep,
  animationDuration,
  setAnimationDuration,
}) => {
  const [isWidth, setIsWidth] = useState(itemWidth);
  const [isFremSize, setIsFremSize] = useState(frameSize);
  const [isStep, setIsStep] = useState(step);
  const [isAnimation, setIsAnimation] = useState(animationDuration);

  useEffect(() => {
    const menuContainer = document.querySelector(
      '.menu__list',
    ) as HTMLElement | null;

    if (menuContainer) {
      menuContainer.style.width = `${itemWidth * frameSize}px`;
    }
  }, [itemWidth, frameSize]);

  return (
    <fieldset
      className="menu"
    >
      <legend>Menu</legend>
      <ul className="menu__list">
        <li className="menu__item">
          <label className="menu__label">
            Current item size:
            {' '}
            <input
              className="menu__input"
              type="text"
              title="Item width"
              value={isWidth}
              onChange={(e) => setIsWidth(+e.target.value)}
            />
          </label>

          <button
            className="menu__button"
            type="button"
            onClick={() => setItemWidth(isWidth)}
          >
            Set width
          </button>
        </li>

        <li className="menu__item">
          <label className="menu__label">
            Current frem size:
            {' '}
            <input
              className="menu__input"
              type="text"
              title="Frem size"
              value={isFremSize}
              onChange={(e) => setIsFremSize(+e.target.value)}
            />
          </label>
          <button
            className="menu__button"
            type="button"
            onClick={() => setFrameSize(isFremSize)}
          >
            Set size
          </button>
        </li>

        <li className="menu__item">
          <label className="menu__label">
            Current step:
            {' '}
            <input
              className="menu__input"
              type="text"
              title="Step"
              value={isStep}
              onChange={(e) => setIsStep(+e.target.value)}
            />
          </label>
          <button
            className="menu__button"
            type="button"
            onClick={() => setStep(isStep)}
          >
            Set step
          </button>
        </li>

        <li className="menu__item">
          <label className="menu__label">
            Current animation time:
            {' '}
            <input
              className="menu__input"
              type="text"
              title="Animation time"
              value={isAnimation}
              onChange={(e) => setIsAnimation(+e.target.value)}
            />
          </label>
          <button
            className="menu__button"
            type="button"
            onClick={() => setAnimationDuration(isAnimation)}
          >
            Set animation time
          </button>
        </li>
      </ul>
    </fieldset>
  );
};

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.scss';
import { Setting } from './setting/Setting';
import { SettingInfinite } from './setting/SettingInfinite';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  animationDuration: number;
  itemWidth: number;
  infinite: boolean;
  changeSettingsStep: (newStep: number) => void;
  changeSettingsFrame: (newFrame: number) => void;
  changeSettingsWidth: (newWidth: number) => void;
  changeSettingsAnimationDuration: (newDuration: number) => void;
  changeSettingsInfinite: () => void;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  animationDuration,
  itemWidth,
  infinite,
  changeSettingsStep,
  changeSettingsFrame,
  changeSettingsWidth,
  changeSettingsAnimationDuration,
  changeSettingsInfinite,
}) => {
  const maxScroll = itemWidth * (10 - frameSize);
  const [scroll, setScroll] = useState(0);
  const [nextScroll, setNextScroll] = useState(scroll < maxScroll);
  const [prevScroll, setPrevScroll] = useState(scroll === maxScroll);

  const handleStepScroll = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeSettingsStep(Number(event.target.value));
  };

  const handleFrameOfSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeSettingsFrame(Number(event.target.value));
    setScroll(0);
  };

  const handleWidthOfItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeSettingsWidth(Number(event.target.value));
  };

  const handleAnimationDuration = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    changeSettingsAnimationDuration(Number(event.target.value));
  };

  const handleChangeNext = () => {
    const stepOfScroll = scroll + itemWidth * step;

    if (scroll < maxScroll) {
      setScroll(stepOfScroll > maxScroll ? maxScroll : stepOfScroll);
    }
  };

  const handleChangePrev = () => {
    const minScroll = 0;
    const stepOfScroll = scroll - itemWidth * step;

    if (scroll > minScroll) {
      setScroll(stepOfScroll < minScroll ? minScroll : stepOfScroll);
    }
  };

  const isInfinite = () => {
    if (infinite) {
      const moveNext = () => {
        setTimeout(handleChangeNext, animationDuration);
      };

      const movePrev = () => {
        setTimeout(handleChangePrev, animationDuration);
      };

      if (nextScroll) {
        moveNext();
        setNextScroll(scroll !== maxScroll);
        setPrevScroll(scroll === maxScroll);
      }

      if (prevScroll) {
        movePrev();
        setPrevScroll(scroll !== 0);
        setNextScroll(scroll === 0);
      }
    }
  };

  useEffect(() => {
    isInfinite();
  }, [infinite, scroll, prevScroll, nextScroll]);

  return (
    <>
      <div
        className="
        Carousel
        rounded
        shadow
        border
        border-white-black
        bg-white"
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          {images.map((el, index) => {
            return (
              <li
                key={el}
                style={{
                  transform: `translateX(${-scroll}px)`,
                  transition: `transform ${animationDuration}ms`,
                }}
              >
                <img
                  src={el}
                  alt={`${index + 1}`}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button btn btn-outline-secondary"
            onClick={handleChangePrev}
            disabled={scroll === 0}
          >
            Prev
          </button>
          <button
            type="button"
            className="Carousel__button btn btn-outline-secondary"
            onClick={handleChangeNext}
            disabled={scroll === maxScroll}
          >
            Next
          </button>
        </div>
      </div>

      <div
        className="
          Carousel__settings
          rounded
          d-flex
          flex-column
          mx-auto
          shadow
          border
          border-white-black
          bg-white
          p-4"
        style={{
          width: '200px',
        }}
      >
        <h1
          className="pb-4 Carousel__settings--title"
          style={{
            fontSize: '35px',
          }}
        >
          Settings
        </h1>
        <Setting
          title="Step of scroll"
          type="number"
          id="scrollId"
          min={1}
          step="1"
          defaultValue={3}
          handleChange={handleStepScroll}
        />
        <Setting
          title="Frame of size"
          type="number"
          id="frameSizeId"
          min={1}
          step="1"
          defaultValue={3}
          handleChange={handleFrameOfSize}
        />
        <Setting
          title="Item Width"
          type="number"
          id="itemWidthId"
          min={130}
          step="10"
          defaultValue={130}
          handleChange={handleWidthOfItem}
        />
        <Setting
          title="Animation Duration"
          type="number"
          id="animationDurationId"
          min={0}
          step="100"
          defaultValue={1000}
          handleChange={handleAnimationDuration}
        />
        <SettingInfinite
          title="Infinite mode"
          type="checkbox"
          id="infiniteId"
          handleChange={changeSettingsInfinite}
        />
      </div>
    </>
  );
};

export default Carousel;

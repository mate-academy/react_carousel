import { CarouselProps } from '../../Carousel';
import './CarouselSettings.scss';

export const CarouselSettings: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  onChangeSettings,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSettings(event);
  };

  return (
    <div className="Carousel-settings">
      <p className="Carousel-settings__title">Carousel Settings</p>
      <div className="Carousel-settings__content">
        <p className="Carousel-settings__text">
          Images length - {images.length}
        </p>
        <label className="Carousel-settings__label">
          Step - {step}
          <input
            onChange={event => handleChange(event)}
            name="step"
            value={step}
            min={0}
            placeholder="Step"
            className="Carousel-settings__input"
            type="number"
          />
        </label>
        <label className="Carousel-settings__label">
          frameSize - {frameSize}
          <input
            onChange={event => handleChange(event)}
            name="frameSize"
            value={frameSize}
            placeholder="Size"
            min={0}
            className="Carousel-settings__input"
            type="number"
          />
        </label>
        <label className="Carousel-settings__label">
          itemWidth - {itemWidth}
          <input
            name="itemWidth"
            onChange={event => handleChange(event)}
            value={itemWidth}
            placeholder="Width"
            min={0}
            className="Carousel-settings__input"
            type="number"
          />
        </label>
        <label className="Carousel-settings__label">
          animationDuration - {animationDuration}
          <input
            onChange={event => handleChange(event)}
            value={animationDuration}
            name="animationDuration"
            placeholder="Animation"
            min={0}
            className="Carousel-settings__input"
            type="number"
          />
        </label>
      </div>
    </div>
  );
};

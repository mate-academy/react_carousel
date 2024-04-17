import { CarouselProps } from '../../Carousel';
import './CarouselSettings.scss';

export const CarouselSettings: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  return (
    <div className="Carousel-settings">
      <p className="Carousel-settings__title">Carousel Settings</p>
      <div className="Carousel-settings__content">
        <p className="Carousel-settings__text">
          Images length - {images.length}
        </p>
        <p className="Carousel-settings__text">Step - {step}</p>
        <p className="Carousel-settings__text">frameSize - {frameSize}</p>
        <p className="Carousel-settings__text">itemWidth - {itemWidth}</p>
        <p className="Carousel-settings__text">
          animationDuration - {animationDuration}
        </p>
      </div>
    </div>
  );
};

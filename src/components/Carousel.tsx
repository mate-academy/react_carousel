import {
  FC,
  useEffect,
  useState,
} from 'react';
import './Carousel.scss';
import { Button } from './Button';
import { Input } from './Input';
import { CarouselList } from './Carousel-list';

interface Props {
  images: string[];
}
const Carousel: FC<Props> = ({ images }) => {
  const [carouselStep, setCarouselStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [transformImage, setTransformImage] = useState(0);
  const [imageSize, setImageSize] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [lastImage, setLastImage] = useState(frameSize);
  const [disabledPrevButton, setDisabledPrevButton] = useState(false);
  const [disabledNextButton, setDisabledNextButton] = useState(false);
  const imagesCount = images.length;

  useEffect(() => {
    setLastImage(frameSize);
    setDisabledPrevButton(true);
  }, [frameSize, imageSize]);

  useEffect(() => {
    setLastImage(frameSize);
    setTransformImage(0);
    setDisabledPrevButton(true);
    setDisabledNextButton(false);
  }, [carouselStep, animationDuration, imageSize, frameSize]);

  const handlePrevButton = () => {
    const prevLastImage = lastImage - carouselStep;

    if (prevLastImage >= frameSize) {
      setTransformImage(transformImage + imageSize * carouselStep);
      setLastImage(prevLastImage);
      setDisabledNextButton(false);
    }

    if (prevLastImage < frameSize) {
      const restImages = lastImage - frameSize;

      setTransformImage(transformImage + imageSize * restImages);
      setLastImage(frameSize);
      setDisabledPrevButton(true);
    }

    if (prevLastImage === frameSize) {
      setDisabledPrevButton(true);
    }
  };

  const handleNextButton = () => {
    const nextLastImage = lastImage + carouselStep;

    if (nextLastImage <= imagesCount) {
      setTransformImage(transformImage + -(imageSize * carouselStep));
      setLastImage(nextLastImage);
      setDisabledPrevButton(false);
    }

    if (nextLastImage >= imagesCount) {
      const restOfImage = imagesCount - lastImage;

      setTransformImage(transformImage + -(imageSize * restOfImage));
      setLastImage(10);
      setDisabledNextButton(true);
    }
  };

  const handleWidth = (width: number) => {
    setImageSize(width);
  };

  const handleFrameSize = (size: number) => {
    setFrameSize(size);
  };

  const handleStep = (step: number) => {
    setCarouselStep(step);
  };

  const handleAnimationDuration = (duration: number) => {
    setAnimationDuration(duration);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={{ width: `${frameSize * imageSize}px` }}>
        <CarouselList
          images={images}
          transformImage={transformImage}
          frameSize={frameSize}
          animationDuration={animationDuration}
          imageSize={imageSize}
        />
      </div>
      <div className="Carousel__buttons">
        <Button
          type="Prev"
          data="prev"
          handleButton={handlePrevButton}
          isDisabled={disabledPrevButton}
        />
        <Button
          type="Next"
          data="next"
          handleButton={handleNextButton}
          isDisabled={disabledNextButton}
        />
      </div>
      <div className="Carousel__control">
        <div className="Carousel__labels">
          <label className="Carousel__input" htmlFor="itemId">
            Width
          </label>
          <label className="Carousel__input" htmlFor="frameId">
            Frame size
          </label>
          <label className="Carousel__input" htmlFor="stepId">
            Step
          </label>
          <label className="Carousel__input" htmlFor="AnimationDuration">
            Animation duration
          </label>
        </div>
        <div className="Carousel__inputs">
          <Input
            name="width"
            id="itemId"
            min={50}
            step={10}
            max={260}
            value={imageSize}
            onChange={handleWidth}
          />
          <Input
            name="frame-size"
            id="frameId"
            min={1}
            step={1}
            max={5}
            value={frameSize}
            onChange={handleFrameSize}
          />
          <Input
            name="step"
            id="stepId"
            value={carouselStep}
            min={1}
            max={5}
            step={1}
            onChange={handleStep}
          />
          <Input
            name="animation-duration"
            id="AnimationDuration"
            min={100}
            max={3000}
            step={100}
            value={animationDuration}
            onChange={handleAnimationDuration}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;

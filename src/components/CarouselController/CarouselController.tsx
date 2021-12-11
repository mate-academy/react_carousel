import './CarouselController.scss';

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  imagesCount: number;
  visibleFrames: number;
  step: number;
  imageWidth: number;
  transitionSpeed: number;
  changeVisibleFrames: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeStep: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeImageWidth: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeTransitionSpeed: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CarouselController: React.FC<Props> = ({
  imagesCount,
  visibleFrames,
  step,
  imageWidth,
  transitionSpeed,
  changeVisibleFrames,
  changeStep,
  changeImageWidth,
  changeTransitionSpeed,
}) => {
  return (
    <form className="CarouselController">
      <div className="CarouselController__controller-wrapper">
        <label htmlFor="visibleFrames">Visible Frames:</label>
        <input
          type="number"
          value={visibleFrames}
          id="visibleFrames"
          min="1"
          max={imagesCount}
          className="CarouselController__controller CarouselController__controller--number"
          onKeyDown={(event) => event.preventDefault()}
          onChange={changeVisibleFrames}
        />
      </div>

      <div className="CarouselController__controller-wrapper">
        <label htmlFor="step">Step:</label>
        <input
          type="number"
          value={step}
          id="step"
          min="1"
          max={imagesCount}
          className="CarouselController__controller CarouselController__controller--number"
          onKeyDown={(event) => event.preventDefault()}
          onChange={changeStep}
        />
      </div>

      <div className="CarouselController__controller-wrapper">
        <label htmlFor="step">Frame Width:</label>
        <input
          type="range"
          value={imageWidth}
          id="imageWidth"
          min="50"
          max="150"
          className="CarouselController__controller"
          onChange={changeImageWidth}
        />
      </div>

      <div className="CarouselController__controller-wrapper">
        <label htmlFor="step">Transition Speed:</label>
        <input
          type="range"
          value={transitionSpeed}
          id="transitionSpeed"
          min="0"
          max="3000"
          className="CarouselController__controller"
          onChange={changeTransitionSpeed}
        />
      </div>
    </form>
  );
};

export { CarouselController };

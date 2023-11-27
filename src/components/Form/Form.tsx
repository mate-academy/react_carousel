import './Form.scss';

type FormProps = {
  images: string[];
  inputWidth: number;
  setInputWidth: (inputWidth: number) => void;
  frameSize: number;
  setFrameSize: (frameSize: number) => void;
  step: number;
  setStep: (step: number) => void;
  animationD: number;
  setAnimationD: (animationD: number) => void;
  infinite: boolean;
  setInfinite: (infinite: boolean) => void;
};

export const Form: React.FC<FormProps> = ({
  images,
  inputWidth,
  setInputWidth,
  frameSize,
  setFrameSize,
  step,
  setStep,
  animationD,
  setAnimationD,
  infinite,
  setInfinite,
}) => {
  return (
    <div className="form">
      <div className="form__item">
        <label htmlFor="itemId">Item Width:</label>
        <input
          id="itemId"
          type="number"
          value={inputWidth}
          step={10}
          min={10}
          onChange={(e) => setInputWidth(Number(e.target.value))}
          className="form__input"
        />
      </div>

      <div className="form__item">
        <label htmlFor="frameId">Frame Size:</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          step={1}
          min={1}
          max={images.length}
          onChange={(e) => setFrameSize(Number(e.target.value))}
          className="form__input"
        />
      </div>

      <div className="form__item">
        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          type="number"
          value={step}
          step={1}
          min={1}
          max={images.length}
          onChange={(e) => setStep(Number(e.target.value))}
          className="form__input"
        />
      </div>

      <div className="form__item">
        <label htmlFor="duration">Animation Duration:</label>
        <input
          id="duration"
          type="number"
          value={animationD}
          step={100}
          min={100}
          onChange={(e) => setAnimationD(Number(e.target.value))}
          className="form__input"
        />
      </div>

      <div className="form__item">
        <label htmlFor="infinite">Infinite:</label>
        <input
          id="infinite"
          type="checkbox"
          checked={infinite}
          onChange={(e) => setInfinite(e.target.checked)}
          className="form__input"
        />
      </div>
    </div>
  );
};

import './Inputs.scss';
import { HandleClick } from '../utils';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setFrameSize: React.Dispatch<React.SetStateAction<number>>;
  setItemWidth: React.Dispatch<React.SetStateAction<number>>;
  setAnimationDuration: React.Dispatch<React.SetStateAction<number>>;
  infinite: boolean;
  setInfinite: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Inputs: React.FC<Props> = ({
  setStep,
  setFrameSize,
  setItemWidth,
  setAnimationDuration,
  infinite,
  setInfinite,
}) => {
  return (
    <div className="Inputs">
      <>
        <label className="input-container">
          <p className="input-text">The width of item:</p>
          <input
            type="number"
            name="itemWidth"
            id="itemWidth"
            min="100"
            max="1000"
            defaultValue={130}
            onChange={HandleClick(setItemWidth)}
          />
        </label>

        <label className="input-container">
          <p className="input-text">
            Number of images displayed at the same time:
          </p>
          <input
            type="number"
            name="frameSize"
            id="frameSize"
            min="1"
            max="10"
            defaultValue={3}
            onChange={HandleClick(setFrameSize)}
          />
        </label>

        <label className="input-container">
          <p className="input-text">Number of images scrolled per click:</p>
          <input
            type="number"
            name="step"
            id="step"
            min="1"
            max="10"
            defaultValue={3}
            onChange={HandleClick(setStep)}
          />
        </label>

        <label className="input-container">
          <p className="input-text">Animation duration in ms:</p>
          <input
            type="number"
            name="animationDuration"
            id=""
            defaultValue={1000}
            min="0"
            max="9000"
            step="100"
            onChange={HandleClick(setAnimationDuration)}
          />
        </label>

        <label className="input-container">
          <input
            type="checkBox"
            name="finite"
            id="finite"
            onChange={() => {
              setInfinite(!infinite);
            }}
          />
          <p className="input-text">Is the animation infinite</p>
        </label>
      </>
    </div>
  );
};

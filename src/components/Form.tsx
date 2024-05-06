import './Form.scss';
import { DefaultInputs } from '../App';
import 'bulma';

type Props = {
  stepSize: (step: number) => void;
  frameSize: (size: number) => void;
  imageSize: (width: number) => void;
  animationDuration: (width: number) => void;
  infinite: (result: boolean) => void;
  params: DefaultInputs;
};

const Form: React.FC<Props> = ({
  stepSize,
  frameSize,
  imageSize,
  animationDuration,
  infinite,
  params,
}) => {
  return (
    <>
      <div className="Form">
        <label htmlFor="stepId" className="Form__label">
          {'Step size: '}
          <input
            value={params.stepSize}
            id="stepId"
            className="Form__input"
            type="number"
            min={1}
            max={5}
            placeholder="step size"
            onChange={e => stepSize(+e.target.value)}
          />
        </label>

        <label htmlFor="frameId" className="Form__label">
          {'Frame size: '}
          <input
            value={params.frameSize}
            id="frameId"
            className="Form__input"
            type="number"
            min={3}
            max={10}
            placeholder="frame size"
            onChange={e => frameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="itemId" className="Form__label">
          {'Image size: '}
          <input
            value={params.itemWidth}
            id="itemId"
            className="Form__input"
            type="number"
            min={50}
            max={500}
            step={10}
            placeholder="image size"
            onChange={e => imageSize(+e.target.value)}
          />
        </label>

        <label htmlFor="fnimationDuration" className="Form__label">
          {'Animation duration: '}
          <input
            value={params.animationDuration}
            id="fnimationDuration"
            className="Form__input"
            type="number"
            min={0}
            max={5000}
            step={500}
            placeholder="animation duration"
            onChange={e => animationDuration(+e.target.value)}
          />
        </label>

        <label htmlFor="animation" className="Form__label">
          {'Infinite: '}
          <input
            id="animation"
            className="Form__input"
            type="checkbox"
            placeholder="animation duration"
            onChange={e => infinite(e.target.checked)}
          />
        </label>
      </div>
    </>
  );
};

export default Form;

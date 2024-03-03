import { DefaultImgValues } from '../../types/DefaultImgValues';
import './Form.scss';

type Props = {
  imgValues: DefaultImgValues
  setImgValues: React.Dispatch<React.SetStateAction<DefaultImgValues>>
};

export const Form: React.FC<Props> = ({
  imgValues,
  setImgValues,
}) => {
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = imgValues;

  return (
    <form action="/my-handling-form-page" method="get">
      <ul>
        <li>
          <label
            className="label"
            htmlFor="step"
          >
            Step:
          </label>
          <input
            className="input is-primary"
            type="number"
            value={step}
            id="step"
            min="1"
            max="10"
            onChange={event => setImgValues({
              ...imgValues, step: +event.target.value,
            })}
          />
        </li>
        <li>
          <label
            className="label"
            htmlFor="frameSize"
          >
            frameSize:
          </label>
          <input
            className="input is-primary"
            type="number"
            value={frameSize}
            id="frameSize"
            min="1"
            max="10"
            onChange={event => setImgValues({
              ...imgValues, frameSize: +event.target.value,
            })}
          />
        </li>
        <li>
          <label
            className="label"
            htmlFor="itemWidth"
          >
            itemWidth:
          </label>
          <input
            className="input is-primary"
            type="number"
            value={itemWidth}
            id="itemWidth"
            min="130"
            max="260"
            step="5"
            onChange={event => setImgValues({
              ...imgValues, itemWidth: +event.target.value,
            })}
          />
        </li>
        <li>
          <label
            className="label"
            htmlFor="animationDuration"
          >
            animationDuration:
          </label>
          <input
            className="input is-primary"
            type="number"
            value={animationDuration}
            id="animationDuration"
            min="0"
            max="5000"
            step="50"
            onChange={event => setImgValues({
              ...imgValues, animationDuration: +event.target.value,
            })}
          />
        </li>
        <li>
          <label
            className="label"
            htmlFor="infinite"
          >
            infinite:
          </label>
          <input
            type="checkbox"
            checked={infinite}
            id="infinite"
            onChange={event => setImgValues({
              ...imgValues, infinite: event.target.checked,
            })}
          />
        </li>
      </ul>
    </form>
  );
};

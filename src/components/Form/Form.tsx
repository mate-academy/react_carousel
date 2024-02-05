import './Form.scss';
import { ImgValuesType } from '../../types/ImgValuesType';

type Props = {
  imgValues: ImgValuesType,
  setImgValues: React.Dispatch<React.SetStateAction<ImgValuesType>>,
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
            htmlFor="step"
            className="label"
          >
            Step:
          </label>

          <input
            type="number"
            id="step"
            className="input is-link"
            value={step}
            min="1"
            max="10"
            onChange={event => setImgValues({
              ...imgValues, step: +event.target.value,
            })}
          />
        </li>

        <li>
          <label
            htmlFor="frameSize"
            className="label"
          >
            Frame Size:
          </label>

          <input
            type="number"
            id="frameSize"
            className="input is-link"
            value={frameSize}
            min="1"
            max="10"
            onChange={event => setImgValues({
              ...imgValues, frameSize: +event.target.value,
            })}
          />
        </li>

        <li>
          <label
            htmlFor="itemWidth"
            className="label"
          >
            Picture Width:
          </label>

          <input
            type="number"
            id="itemWidth"
            className="input is-link"
            value={itemWidth}
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
            htmlFor="animationDuration"
            className="label"
          >
            Animation Duration:
          </label>

          <input
            type="number"
            id="animationDuration"
            className="input is-link"
            value={animationDuration}
            min="0"
            max="5000"
            step="50"
            onChange={event => setImgValues({
              ...imgValues, animationDuration: +event.target.value,
            })}
          />
        </li>

        <li className="infinite-box">
          <label
            htmlFor="infinite"
            className="label"
          >
            Infinity scroll
          </label>

          <input
            type="checkbox"
            name="infinite"
            id="infinite"
            checked={infinite}
            onChange={event => setImgValues({
              ...imgValues, infinite: event.target.checked,
            })}
          />
        </li>
      </ul>
    </form>
  );
};

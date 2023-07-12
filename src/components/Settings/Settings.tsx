import './Settings.scss';

type Props = {
  images: string[],
  itemWidth: number,
  itemWithChange: React.Dispatch<React.SetStateAction<number>>,
  frameSize: number,
  frameSizeChange: React.Dispatch<React.SetStateAction<number>>,
  step: number,
  stepChange: React.Dispatch<React.SetStateAction<number>>,
  duration: number,
  durationChange: React.Dispatch<React.SetStateAction<number>>,
};

const Settings: React.FC<Props> = ({
  images,
  itemWidth,
  itemWithChange,
  frameSize,
  frameSizeChange,
  step,
  stepChange,
  duration,
  durationChange,
}) => {
  return (
    <div className="Settings">
      <h2>Settings</h2>

      <div className="Settings__container">
        <div className="Setting__block">
          <label htmlFor="itemId">
            {`Item width: ${itemWidth}px`}
          </label>
          <input
            id="itemId"
            type="number"
            className="Setting__input"
            value={itemWidth}
            min={50}
            step={100}
            onChange={event => itemWithChange(+event.target.value)}
          />
        </div>

        <div className="Setting__block">
          <label htmlFor="frameId">
            {`Image quantity: ${frameSize}`}
          </label>
          <input
            id="frameId"
            type="number"
            className="Setting__input"
            value={frameSize}
            min={1}
            max={images.length}
            onChange={event => frameSizeChange(+event.target.value)}
          />
        </div>

        <div className="Setting__block">
          <label htmlFor="stepId">
            {`Step: ${step}`}
          </label>
          <input
            id="stepId"
            type="number"
            className="Setting__input"
            value={step}
            min={1}
            max={images.length}
            onChange={event => stepChange(+event.target.value)}
          />
        </div>

        <div className="Setting__block">
          <label htmlFor="durationId">
            {`Animation-duration: ${duration}ms`}
          </label>
          <input
            id="durationId"
            type="number"
            className="Setting__input"
            value={duration}
            min={100}
            max={5000}
            step={100}
            onChange={event => durationChange(+event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;

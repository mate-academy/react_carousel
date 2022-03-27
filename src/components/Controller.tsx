export const Controller: React.FC<Props> = ({
  changeDuration,
  changeFrameSize,
  changeItemWidth,
  changeStep,

}) => {
  return (
    <div className="controller">
      <label htmlFor="width">
        Set width
        <input
          id="width"
          type="range"
          defaultValue={140}
          min={50}
          max={250}
          step={10}
          onChange={(event) => {
            changeItemWidth(+event.target.value);
          }}
        />
      </label>
      <label htmlFor="frameSize">
        Set frameSize
        <input
          id="frameSize"
          type="range"
          defaultValue={3}
          min={1}
          max={10}
          step={1}
          onChange={(event) => {
            changeFrameSize(+event.target.value);
          }}
        />
      </label>
      <label htmlFor="step">
        Set step
        <input
          id="step"
          type="range"
          defaultValue={3}
          min={1}
          max={10}
          step={1}
          onChange={(event) => {
            changeStep(+event.target.value);
          }}
        />
      </label>
      <label htmlFor="animationDuration">
        Set Animation Duration
        <input
          id="animationDuration"
          type="range"
          defaultValue={1000}
          min={100}
          max={5000}
          step={100}
          onChange={(event) => {
            changeDuration(+event.target.value);
          }}
        />
      </label>
    </div>
  );
};

interface Props {
  changeItemWidth: (value:number) => void,
  changeFrameSize: (value:number) => void,
  changeDuration: (value:number) => void,
  changeStep: (value:number) => void,
}

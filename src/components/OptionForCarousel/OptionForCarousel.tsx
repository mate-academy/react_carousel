type Props = {
  setPrev: (prop: number) => void;
  setStep: (prop: number) => void;
  frameSize: number;
  setFrameSize: (prop: number) => void;
  setItemWidth: (prop: number) => void;
  setAnimationDuration: (prop: number) => void;
};

export function OptionForCarousel({
  setPrev,
  setStep,
  frameSize,
  setFrameSize,
  setItemWidth,
  setAnimationDuration,
}: Props) {
  const optionsFrame = [1, 2, 3, 4, 5];
  const optionsStep = [1, 2, 3];

  const handleOnChangeStep = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStep(+event.target.value);
    setPrev(1);
  };

  const handleOnChangeFrame = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrameSize(+event.target.value);
    setPrev(1);
  };

  const handleOnChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemWidth(+event.target.value);
  };

  const handleOnChangeDuration = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAnimationDuration(+event.target.value);
  };

  return (
    <section className="Handle-carousel">
      Step{' '}
      <select onChange={handleOnChangeStep} name="number" id="numberSelect">
        {optionsStep.map(option => (
          <option key={option} value={`${option}`}>
            {option}
          </option>
        ))}
      </select>
      Frame Size
      <select
        onChange={handleOnChangeFrame}
        defaultValue={frameSize}
        name="number"
        id="numberSelect"
      >
        {optionsFrame.map(option => (
          <option key={option} value={`${option}`}>
            {option}
          </option>
        ))}
      </select>
      Item Width
      <input
        onInput={handleOnChangeWidth}
        type="number"
        defaultValue={130}
        max={500}
        min={50}
        step={1}
        style={{ width: '50px' }}
      />
      Duration
      <input
        onInput={handleOnChangeDuration}
        type="number"
        defaultValue={1000}
        max={5000}
        min={100}
        step={1}
        style={{ width: '50px' }}
      />
    </section>
  );
}

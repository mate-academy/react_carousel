import { useState } from 'react';
import { Data } from '../../types/Data';

type Props = {
  onSubmit: React.Dispatch<React.SetStateAction<Data>>;
};

export const CarouselForm: React.FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<Data>({
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    duration: 1000,
  });

  const inputValidation
  = (data.frameSize <= 10 && data.itemWidth <= 350 && data.step <= 10)
  && (data.frameSize > 0 && data.itemWidth >= 1 && data.step >= 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({ ...prevData, [name]: +value }));

    if (inputValidation) {
      onSubmit((prevData) => ({ ...prevData, [name]: +value }));
    }
  };

  return (
    <form
      action=""
      className="Carousel__form"
    >

      <label htmlFor="frameId">
        Frame size
        <input
          type="number"
          min="1"
          max="10"
          id="frameId"
          name="frameSize"
          value={data.frameSize}
          className="input is-primary"
          placeholder="frameSize"
          onChange={handleChange}
        />
      </label>

      <label htmlFor="itemId">
        Item width
        <input
          type="number"
          min="1"
          max="300"
          id="itemId"
          name="itemWidth"
          value={data.itemWidth}
          className="input is-primary"
          placeholder="itemWidth"
          onChange={handleChange}
        />
      </label>

      <label htmlFor="stepId">
        Step
        <input
          type="number"
          min="1"
          max="10"
          id="stepId"
          name="step"
          value={data.step}
          className="input is-primary"
          placeholder="Step"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="durationId">
        Duration
        <input
          id="durationId"
          value={data.duration}
          className="input is-primary"
          type="text"
          placeholder="animationDuration"
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

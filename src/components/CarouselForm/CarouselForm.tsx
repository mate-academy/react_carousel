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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({ ...prevData, [name]: +value }));
    onSubmit((prevData) => ({ ...prevData, [name]: +value }));
  };

  return (
    <form
      action=""
      className="Carousel__form"
    >

      <label htmlFor="frameId">
        <input
          id="frameId"
          name="frameSize"
          value={data.frameSize}
          className="input is-primary"
          placeholder="frameSize"
          type="number"
          onChange={handleChange}
        />
      </label>

      <label htmlFor="itemId">
        <input
          id="itemId"
          name="itemWidth"
          value={data.itemWidth}
          className="input is-primary"
          placeholder="itemWidth"
          type="number"
          onChange={handleChange}
        />
      </label>

      <label htmlFor="stepId">
        <input
          id="stepId"
          name="step"
          value={data.step}
          className="input is-primary"
          placeholder="Step"
          type="number"
          onChange={handleChange}
        />
      </label>
      {/* <input
        value={}
        className="input is-primary"
        type="text"
        placeholder="animationDuration"
        // onChange={(event) => setDuration(+event.target.value)}
      /> */}

      <button type="submit">Submit</button>
    </form>
  );
};

import { useState } from 'react';
import { Data } from '../../types/Data';

type Props = {
  onSubmit: (data: Data) => void
};

export const CarouselForm: React.FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<Data>({
    frameSize: 2,
    itemWidth: 130,
    step: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = () => {
    onSubmit(data);
  };

  return (
    <form
      action=""
      className="Carousel__form"
      onSubmit={handleFormSubmit}
    >

      <input
        value={data?.frameSize}
        className="input is-primary"
        placeholder="frameSize"
        type="number"
        onChange={handleChange}
      />

      <input
        value={data?.itemWidth}
        className="input is-primary"
        placeholder="itemWidth"
        type="number"
        onChange={handleChange}
      />

      <input
        value={data?.step}
        className="input is-primary"
        placeholder="Step"
        type="number"
        onChange={handleChange}
      />

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

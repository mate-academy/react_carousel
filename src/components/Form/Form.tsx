import { ChangeEvent, FormEvent, useState } from 'react';
import './Form.scss';
import { FormData } from '../../types';

interface FormProps {
  onSubmit: (data: FormData) => void;
}

export const Form = ({ onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: +value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <label htmlFor="itemId">
        Customize image width:
      </label>
      <input
        className="form__input"
        type="number"
        name="itemWidth"
        id="itemId"
        value={formData.itemWidth}
        onChange={handleChange}
        placeholder="Image width"
      />
      <label htmlFor="frameId">
        Number of images:
      </label>
      <input
        className="form__input"
        name="frameSize"
        id="frameId"
        value={formData.frameSize}
        onChange={handleChange}
        placeholder="Frame size"
        type="number"
      />
      <label htmlFor="stepId">
        Step images scrolled per click:
      </label>
      <input
        className="form__input"
        type="number"
        name="step"
        id="stepId"
        value={formData.step}
        onChange={handleChange}
        placeholder="Step"
      />
      <label htmlFor="animationId">
        Animation duration:
      </label>
      <input
        className="form__input"
        type="number"
        name="animationDuration"
        id="animationId"
        value={formData.animationDuration}
        onChange={handleChange}
        placeholder="Animation duration"
      />
      <button className="form__button" type="submit">Submit</button>
    </form>
  );
};

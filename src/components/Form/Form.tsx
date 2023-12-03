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
      <label className="form__label">
        Customize image width:
        <input
          className="form__input"
          type="number"
          name="itemWidth"
          value={formData.itemWidth}
          onChange={handleChange}
          placeholder="Image width"
        />
      </label>
      <label className="form__label">
        Number of images:
        <input
          className="form__input"
          name="frameSize"
          value={formData.frameSize}
          onChange={handleChange}
          placeholder="Frame size"
          type="number"
        />
      </label>
      <label className="form__label">
        Step images scrolled per click:
        <input
          className="form__input"
          type="number"
          name="step"
          value={formData.step}
          onChange={handleChange}
          placeholder="Step"
        />
      </label>
      <label className="form__label">
        Animation duration:
        <input
          className="form__input"
          type="number"
          name="animationDuration"
          value={formData.animationDuration}
          onChange={handleChange}
          placeholder="Animation duration"
        />
      </label>
      <button className="form__button" type="submit">Submit</button>
    </form>
  );
};

import './Input.scss';
import { Field } from '../types/Field'

export const Input: React.FC<Field> = ({
  text,
  name,
  type,
  label,
  value,
  onInputChange,
  min,
  max,
}) => {

  return (
    <label htmlFor={label || name} className="label">
    {text}:
    <input
      className='input'
      id={label || name}
      type={type}
      name={name}
      value={value}
      onChange={(e)=>onInputChange(e)}
      min={min}
      max={max}
    />
  </label>
  )
};

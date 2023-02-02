import { PureComponent } from 'react';
import { Field } from '../Field';
import { CarouselProps } from '../../types/CarouselProps';
import { FormHandlers } from '../../types/FormHandlers';

import './Form.scss';

export class Form extends PureComponent<
FormHandlers & Omit<CarouselProps, 'defaultNextRest'>, {}> {
  render() {
    const {
      step,
      infinite,
      itemWidth,
      frameSize,
      animationDuration,

      handleChangeStep,
      handleChangeInfinite,
      handleChangeItemWidth,
      handleChangeFrameSize,
      handleChangeAnimationDuration,
    } = this.props;

    return (
      <form className="Form">
        <Field
          min="80"
          max="300"
          type="number"
          name="Item width"
          value={itemWidth}
          onChange={handleChangeItemWidth}
          className="Form__field"
        />
        <Field
          min="1"
          max="10"
          name="Frame size"
          type="number"
          onChange={handleChangeFrameSize}
          className="Form__field"
          value={frameSize}
        />
        <Field
          min="1"
          max="10"
          name="Step"
          type="number"
          onChange={handleChangeStep}
          className="Form__field"
          value={step}
        />
        <Field
          min="100"
          max="2000"
          name="Animation duration"
          type="number"
          onChange={handleChangeAnimationDuration}
          className="Form__field"
          value={animationDuration}
        />
        <Field
          name="Infinite"
          type="checkbox"
          onChange={handleChangeInfinite}
          className="Form__field"
          checked={infinite}
        />
      </form>
    );
  }
}

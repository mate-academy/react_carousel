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
          name="Item width"
          type="number"
          onChange={handleChangeItemWidth}
          className="Form__field"
          value={itemWidth}
        />
        <Field
          name="Frame size"
          type="number"
          onChange={handleChangeFrameSize}
          className="Form__field"
          value={frameSize}
        />
        <Field
          name="Step"
          type="number"
          onChange={handleChangeStep}
          className="Form__field"
          value={step}
        />
        <Field
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

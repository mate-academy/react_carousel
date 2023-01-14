import { PureComponent } from 'react';
import { Field } from '../Field';
import { CarouselProps } from '../../types/CarouselProps';
import { FormHandlers } from '../../types/FormHandlers';

import './Form.scss';

export class Form extends PureComponent<FormHandlers & CarouselProps, {}> {
  render() {
    const {
      step,
      infinite,
      itemWidth,
      frameSize,
      animationDuration,

      onChangeStep,
      onChangeInfinite,
      onChangeItemWidth,
      onChangeFrameSize,
      onChangeAnimationDuration,
    } = this.props;

    return (
      <form className="Form">
        <Field
          name="Item width"
          type="number"
          onChange={onChangeItemWidth}
          className="Form__field"
          value={itemWidth}
        />
        <Field
          name="Frame size"
          type="number"
          onChange={onChangeFrameSize}
          className="Form__field"
          value={frameSize}
        />
        <Field
          name="Step"
          type="number"
          onChange={onChangeStep}
          className="Form__field"
          value={step}
        />
        <Field
          name="Animation duration"
          type="number"
          onChange={onChangeAnimationDuration}
          className="Form__field"
          value={animationDuration}
        />
        <Field
          name="Infinite"
          type="checkbox"
          onChange={onChangeInfinite}
          className="Form__field"
          checked={infinite}
        />
      </form>
    );
  }
}

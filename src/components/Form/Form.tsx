import React from 'react';
import './Form.scss';

type Props = {
  updateInputValues: (value: number, name: string) => void,
  updateCheckboxValue: (isChecked: boolean) => void,
};

export const Form: React.FC<Props> = (props) => {
  const { updateInputValues, updateCheckboxValue } = props;
  const formSettings = [
    ['step', 'Step', '1', '3'],
    ['frameSize', 'Frame Size', '2', '3'],
    ['itemWidth', 'Item Width', '3', '130'],
    ['animationDuration', 'Animation Duration', '4', '1000'],
  ];

  return (
    <form className="Form">
      {
        formSettings.map((setting) => {
          const id = setting[0];
          const labelText = setting[1];
          const key = setting[2];
          const defaultValue = setting[3];

          return (
            <div
              className="Form__content"
              key={key}
            >
              <label
                htmlFor={id}
                className="Form__label"
              >
                {labelText}
              </label>
              <input
                className="Form__input"
                type="number"
                name={id}
                id={id}
                defaultValue={defaultValue}
                onChange={(event) => {
                  updateInputValues(
                    Number(event.currentTarget.value),
                    event.currentTarget.name,
                  );
                }}
              />
            </div>
          );
        })
      }

      <div className="Form__content">
        <label
          htmlFor="infinite"
          className="Form__label"
        >
          Infinite:
        </label>
        <input
          className="Form__checkbox"
          id="infinite"
          name="infinite"
          type="checkbox"
          onChange={(event) => {
            updateCheckboxValue(event.currentTarget.checked);
          }}
        />
      </div>

    </form>
  );
};

import React from 'react';
import './Direction.scss';

type Props = {
  changeMoveLeft: () => void;
  changeMoveRight: () => void;
  prevDisabled: boolean,
  nextDisabled: boolean,
};

export const Direction: React.FC<Props> = ({
  changeMoveLeft,
  changeMoveRight,
  prevDisabled,
  nextDisabled,
}) => {
  return (
    <div className="change-direction">
      <button
        type="button"
        onClick={changeMoveLeft}
        disabled={prevDisabled}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        disabled={nextDisabled}
        onClick={changeMoveRight}
      >
        Next
      </button>
    </div>
  );
};

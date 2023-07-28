/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import './Draft.scss';

const colors = [
  '#98EECC',
  '#D0F5BE',
  '#FBFFDC',
  '#A4907C',
  '#DAFFFB',
  '#64CCC5',
  '#176B87',
  '#001C30',
  '#F5F3C1',
  '#27E1C1',
];

function reorderIndexesByStep(arr: string [], step = 1, backwards = false) {
  if (step <= 0) {
    console.error('Step should be a positive non-zero number.');

    return arr;
  }

  const reorderedArr = [];

  for (let i = 0; i < arr.length; i++) {
    const newIndex = backwards
      ? (i - step + arr.length) % arr.length
      : (i + step) % arr.length;

    reorderedArr[newIndex] = arr[i];
  }

  return reorderedArr;
}

export const Draft: React.FC = () => {
  const [arr, setArr] = useState<string[]>(colors);

  const handlePrev = () => {
    const newArr = reorderIndexesByStep(arr, 1, true);

    setArr(newArr);
  };

  const handleNext = () => {
    const newArr = reorderIndexesByStep(arr, 1);

    setArr(newArr);
  };

  return (
    <div className="draft">
      <div className="draft__boxes">
        {arr.map((color, index) => (
          <div
            className="draft__box"
            style={{ backgroundColor: `${color}` }}
          >
            {index}
          </div>
        ))}
      </div>

      <div className="draft__buttons">
        <button
          type="button"
          onClick={handlePrev}
        >
          prev
        </button>
        <button
          type="button"
          onClick={handleNext}
        >
          next
        </button>
      </div>
    </div>
  );
};

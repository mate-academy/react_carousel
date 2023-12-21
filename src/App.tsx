import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const images: string[] = [
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
  './img/8.png',
  './img/9.png',
  './img/10.png',
];

interface DefaultOptions {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
}

const defaultOptions: DefaultOptions = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinity: false,
};

const App: React.FC = () => {
  const [options, setOptions] = useState<DefaultOptions>(defaultOptions);
  const [selectInput, setSelectInput] = useState(
    Object.keys(options)[0] || null,
  );

  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
    infinity,
  } = options;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    switch (type) {
      case 'number':
        setOptions((prevProp) => ({
          ...prevProp,
          [name]: +value,
        }));
        break;

      case 'checkbox':
        setOptions((prevProp) => ({
          ...prevProp,
          [name]: checked,
        }));
        break;

      default:
        break;
    }
  }

  function handleSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    setSelectInput(value);
  }

  function convertToTitleCase(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .replace(/^./, (l) => l.toUpperCase());
  }

  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

      {selectInput && (
        <div className="options">
          <select
            name="input"
            value={selectInput}
            onChange={handleSelectionChange}
          >
            {Object.keys(options).map((key) => (
              <option key={key} value={key}>
                {convertToTitleCase(key)}
              </option>
            ))}
          </select>

          {Object.entries(options).map(([option, value]) => {
            const typeValue = typeof value;

            if (option !== selectInput) {
              return false;
            }

            switch (typeValue) {
              case 'number':
                return (
                  <React.Fragment key={option}>
                    <h3>{`${convertToTitleCase(option)}:`}</h3>
                    <input
                      type="number"
                      name={`${option}`}
                      value={value}
                      min="0"
                      onChange={handleInputChange}
                    />
                  </React.Fragment>
                );

              case 'boolean':
                return (
                  <React.Fragment key={option}>
                    <h3>{`${convertToTitleCase(option)}:`}</h3>
                    <input
                      type="checkbox"
                      name={`${option}`}
                      checked={value}
                      onChange={handleInputChange}
                    />
                  </React.Fragment>
                );

              default:
                return false;
            }
          })}
        </div>
      )}

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinity={infinity}
      />
    </div>
  );
};

export default App;

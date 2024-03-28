import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

interface FormStyle {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
}

const App: React.FC = () => {
  const [data] = useState<State>({
    images: [
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
    ],
  });

  const [form, setForm] = useState<FormStyle>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 300,
    infinity: false,
  });

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {data.images.length} images</h1>

      <div className="form-inputs">
        <div className="form-input">
          <label htmlFor="stepId">Step</label>

          <input
            type="number"
            name="stepId"
            id="stepId"
            value={form.step}
            onChange={e =>
              setForm({
                ...form,
                step: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="form-input">
          <label htmlFor="frameId">Frame Size</label>

          <input
            type="number"
            name="frameId"
            id="frameId"
            value={form.frameSize}
            onChange={e =>
              setForm({
                ...form,
                frameSize: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="form-input">
          <label htmlFor="itemId">Item Width</label>

          <input
            type="number"
            name="itemId"
            id="itemId"
            value={form.itemWidth}
            onChange={e =>
              setForm({
                ...form,
                itemWidth: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="form-input">
          <label htmlFor="animationDuration">Animation Duration</label>

          <input
            type="number"
            name="animationDuration"
            value={form.animationDuration}
            onChange={e =>
              setForm({
                ...form,
                animationDuration: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="form-input form-input--check">
          <label htmlFor="infinity">Infinity</label>

          <input
            type="checkbox"
            name="infinity"
            checked={form.infinity}
            onChange={e =>
              setForm({
                ...form,
                infinity: e.target.checked,
              })
            }
          />
        </div>
      </div>

      <Carousel
        images={data.images}
        step={form.step}
        frameSize={form.frameSize}
        itemWidth={form.itemWidth}
        animationDuration={form.animationDuration}
        infinite={form.infinity}
      />
    </div>
  );
};

export default App;

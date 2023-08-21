import React, { useEffect, useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { imagesApi } from './api/images';
import { Settings } from './types/settings';

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [settings, setSettings] = useState<Settings>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  useEffect(() => {
    setImages(imagesApi);
  }, []);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, infinite: e.target.checked });
  };

  return (
    <div className="App" data-cy="title">
      <h1>
        {`Carousel with ${images.length} images`}
      </h1>

      <Carousel
        settings={settings}
        images={images}
      />

      <div className="App__settings">
        <label className="App__settings-lable">
          Step
          <input
            className="App__settings-field"
            type="number"
            name="step"
            value={settings.step}
            onChange={(e) => handleValueChange(e)}
            min={1}
            max={images.length - 1}
          />
        </label>

        <label className="App__settings-lable">
          Item width
          <input
            className="App__settings-field"
            type="number"
            name="itemWidth"
            value={settings.itemWidth}
            onChange={(e) => handleValueChange(e)}
            min={50}
            max={350}
          />
        </label>

        <label className="App__settings-lable">
          Frame size
          <input
            className="App__settings-field"
            type="number"
            name="frameSize"
            value={settings.frameSize}
            onChange={(e) => handleValueChange(e)}
            min={1}
            max={images.length}
          />
        </label>

        <label className="App__settings-lable">
          Animation Duration
          <input
            className="App__settings-field"
            type="number"
            name="animationDuration"
            value={settings.animationDuration}
            onChange={(e) => handleValueChange(e)}
            min={0}
          />
        </label>

        <label className="App__settings-lable">
          Infinite
          <input
            className="App__settings-field"
            type="checkbox"
            name="infinite"
            checked={settings.infinite}
            onChange={(e) => handleCheckChange(e)}
          />
        </label>
      </div>
    </div>
  );
};

export default App;

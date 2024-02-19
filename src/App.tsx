import React, { useState } from "react";
import "./App.scss";
import Carousel from "./components/Carousel";

const App: React.FC = () => {
  const images = [
    "./img/1.png",
    "./img/2.png",
    "./img/3.png",
    "./img/4.png",
    "./img/5.png",
    "./img/6.png",
    "./img/7.png",
    "./img/8.png",
    "./img/9.png",
    "./img/10.png",
  ];

  const initialSettingsState = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  const [settings, setSettings] = useState(initialSettingsState);
  const [infinite, setInfinite] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  };

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        Carousel with {images.length} images
      </h1>

      <div className="App__inputs">
        <label htmlFor="itemId">
          Item Width
          <input
            className="App__input"
            id="itemId"
            name="itemWidth"
            value={settings.itemWidth}
            onChange={handleInputChange}
            type="number"
            placeholder="Type item width"
            min={130}
            step={10}
            max={500}
          />
        </label>
        <label htmlFor="frameId">
          Frame Size
          <input
            className="App__input"
            id="frameId"
            name="frameSize"
            value={settings.frameSize}
            onChange={handleInputChange}
            type="number"
            placeholder="Type frame size"
            min={1}
            max={10}
          />
        </label>
        <label htmlFor="stepId">
          Scroll Step
          <input
            className="App__input"
            id="stepId"
            name="step"
            value={settings.step}
            onChange={handleInputChange}
            type="number"
            placeholder="Type step"
            min={1}
            max={9}
          />
        </label>
        <label>
          Duration
          <input
            className="App__input"
            value={settings.animationDuration}
            name="animationDuration"
            onChange={handleInputChange}
            type="number"
            placeholder="Type step"
            min={1000}
            step={500}
          />
        </label>
        <label>
          Infinite
          <input
            className="App__input App__input--checkbox"
            onChange={() => {
              setInfinite(!infinite);
            }}
            type="checkbox"
            checked={infinite}
          />
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={settings.itemWidth}
        frameSize={settings.frameSize}
        step={settings.step}
        animationDuration={settings.animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;

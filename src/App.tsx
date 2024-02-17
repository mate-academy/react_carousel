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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

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
            onChange={(event) => {
              setItemWidth(parseInt(event.target.value, 10));
            }}
            type="number"
            placeholder="Type item width"
            min={130}
          />
        </label>
        <label htmlFor="frameId">
          Frame Size
          <input
            className="App__input"
            id="frameId"
            onChange={(event) => {
              setFrameSize(parseInt(event.target.value, 10));
            }}
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
            onChange={(event) => {
              setStep(parseInt(event.target.value, 10));
            }}
            type="number"
            placeholder="Type step"
            min={3}
          />
        </label>
        <label>
          Duration
          <input
            className="App__input"
            onChange={(event) => {
              setAnimationDuration(parseInt(event.target.value, 10));
            }}
            type="number"
            placeholder="Type step"
            min={1000}
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
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;

import React, { useReducer } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import CarouselSettings from './components/CarouselSettings/CarouselSettings';
import { Action } from './utils/types';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const initialState: State = {
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
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_FRAME_SIZE':
      return { ...state, frameSize: action.payload };
    case 'SET_ITEM_WIDTH':
      return { ...state, itemWidth: action.payload };
    case 'SET_ANIMATION_DURATION':
      return { ...state, animationDuration: action.payload };
    case 'SET_INFINITE':
      return { ...state, infinite: action.payload };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { images, step, frameSize, itemWidth, animationDuration, infinite } =
    state;

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <CarouselSettings
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        dispatch={dispatch}
      />

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;

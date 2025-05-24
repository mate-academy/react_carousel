import { useReducer } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const images = [
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

interface State {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}
type Action =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_FRAME_SIZE'; payload: number }
  | { type: 'SET_ITEM_WIDTH'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_INFINITE'; payload: boolean };

const initialState: State = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_FRAME_SIZE':
      return { ...state, frameSize: action.payload };
    case 'SET_ITEM_WIDTH':
      return { ...state, itemWidth: action.payload };
    case 'SET_DURATION':
      return { ...state, animationDuration: action.payload };
    case 'SET_INFINITE':
      return { ...state, infinite: action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { step, frameSize, itemWidth, animationDuration, infinite } = state;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: Action['type'],
  ) => {
    let payload;

    if (type === 'SET_INFINITE') {
      payload = e.target.checked;
    } else {
      payload = +e.target.value;
    }

    dispatch({ type, payload } as Action);
  };

  return (
    <>
      <div className="app">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="form">
          <div className="form__line">
            <label htmlFor="stepId">Step:</label>
            <input
              id="stepId"
              type="number"
              className="form__input"
              value={step}
              min={1}
              max={10}
              onChange={e => handleChange(e, 'SET_STEP')}
            />
          </div>

          <div className="form__line">
            <label htmlFor="frameId">Frame Size:</label>
            <input
              id="frameId"
              type="number"
              className="form__input"
              value={frameSize}
              min={1}
              max={10}
              onChange={e => handleChange(e, 'SET_FRAME_SIZE')}
            />
          </div>

          <div className="form__line">
            <label htmlFor="itemId">Item Width:</label>
            <input
              id="itemId"
              type="number"
              className="form__input"
              value={itemWidth}
              min={130}
              max={260}
              step={10}
              onChange={e => handleChange(e, 'SET_ITEM_WIDTH')}
            />
          </div>

          <div className="form__line">
            <label htmlFor="durationId">Animation Duration:</label>
            <input
              id="durationId"
              type="number"
              className="form__input"
              value={animationDuration}
              min={0}
              max={2000}
              step={500}
              onChange={e => handleChange(e, 'SET_DURATION')}
            />
          </div>

          <div className="form__line form__line--end">
            <label htmlFor="infiniteId">Infinite:</label>
            <input
              id="infiniteId"
              type="checkbox"
              className="form__input"
              checked={infinite}
              onChange={e => handleChange(e, 'SET_INFINITE')}
            />
          </div>
        </form>
      </div>
    </>
  );
}

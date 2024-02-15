import "./Carousel.scss";
import { State } from "../types/State";

type Props = {
  images: string[];
  step: number;
  // frameSize: number;
  // itemWidth: number;
  // animationDuration: number;
  // infinite: boolean;
  setNewState: (newState: Partial<State>) => void;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  // frameSize,
  // itemWidth,
  // animationDuration,
  // infinite,
  setNewState,
}) => {
  // const stepWidth = itemWidth * step;
  // const visibleFrame = frameSize * itemWidth;
  // const totalWidth = images.length * itemWidth;
  // const visibleImages = images;

  return (
    <div className="Carousel">
      <div className="Carousel__properties">
        <label className="Carousel__property">
          <p className="Carousel__title">Step:</p>
          <input
            className="Carousel__input"
            name="stepId"
            type="number"
            defaultValue={step}
            min="1"
            max="10"
            onChange={(event) => {
              setNewState({ step: +event.currentTarget.value });
            }}
          />
        </label>
        <label className="Carousel__property">
          <p className="Carousel__title">Frame Size:</p>
          <input className="Carousel__input" type="number" />
        </label>
        <label className="Carousel__property">
          <p className="Carousel__title">Item Width:</p>
          <input className="Carousel__input" type="number" />
        </label>
        <label className="Carousel__property">
          <p className="Carousel__title">Animation Duration:</p>
          <input className="Carousel__input" type="number" />
        </label>
      </div>
      <div className="Carousel__images">
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li className="Carousel__item" key={image}>
              <img src={image} alt={`${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button type="button" className="Carousel__button">
          Prev
        </button>
        <button type="button" data-cy="next" className="Carousel__button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

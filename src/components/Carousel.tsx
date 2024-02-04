import './Carousel.scss';

type Props = {
  images: string[],
  width: number,
  offset: number,
  onOffsetChange: (newOffset:number) => void,
  picCount: number,
  step: number,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  images,
  width,
  offset,
  onOffsetChange,
  picCount,
  step,
  animationDuration,
}) => {
  const liStyles = {
    transform: `translate(${offset}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const initialWidth = width * picCount;
  const totalWidth = images.length * width;
  const stepLength = width * step;
  const nextOffsetTreshold = offset - initialWidth;
  const prevOffsetTreshhold = 0;
  const canMoveNext = nextOffsetTreshold - stepLength >= -totalWidth;
  const canMovePrev = offset + stepLength <= prevOffsetTreshhold;

  const handlePrevClick = () => {
    onOffsetChange(canMovePrev ? offset + stepLength : offset - offset);
  };

  const handleNextClick = () => {
    onOffsetChange(canMoveNext
      ? offset - stepLength
      : offset - (offset - initialWidth + totalWidth));
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${initialWidth}px` }}
      >
        {images.map((img, i) => (
          <li
            key={img}
            style={liStyles}
          >
            <img
              src={img}
              className="Carousel__img"
              alt={`pic #${i + 1}`}
              style={{ width: `${width}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__btns">
        <button
          className="Carousel__btn"
          type="button"
          disabled={offset === prevOffsetTreshhold}
          onClick={handlePrevClick}
          data-cy="next"
        >
          &#8592;
        </button>
        <button
          className="Carousel__btn"
          type="button"
          disabled={nextOffsetTreshold === -totalWidth}
          onClick={handleNextClick}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Carousel;

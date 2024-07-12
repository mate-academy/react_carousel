type Props = { onClickPrev: () => void; onClickNext: () => void };

const CarouselButtons = ({ onClickPrev, onClickNext }: Props) => {
  return (
    <div className="Carousel__button-container">
      <button type="button" onClick={onClickPrev}>
        Prev
      </button>
      <button data-cy="next" type="button" onClick={onClickNext}>
        Next
      </button>
    </div>
  );
};

export default CarouselButtons;

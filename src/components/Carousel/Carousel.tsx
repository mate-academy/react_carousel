import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  firstImage: number;
  animationDuration: number;
};

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  firstImage,
  animationDuration,
}) => {
  return (
    <div
      className="Carousel"
      style={{ width: frameSize * itemWidth }}

    >
      <ul className="Carousel__list">
        {images.map(image => (
          <li
            className="Carousel__item"
            key={image}
            style={{
              transform: `translateX(${-(itemWidth * firstImage)}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={image}
              className="Carousel__image"
              style={{ width: itemWidth }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

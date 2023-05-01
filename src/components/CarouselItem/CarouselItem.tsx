type Props = {
  imageSrc: string;
  index: number;
  width: number;
};

export const CarouselItem: React.FC<Props> = ({
  imageSrc,
  index,
  width,
}) => (
  <li className="Carousel__item">
    <img
      src={imageSrc}
      alt={`${index + 1}`}
      width={width}
    />
  </li>
);

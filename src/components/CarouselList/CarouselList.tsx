import { useEffect, useMemo } from 'react';
import { imagesFromServer } from '../../api/data';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initImages } from '../../features/imagesSlice';

export const CarouselList = () => {
  const { images } = useAppSelector(store => store.images);
  const {
    itemWidth, frameSize, shift, animationDuration,
  } = useAppSelector(state => state.form);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initImages(imagesFromServer));
  }, []);

  const positionStyle = useMemo(() => ({
    width: `${frameSize * itemWidth}px`,
    transform: `translate(${shift * itemWidth}px)`,
    transition: `all ${animationDuration}ms ease 0s`,
  }), [frameSize, itemWidth, shift, animationDuration]);

  return (
    <ul
      className="carousel__list"
      style={positionStyle}
    >
      {images.map((image, i: number) => (
        <li key={image}>
          <img
            src={image}
            alt={`${i + 1}`}
            width={`${itemWidth}px`}
          />
        </li>
      ))}
    </ul>
  );
};

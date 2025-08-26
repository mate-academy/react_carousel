import { useEffect, useMemo, useState } from 'react';
import './Carousel.scss';

export interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const total = images.length;
  const safeFrameSize = Math.min(Math.max(1, frameSize), total);
  const safeStep = Math.min(Math.max(1, step), total);

  const head = useMemo(
    () => (infinite ? images.slice(0, safeFrameSize) : []),
    [images, infinite, safeFrameSize]
  );
  const tail = useMemo(
    () => (infinite ? images.slice(-safeFrameSize) : []),
    [images, infinite, safeFrameSize]
  );
  const trackImages = useMemo(
    () => (infinite ? [...tail, ...images, ...head] : images),
    [head, tail, images, infinite]
  );

  const startIndex = infinite ? safeFrameSize : 0;
  const [index, setIndex] = useState<number>(startIndex);
  const [withTransition, setWithTransition] = useState<boolean>(true);

  useEffect(() => {
    setWithTransition(false);
    setIndex(startIndex);
    const id = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(id);
  }, [startIndex, total]);

  const maxIndex = Math.max(0, total - safeFrameSize);
  const canPrev = infinite || index > 0;
  const canNext = infinite || index < maxIndex;

  const goPrev = () => {
    if (!canPrev) return;
    setWithTransition(true);
    setIndex(i => (infinite ? i - safeStep : Math.max(0, i - safeStep)));
  };

  const goNext = () => {
    if (!canNext) return;
    setWithTransition(true);
    setIndex(i => (infinite ? i + safeStep : Math.min(maxIndex, i + safeStep)));
  };

  const handleTransitionEnd = () => {
    if (!infinite) return;
    const first = startIndex;
    const last = startIndex + total - 1;

    if (index < first) {
      setWithTransition(false);
      setIndex(index + total);
      requestAnimationFrame(() => setWithTransition(true));
    } else if (index > last) {
      setWithTransition(false);
      setIndex(index - total);
      requestAnimationFrame(() => setWithTransition(true));
    }
  };

  const framePx = safeFrameSize * itemWidth;
  const translatePx = -index * itemWidth;

  return (
    <div className="Carousel">
      <div className="Carousel__controls">
        <button
          type="button"
          className="button is-light"
          onClick={goPrev}
          disabled={!canPrev}
          data-cy="prev"
        >
          Prev
        </button>

        <button
          type="button"
          className="button is-light"
          onClick={goNext}
          disabled={!canNext}
          data-cy="next"
        >
          Next
        </button>
      </div>

      <div
        className="Carousel__frame"
        style={{ width: `${framePx}px`, overflow: 'hidden' }}
      >
        <ul
          className="Carousel__track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            display: 'flex',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            transform: `translateX(${translatePx}px)`,
            transition: withTransition ? `transform ${animationDuration}ms ease` : 'none',
          }}
        >
          {trackImages.map((src, i) => (
            <li key={`${src}-${i}`} style={{ width: `${itemWidth}px`, flex: '0 0 auto' }}>
              <img src={src} alt={`slide-${i + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;

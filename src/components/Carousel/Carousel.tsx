import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Carousel.scss";

interface Params {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Params> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const numClones = useMemo(() => Math.max(step, frameSize), [step, frameSize]);
  const [offSet, setOffSet] = useState(0);
  const preparedImages = useMemo(() => {
    if (!infinite || images.length === 0) {
      return [...images];
    }

    return [
      ...images.slice(images.length - numClones),
      ...images,
      ...images.slice(0, numClones),
    ];
  }, [infinite, images, numClones]);
  const {
    lastElementPosition,
    firstElementPosition,
    lastClonedElementPosition,
    maxOffSet,
    stepWidth,
  } = useMemo(() => {
    return {
      lastElementPosition: -(preparedImages.length - numClones * 2) * itemWidth,
      firstElementPosition: -(numClones * itemWidth),
      lastClonedElementPosition:
        -(preparedImages.length - numClones) * itemWidth,
      maxOffSet: -(preparedImages.length - numClones) * itemWidth,
      stepWidth: itemWidth * step,
    };
  }, [itemWidth, numClones, preparedImages.length, step]);
  const durationRef = useRef(animationDuration);

  const jumpToPosition = useCallback(
    (targetOffset: number) => {
      durationRef.current = 0;

      setOffSet(targetOffset);

      const timeoutId = setTimeout(() => {
        durationRef.current = animationDuration;
      }, 0);

      return () => clearTimeout(timeoutId);
    },
    [animationDuration],
  );

  useEffect(() => {
    const initialPosition = infinite ? firstElementPosition : 0;

    jumpToPosition(initialPosition);
  }, [animationDuration, firstElementPosition, infinite, jumpToPosition]);

  useEffect(() => {
    if (!infinite) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (offSet >= 0) {
      timeoutId = setTimeout(() => {
        jumpToPosition(lastElementPosition);
      }, animationDuration);
    } else if (offSet <= lastClonedElementPosition) {
      timeoutId = setTimeout(() => {
        jumpToPosition(firstElementPosition);
      }, animationDuration);
    }

    return () => clearTimeout(timeoutId);
  }, [
    offSet,
    infinite,
    animationDuration,
    lastClonedElementPosition,
    lastElementPosition,
    firstElementPosition,
    jumpToPosition,
  ]);

  const handlePrev = useCallback(() => {
    setOffSet((currentOffSet) => {
      const newOffSet = currentOffSet + stepWidth;

      return Math.min(newOffSet, 0);
    });
  }, [stepWidth]);

  const handleNext = useCallback(() => {
    setOffSet((currentOffSet) => {
      const newOffSet = currentOffSet - stepWidth;

      return infinite ? Math.max(newOffSet, maxOffSet) : newOffSet;
    });
  }, [infinite, maxOffSet, stepWidth]);

  return (
    <div
      className="Carousel"
      style={{
        maxWidth: `${frameSize * itemWidth}px`,
        marginInline: "auto",
        overflow: "hidden",
      }}
    >
      <div
        className="Carousel__container"
        style={{
          width: `${preparedImages.length * itemWidth}px`,
          transform: `translateX(${offSet}px)`,
          transitionDuration: `${durationRef.current}ms`,
        }}
      >
        <ul className="Carousel__list">
          {preparedImages.map((image, index) => {
            return (
              <li key={index}>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  title={`${index + 1}`}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="Carousel__control">
        <button
          className="Button Button--prev"
          onClick={handlePrev}
          type="button"
          disabled={!infinite && offSet >= 0}
        >
          Prev
        </button>
        <button
          data-cy="next"
          className="Button Button--next"
          onClick={handleNext}
          type="button"
          disabled={!infinite && offSet <= maxOffSet}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

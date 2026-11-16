import { useState } from 'react';
import './Carousel.scss';
import { List, Wrapper, ListItem, Container, Arrow } from './Carousel.styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel = (props: Props) => {
  const {
    images,
    itemWidth = 130,
    frameSize = 3,
    step = 3,
    animationDuration = 1000,
    infinite = false,
  } = props;

  const [indexStep, setIndexStep] = useState(0);

  const maxIndex = Math.max(0, images.length - frameSize);
  const current = Math.min(indexStep, maxIndex);

  const isPrevDisabled = !infinite && current === 0;
  const isNextDisabled = !infinite && current === maxIndex;

  const handleNext = () => {
    if (current === maxIndex) {
      if (infinite) {
        setIndexStep(0);
      }

      return;
    }

    setIndexStep(Math.min(current + step, maxIndex));
  };

  const handlePrev = () => {
    if (current === 0) {
      if (infinite) {
        setIndexStep(maxIndex);
      }

      return;
    }

    setIndexStep(Math.max(current - step, 0));
  };

  return (
    <Container>
      <Arrow
        type="button"
        data-cy="prev"
        disabled={isPrevDisabled}
        onClick={handlePrev}
      >
        <FaChevronRight />
      </Arrow>

      <Wrapper $width={itemWidth * frameSize}>
        <List
          style={{
            transform: `translateX(-${current * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <ListItem key={image} $itemWidth={itemWidth}>
              <img width={itemWidth} src={image} alt={`Image ${index + 1}`} />
            </ListItem>
          ))}
        </List>
      </Wrapper>

      <Arrow
        type="button"
        data-cy="next"
        disabled={isNextDisabled}
        onClick={handleNext}
      >
        <FaChevronLeft />
      </Arrow>
    </Container>
  );
};

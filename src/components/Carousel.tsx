// import React, { useState } from 'react';

// import './Carousel.scss';

// type Side = 'left' | 'right';

// interface CarouselProps {
//   images: string[];
//   step: number;
//   frameSize: number;
//   itemWidth: number;
//   animationDuration: number;
//   infinite: boolean;
// }

// const Carousel: React.FC<CarouselProps> = ({
//   images,
//   step,
//   frameSize,
//   itemWidth,
//   animationDuration,
//   infinite,
// }) => {
//   const [currPos, setCurrPos] = useState<number>(0);

//   const maxPosition = images.length - frameSize;
//   const visibleImages = infinite ? [] : images;

//   if (infinite) {
//     for (let i = 0; i < frameSize; i++) {
//       const index = (currPos + i) % images.length;

//       visibleImages.push(images[index]);
//     }
//   }

//   function swipeSlider(side: Side) {
//     if (infinite) {
//       setCurrPos(prev => {
//         if (side === 'left') {
//           return (prev - step + images.length) % images.length;
//         } else {
//           return (prev + step) % images.length;
//         }
//       });
//     } else {
//       if (side === 'left') {
//         setCurrPos(prev => Math.max(prev - step, 0));
//       } else {
//         setCurrPos(prev => Math.min(prev + step, maxPosition));
//       }
//     }
//   }

//   return (
//     <div
//       className="Carousel"
//       style={{
//         width: `${itemWidth * frameSize}px`,
//       }}
//     >
//       <ul
//         className="Carousel__list"
//         style={
//           {
//             // transform: `translateX(-${adjustedPosition * itemWidth}px)`,
//             // transition: `transform ${animationDuration}ms`,
//             // width: `${visibleImages.length * itemWidth}px`,
//           }
//         }
//       >
//         {visibleImages.map((item, i) => (
//           <li
//             key={i + 1}
//             style={{
//               width: `${itemWidth}px`,
//               transform: `translateX(-${currPos * itemWidth}px)`,
//               transition: `transform ${animationDuration}ms`,
//             }}
//           >
//             <img src={item} alt={(i + 1).toString()} />
//           </li>
//         ))}
//       </ul>

//       <div className="Carousel__buttons">
//         <button
//           type="button"
//           onClick={() => swipeSlider('left')}
//           disabled={!infinite && currPos === 0}
//         >
//           ⬅
//         </button>
//         <button
//           type="button"
//           onClick={() => swipeSlider('right')}
//           disabled={!infinite && currPos + frameSize === images.length}
//         >
//           ⮕
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Carousel;

import React, { useState } from 'react';

import './Carousel.scss';

type Side = 'left' | 'right';

interface ICarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<ICarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currPos, setCurrPos] = useState<number>(0);

  const totalItems = images.length;

  const swipeSlider = (side: Side) => {
    setCurrPos(prev => {
      if (infinite) {
        if (side === 'left') {
          return (prev - step + totalItems) % totalItems;
        } else {
          return (prev + step) % totalItems;
        }
      } else {
        if (side === 'left') {
          return Math.max(prev - step, 0);
        } else {
          return Math.min(prev + step, totalItems - frameSize);
        }
      }
    });
  };

  const renderImages = infinite
    ? [...images.slice(-frameSize), ...images, ...images.slice(0, frameSize)]
    : images;

  const adjustedPosition = infinite ? currPos + frameSize : currPos;

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        overflow: 'hidden',
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${adjustedPosition * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
          width: `${renderImages.length * itemWidth}px`,
        }}
      >
        {renderImages.map((item, i) => (
          <li
            key={i + 1}
            style={{
              width: `${itemWidth}px`,
            }}
          >
            <img src={item} alt={`${i + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={() => swipeSlider('left')}
          disabled={!infinite && currPos === 0}
        >
          ⬅
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={() => swipeSlider('right')}
          disabled={!infinite && currPos + frameSize >= totalItems}
        >
          ⮕
        </button>
      </div>
    </div>
  );
};

export default Carousel;

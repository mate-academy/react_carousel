import { Image } from '../types/Image';
import { Params } from '../types/Params';

import './Carousel.scss';

type Props = {
  images: Image[];
  params: Params;
  imgLength: number;
  changeCarousel: (key: string, value: number | boolean) => void;
};

const Carousel: React.FC<Props> = ({
  images,
  params,
  imgLength,
  changeCarousel,
}) => {
  const changeInfinite = () => {
    changeCarousel('infinite', !params.infinite);
  };

  const incStep = () => changeCarousel('step', params.step + 1);
  const decrStep = () => changeCarousel('step', params.step - 1);

  const incFrameSize = () => changeCarousel('frameSize', params.frameSize + 1);
  const decrFrameSize = () => changeCarousel('frameSize', params.frameSize - 1);

  const incImgSize = () => changeCarousel('itemWidth', params.itemWidth + 10);
  const decrImgSize = () => changeCarousel('itemWidth', params.itemWidth - 10);

  const incAanimationDuration = () => {
    changeCarousel('animationDuration', params.animationDuration + 500);
  };

  const decrAanimationDuration = () => {
    changeCarousel('animationDuration', params.animationDuration - 500);
  };

  const nextItem = () => {
    changeCarousel('firstImg', params.firstImg + params.step);
  };

  const prevItem = () => {
    changeCarousel('firstImg', params.firstImg - params.step);
  };

  const prevButtonDisabled = () => {
    return !params.infinite
      && (params.firstImg - params.step <= 0);
  };

  const nextButtonDisabled = () => {
    return !params.infinite
      && (params.firstImg + params.step > imgLength);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__slider">
        <button
          type="button"
          className="Carousel__button"
          onClick={prevItem}
          disabled={prevButtonDisabled()}
        >
          Prev
        </button>

        <div
          className="Carousel__container"
          style={{ width: `${params.frameSize * params.itemWidth}px` }}
        >
          <ul
            className="Carousel__list"
          >
            {images.map(image => (
              <li key={image.id}>
                <img
                  src={image.url}
                  alt={image.id.toString()}
                  style={{
                    width: params.itemWidth,
                    height: params.itemWidth,

                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          onClick={nextItem}
          disabled={nextButtonDisabled()}
        >
          Next
        </button>
      </div>

      <div className="Carousel__props Props">
        <div className="Props__container">
          {'Images size in pixels: '}
          <button
            type="button"
            className="Props__button"
            onClick={decrImgSize}
            disabled={params.itemWidth <= 50}
          >
            -
          </button>

          <span>{` ${params.itemWidth}x${params.itemWidth} `}</span>

          <button
            type="button"
            className="Props__button"
            onClick={incImgSize}
            disabled={params.itemWidth >= 260}
          >
            +
          </button>
        </div>

        <div className="Props__container">
          {'Number of images displayed at the same time: '}
          <button
            type="button"
            className="Props__button"
            onClick={decrFrameSize}
            disabled={params.frameSize === 1}
          >
            -
          </button>

          <span>{` ${params.frameSize} `}</span>
          <button
            type="button"
            className="Props__button"
            onClick={incFrameSize}
            disabled={params.frameSize === imgLength}
          >
            +
          </button>
        </div>

        <div className="Props__container">
          <span>Number of images scrolled per click: </span>

          <button
            type="button"
            className="Props__button"
            onClick={decrStep}
            disabled={params.step === 1}
          >
            -
          </button>

          <span>{` ${params.step} `}</span>

          <button
            type="button"
            className="Props__button"
            onClick={incStep}
            disabled={params.step >= imgLength - 1}
          >
            +
          </button>
        </div>

        <div className="Props__container">
          <span>Itime in ms to show the new portion of images: </span>

          <button
            type="button"
            className="Props__button"
            onClick={decrAanimationDuration}
            disabled={params.animationDuration <= 500}
          >
            -
          </button>

          <span>{` ${params.animationDuration} `}</span>

          <button
            type="button"
            className="Props__button"
            onClick={incAanimationDuration}
            disabled={params.animationDuration >= 4000}
          >
            +
          </button>
        </div>

        <div className="Props__container">
          <span>To do the carousel cyclic </span>
          <button
            type="button"
            className="Props__button"
            onClick={changeInfinite}
          >
            {params.infinite ? '✓' : '✘'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

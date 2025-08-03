import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({ images, infinite = false }) => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Para modo infinito, precisamos de um índice interno que pode ir além do tamanho original
  const [internalIndex, setInternalIndex] = useState(0);

  // Reset do índice interno quando as configurações mudam
  useEffect(() => {
    setInternalIndex(0);
    setCurrentIndex(0);
  }, [frameSize, step]);

  // Lógica para navegação "Next"
  const handleNext = () => {
    if (infinite) {
      setInternalIndex(prevIndex => prevIndex + step);
      setCurrentIndex(prevIndex => (prevIndex + step) % images.length);
    } else {
      setCurrentIndex(prevIndex =>
        Math.min(prevIndex + step, images.length - frameSize),
      );
    }
  };

  // Lógica para navegação "Prev"
  const handlePrev = () => {
    if (infinite) {
      setInternalIndex(prevIndex => prevIndex - step);
      setCurrentIndex(
        prevIndex => (prevIndex - step + images.length) % images.length,
      );
    } else {
      setCurrentIndex(prevIndex => Math.max(prevIndex - step, 0));
    }
  };

  // Para modo infinito, criamos uma lista triplicada para garantir transições suaves
  const getCarouselImages = () => {
    if (infinite) {
      // Triplicamos as imagens para garantir que sempre temos imagens suficientes
      return [...images, ...images, ...images];
    }

    return images;
  };

  // Calculamos o índice de início baseado no índice interno
  const getStartIndex = () => {
    if (infinite) {
      return internalIndex;
    }

    return currentIndex;
  };

  // Calculamos a transformação CSS
  const getTransform = () => {
    if (infinite) {
      // Para modo infinito, calculamos a transformação baseada no índice interno
      // mas ajustamos para manter a visualização correta
      const offset = (internalIndex % images.length) * itemWidth;

      return `translateX(-${offset}px)`;
    }

    return `translateX(-${currentIndex * itemWidth}px)`;
  };

  // Obtemos as imagens visíveis
  const carouselImages = getCarouselImages();
  const startIndex = getStartIndex();
  const visibleImages = carouselImages.slice(
    startIndex,
    startIndex + frameSize,
  );

  return (
    <div className="Carousel">
      <h1 data-cy="title">Carrossel</h1>

      {/* Inputs de controle */}
      <div className="Carousel__controls">
        <label>
          Largura de cada item (px):
          <input
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>

        <label>
          Imagens visíveis:
          <input
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label>
          Passo:
          <input
            type="number"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label>
          Duração da animação (ms):
          <input
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>

        <label>
          Modo infinito:
          <input
            type="checkbox"
            checked={infinite}
            onChange={() => {}} // Read-only para demonstração
          />
        </label>
      </div>

      {/* Carrossel */}
      <div
        className="Carousel__container"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms ease-in-out`,
            transform: getTransform(),
          }}
        >
          {visibleImages.map((image, index) => (
            <li
              key={`${startIndex}-${index}`}
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img src={image} alt={`Image ${startIndex + index}`} />
            </li>
          ))}
        </ul>
      </div>

      {/* Botões de navegação */}
      <div className="Carousel__navigation">
        <button type="button" onClick={handlePrev}>
          Prev
        </button>
        <button type="button" onClick={handleNext} data-cy="next-button">
          Next
        </button>
      </div>

      {/* Informações de debug */}
      {infinite && (
        <div className="Carousel__debug">
          <p>Índice interno: {internalIndex}</p>
          <p>Índice atual: {currentIndex}</p>
          <p>Índice de início: {startIndex}</p>
        </div>
      )}
    </div>
  );
};

export default Carousel;

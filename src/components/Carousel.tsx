import React, { useState } from 'react';
import './Carousel.scss';

export interface CarouselProps {
  images: string[]; // total de imagens
  step: number; // total de imagens que podem ser puladas
  frameSize: number; // número de imagens exibidas simultaneamente
  itemWidth: number; // personalizar o tamanho das imagens
  animationDuration: number; // duraçao da animaçao
  infinite: boolean; // torna o carrosel ciclico
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  frameSize = 3, // número de imagens exibidas simultaneamente, com o valor padrão de 3
  step = 3, //- número de imagens roladas por clique
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesCount = Math.max(1, Math.ceil(images.length / frameSize) * step); // 4 paginas
  const startIndex = (currentPage - 1) * frameSize;

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <div
          className="Carousel__container--width"
          style={{
            transform: `translateX(-${(currentPage - 1) * step * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
            width: `${frameSize * itemWidth}px`,
            overflow: 'hidden',
          }}
        >
          <ul className="Carousel__list">
            {images.map((image, i) => (
              <li key={startIndex + i}>
                <img
                  style={{ width: `${itemWidth}px` }}
                  src={image}
                  alt={`imagem ${i + 1}`}
                  className="Carousel__image"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className={`Carousel__button ${currentPage === 1 ? 'disabled' : ''}`}
        type="button"
        onClick={e => {
          e.preventDefault();
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else if (infinite && currentPage === 1) {
            setCurrentPage(pagesCount);
          }
        }}
      >
        Prev
      </button>
      <button
        data-cy="next"
        className={`Carousel__button ${currentPage === pagesCount ? 'disabled' : ''}`}
        type="button"
        onClick={e => {
          e.preventDefault();
          if (currentPage < pagesCount) {
            setCurrentPage(currentPage + 1);
          } else if (infinite && currentPage === pagesCount) {
            setCurrentPage(1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

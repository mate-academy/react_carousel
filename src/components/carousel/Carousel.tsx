import React, { useRef, useState } from 'react';
import './Carousel.scss';

// Інтерфейс для типізації пропсів
interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  theme: 'green' | 'blue'; // 👈 додаємо theme
}

// Функціональний компонент Carousel, що приймає пропси
const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  theme,
}) => {
  // Стан для відстеження поточного індексу першого видимого елемента
  const [currentIndex, setCurrentIndex] = useState(0);

  // Стан для відстеження перетягування мишею або пальцем
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0); // Початкова X-координата кліка/дотику
  const [currentX, setCurrentX] = useState(0); // Поточна X-координата руху

  // Реф для прямого доступу до елемента <ul>, щоб маніпулювати DOM без ре-рендерів
  const listRef = useRef<HTMLUListElement | null>(null);

  // Статичний розмір gap з CSS
  const gap = 1;

  // Динамічні розрахунки ширини
  const containerWidth = itemWidth * frameSize + (frameSize - 1) * gap;
  const totalListWidth = images.length * itemWidth + (images.length - 1) * gap;

  // Логіка вимкнення кнопок, якщо карусель не нескінченна
  const isPrevDisabled = !infinite && currentIndex === 0;
  const maxIndex = images.length - frameSize;
  const isNextDisabled = !infinite && currentIndex >= maxIndex;

  // Уніфікована функція для отримання X-координати дотику або кліка
  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    return 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  // Функція для встановлення transition
  const setTransitionStyle = (duration: number) => {
    if (listRef.current) {
      listRef.current!.style.transition = `transform ${duration}ms ease-in-out`;
    }
  };

  // Обробник для кліка по кнопці "Вперед"
  const handleNextClick = () => {
    const newIndex = currentIndex + step;

    if (infinite && newIndex > maxIndex) {
      setCurrentIndex(0); // Нескінченна прокрутка: перехід на початок
    } else if (newIndex <= maxIndex) {
      setCurrentIndex(newIndex); // Звичайна прокрутка
    } else {
      setCurrentIndex(maxIndex); // Прив'язка до кінця
    }
  };

  // Обробник для кліка по кнопці "Назад"
  const handlePrevClick = () => {
    const newIndex = currentIndex - step;

    if (infinite && newIndex < 0) {
      setCurrentIndex(maxIndex); // Нескінченна прокрутка: перехід в кінець
    } else if (newIndex >= 0) {
      setCurrentIndex(newIndex); // Звичайна прокрутка
    } else {
      setCurrentIndex(0); // Прив'язка до початку
    }
  };

  // Обробник початку перетягування (дотик або клік)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartX(getPosition(e));
    setTransitionStyle(0); // Вимикаємо анімацію на час перетягування
  };

  // Обробник руху під час перетягування
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !listRef.current) {
      return;
    }

    const diffX = getPosition(e) - startX;

    setCurrentX(getPosition(e));

    // Просто використовуємо перевірку if (listRef.current)
    // Цього має бути достатньо для будь-якої конфігурації
    listRef.current!.style.transform = `translateX(${diffX - currentIndex * (itemWidth + gap)}px)`;
  };

  // Обробник завершення перетягування (відпустили палець/мишу)
  const handleDragEnd = () => {
    setIsDragging(false);
    const totalMove = startX - currentX; // Загальний зсув

    // Вирішуємо, чи потрібно перегортати, якщо зсув більший за половину ширини елемента
    if (Math.abs(totalMove) > itemWidth / 2) {
      if (totalMove > 0) {
        handleNextClick(); // Гортаємо вперед
      } else {
        handlePrevClick(); // Гортаємо назад
      }
    }

    setTransitionStyle(animationDuration); // Повертаємо анімацію
  };

  // Об'єкт стилів для кожного елемента списку
  const itemStyle = {
    width: `${itemWidth}px`,
  };

  // Об'єкт стилів для всього списку, який керує прокруткою
  const listStyles = {
    transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
    width: `${totalListWidth}px`,
  };

  return (
    <div className="CarouselWrapper">
      {/* Кнопка "Prev" з динамічним вимкненням */}
      <button
        className={`btn btn-prev ${isPrevDisabled ? 'disabled' : ''} ${theme === 'green' ? 'green-theme' : ''}`}
        type="button"
        onClick={handlePrevClick}
        disabled={isPrevDisabled}
      >
        ←
      </button>

      {/*Контейнер каруселі з динамічною шириною та обробниками подій*/}
      <div className="Carousel" style={{ width: `${containerWidth}px` }}>
        <ul
          ref={listRef} // Призначаємо реф для доступу
          className="Carousel__list"
          style={listStyles}
          // Обробники подій для дотику (мобільні пристрої)
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          // Обробники подій для миші (комп'ютери)
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd} // Важливо для запобігання "залипання"
        >
          {images.map((image, index) => (
            <li className="item" key={index} style={itemStyle}>
              <img src={image} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      {/* Кнопка "Next" з динамічним вимкненням */}
      <button
        data-cy="next"
        className={`btn btn-prev ${isNextDisabled ? 'disabled' : ''} ${theme === 'green' ? 'green-theme' : ''}`}
        type="button"
        onClick={handleNextClick}
        disabled={isNextDisabled}
      >
        →
      </button>
    </div>
  );
};

export default Carousel;

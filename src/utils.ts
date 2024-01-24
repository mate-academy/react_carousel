export function moveCarouselItemToPosition(position: number) : void {
  document.querySelectorAll('.Carousel__item').forEach((item) => {
    if ((item as HTMLElement).style.transform === `translateX(${position}px)`) {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    (item as HTMLElement).style.transform = `translateX(${position}px)`;
  });
}

export const MAX_FRAME_SIZE = 5;
export const MAX_ITEM_WIDTH = 300;
export const MAX_ANIMATION_DURATION = 10000;

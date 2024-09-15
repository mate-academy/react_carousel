interface Image {
  link: string;
  isVisible: boolean;
}

type GetImg = (
  images: string[],
  startIndex: number,
  frameSize: number,
  infinite: boolean,
) => Image[];

export const getImgs: GetImg = (images, startIndex, frameSize, infinite) => {
  const visibleImages = images.map((img, index) => {
    const indexOfLastEl = startIndex + frameSize;
    let isVisible = index < indexOfLastEl;

    if (infinite) {
      isVisible = true;
    }

    return {
      link: img,
      isVisible,
    };
  });

  return visibleImages;
};

export const HandleClick = (
  f: React.Dispatch<React.SetStateAction<number>>,
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    f(+e.target.value);
  };
};

type GetImg = (
  images: string[],
  startIndex: number,
  frameSize: number,
) => string[];

export const GetImgs: GetImg = (images, startIndex, frameSize) => {
  const endIndex = startIndex + frameSize;

  return images.slice(startIndex, endIndex);
};

export const HandleClick = (
  f: React.Dispatch<React.SetStateAction<number>>,
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    f(+e.target.value);
  };
};

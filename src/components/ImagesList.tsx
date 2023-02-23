import { ImagesInfo } from './ImagesInfo';

export const ImagesList: React.FC<{
  images: string[];
  pass: { itemWidth: number };
}> = ({ images, pass }) => (
  <>
    {
      images.map((image) => (
        <ImagesInfo key={image} image={image} pass={pass} />
      ))
    }
  </>
);

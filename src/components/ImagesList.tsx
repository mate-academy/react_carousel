import { ImagesInfo } from './ImagesInfo';

export const ImagesList: React.FC <{
  images: string[];
  pass: { itemWidth: number };
}> = ({ images, pass }) => (
  <>
    {
      images.map((image) => (
        <ImagesInfo image={image} pass={pass} key={image} />
      ))
    }
  </>
);

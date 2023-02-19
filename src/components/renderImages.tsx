export const RenderImages: React.FC <{
  images: string[];
  pass: { itemWidth: number };
}> = ({ images, pass }): any => {
  return images.map((image, index) => {
    return (
      <li key={`${index + 1}`}>
        <img
          src={image}
          alt={`${index + 1}`}
          style={{
            width: `${pass.itemWidth}px`,
          }}
        />
      </li>
    );
  });
};

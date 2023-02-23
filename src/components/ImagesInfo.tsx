export const ImagesInfo: React.FC <{
  image: string;
  pass: { itemWidth: number };
}> = ({ image, pass }) => (
  <li>
    <img
      src={image}
      alt={`${image}`}
      style={{
        width: `${pass.itemWidth}px`,
      }}
    />
  </li>
);

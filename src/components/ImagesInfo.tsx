export const ImagesInfo: React.FC <{
  image: string;
  pass: { itemWidth: number };
  key: React.Key;
}> = ({ image, pass, key }) => (
  <>
    <li key={key}>
      <img
        src={image}
        alt={`${image}`}
        style={{
          width: `${pass.itemWidth}px`,
        }}
      />
    </li>
  </>
);

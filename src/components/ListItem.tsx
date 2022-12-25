type Props = {
  img: string,
  i: number,
  itemWidth: number,
};

export const ListItem:React.FC<Props> = ({ img, i, itemWidth }) => {
  return (
    <li>
      <img
        src={img}
        alt={String(i + 1)}
        width={itemWidth}
      />
    </li>
  );
};

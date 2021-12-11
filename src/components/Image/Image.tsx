import classNames from 'classnames';

type Props = {
  src: string;
  alt: string;
  width: number;
  className: string;
};

const Image: React.FC<Props> = ({
  src, alt, width, className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={classNames(className)}
      style={{ width: `${width}px` }}
    />
  );
};

export { Image };

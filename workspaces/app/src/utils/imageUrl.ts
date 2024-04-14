type Props = {
  url: string;
  size: { width: number; height: number };
};

export const getOptimizedUrl = ({ url, size }: Props) => {
  return `${url}?w=${size.width}&h=${size.height}&fm=webp&dpr=2`;
};

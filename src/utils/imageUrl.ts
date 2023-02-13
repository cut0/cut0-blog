type Props = {
  url: string;
  size: { width: number; height: number };
};

export const getOptimizedUrl = ({ url, size }: Props) => {
  return `${url}?w=${size.width * 2}&h=${size.height * 2}&fm=webp`;
};

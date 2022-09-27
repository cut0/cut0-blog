import { FC, SVGAttributes } from "react";

type CloseSvgIconProps = SVGAttributes<SVGElement> & {
  title: string;
};

export const CloseSvgIcon: FC<CloseSvgIconProps> = ({
  title,
  fill = "currentColor",
  ...svgProps
}) => {
  return (
    <svg
      height="24"
      version="1.1"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...svgProps}
    >
      <title>{title}</title>
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  );
};

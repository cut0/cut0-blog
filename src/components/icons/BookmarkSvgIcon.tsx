import { FC, SVGAttributes } from "react";

type BookmarkSvgIconProps = SVGAttributes<SVGElement> & {
  title: string;
};

export const BookmarkSvgIcon: FC<BookmarkSvgIconProps> = ({
  title,
  fill = "currentColor",
  ...svgProps
}) => {
  return (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <title>{title}</title>
      <path
        d="M34 36L24 31.64L14 36V10H34V36ZM34 6H14C12.9391 6 11.9217 6.42143 11.1716 7.17157C10.4214 7.92172 10 8.93913 10 10V42L24 36L38 42V10C38 7.78 36.2 6 34 6Z"
        fill="#939CA3"
      />
    </svg>
  );
};

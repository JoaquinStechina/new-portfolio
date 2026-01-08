import { SVGProps } from "@/src/types/SVGProps";

interface SvgIconProps extends SVGProps {
  children: React.ReactNode;
  viewBox?: string;
  strokeWidth?: number | string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  color,
  height = 50,
  width = 50,
  size,
  viewBox,
  strokeWidth,
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      height={size || height || width}
      width={size || width || height}
      viewBox={viewBox || "0 0 200 200"}
      fill={color}
      strokeWidth={strokeWidth}
    >
      {children}
    </svg>
  );
};

export default SvgIcon;

import { SVGProps } from "@/src/types/SVGProps";

interface SvgIconProps extends SVGProps {
  children: React.ReactNode;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  height = 50,
  width = 50,
  size,
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      height={size || height || width}
      width={size || width || height}
      viewBox="0 0 200 200"
    >
      {children}
    </svg>
  );
};

export default SvgIcon;

import { SVGProps } from "@/src/types/SVGProps";

const Hibernate: React.FC<SVGProps> = ({
  color = "#59666C",
  colorTwo = "#BCAE79",
  height = 50,
  width = 50,
  size,
}) => {
  return (
    <svg
      viewBox="-5.5 0 267 267"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid"
      fill="#000000"
      height={height || width || size}
      width={width || height || size}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <path
            d="M153.6714,178.9332 L152.7394,181.6902 L201.8764,265.0322 L204.6574,267.0002 L255.9994,178.2202 L204.6574,89.0832 L153.6714,178.9332 Z"
            fill={color}
          >
            {" "}
          </path>{" "}
          <path
            d="M50.2731,0.3039 L0.0001,89.0839 L52.2341,178.9329 L101.9721,89.0839 L101.8381,85.4529 L52.5651,2.1099 L50.2731,0.3039 Z"
            fill={color}
          >
            {" "}
          </path>{" "}
          <path
            d="M50.2731,0.3039 L101.9721,89.0839 L204.6571,89.0839 L152.6011,0.3039 L50.2731,0.3039 Z"
            fill={colorTwo}
          >
            {" "}
          </path>{" "}
          <path
            d="M52.2342,178.9332 L102.8642,267.0002 L204.6572,267.0002 L153.6712,178.9332 L52.2342,178.9332 Z"
            fill={colorTwo}
          >
            {" "}
          </path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default Hibernate;

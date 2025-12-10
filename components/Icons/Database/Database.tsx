import { SVGProps } from "@/src/types/SVGProps";

const Database: React.FC<SVGProps> = ({
  color = "#000000",
  height = 50,
  width = 50,
  size,
}) => {
  return (
    <svg
      fill={color}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
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
        <path d="M832 64H192c-17.7 0-32 14.3-32 32v224h704V96c0-17.7-14.3-32-32-32zM288 232c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zM160 928c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V704H160v224zm128-136c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40zM160 640h704V384H160v256zm128-168c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40z"></path>{" "}
      </g>
    </svg>
  );
};

export default Database;

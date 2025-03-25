import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-1">
      <svg
        width="24"
        height="24"
        viewBox="0 0 102 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
      >
        <path
          d="M50.5 2L1 101.5H26.5L50.5 54L74.5 101.5H100.5L50.5 2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M50.5 71L35 101.5H66L50.5 71Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default Logo;

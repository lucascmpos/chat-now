import React from "react";

const LoadingLogo = () => {
  return (
    <div className="h-full w-full flex-col flex justify-center text-center items-center">
      <h1 className="text-4xl font-bold animate-pulse">Chat Now</h1>
      <p className="font-semibold text-xl text-primary/50 animate-pulse">
        Made by Lucas Campos
      </p>
    </div>
  );
};

export default LoadingLogo;

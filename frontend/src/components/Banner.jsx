import React from "react";

const Banner = () => {
  return (
    <div className="p-4">
      <div
        className="hero min-h-[calc(80vh-64px)] bg-left bg-cover md:bg-center rounded-lg flex justify-start items-center"
        style={{
          backgroundImage: `url("/banner.jpg")`,
        }}
      >
        <div className="hero-content flex-col items-start p-6 sm:p-14">
          <div className="w-full md:w-1/2 bg-base-100/80 p-8 rounded-lg">
            <h1 className="text-2xl md font-bold">Code your future</h1>
            <p className="py-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
              voluptates tempora iste!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

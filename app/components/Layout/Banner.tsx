"use client";

import React, { useEffect, useRef, useState } from "react";
import { DataItem, data } from "@/app/data";
import Content from "./Content";
import Canvas from "./Canvas";
import gsap from "gsap";
import Loading from "../Loading";
import RenderImg from "./RenderImg";

function Banner() {
  const banner = useRef<HTMLDivElement>(null);
  const [condition, setCondition] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [activeData, setActiveData] = useState<DataItem>(data[0]);

  const handleSwatchClick = (item: DataItem) => {
    if (activeData.id !== item.id) setActiveData(item);
  };

  // const handleLoading = () => {
  //   setIsLoading(false);
  // };

  useEffect(() => {
    gsap.to(banner.current, {
      background: activeData.background,
      ease: "power3.inOut",
      duration: 0.8,
    });

    gsap.to(".logo", {
      color: activeData.headingColor,
      ease: "power3.inOut",
      duration: 0.8,
    });

    return () => {};
  }, [activeData]);

  return (
    <div ref={banner} className="w-screen h-screen relative">
      {/* {isLoading ? <Loading /> : null} */}
      <div className="logo absolute my-2 ml-6 text-left text-2xl font-bold tracking-widest md:ml-28 lg:ml-[12vw] lg:my-8">
        MISFIT
      </div>
      <div className="w-full h-full flex justify-between items-center flex-col lg:flex-row-reverse">
        {/* <Canvas
          activeData={activeData}
          swatchData={data}
          handleLoading={handleLoading}
          handleSwatchClick={handleSwatchClick}
          condition={condition}
        /> */}
         <RenderImg 
         activeData={activeData}
         swatchData={data}
         handleSwatchClick={handleSwatchClick}
         condition={condition}
         />
        <Content
          activeData={activeData}
          condition={condition}
          setCondition={setCondition}
        />
      </div>
    </div>
  );
}

export default Banner;

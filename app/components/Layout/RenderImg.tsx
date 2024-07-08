// /home/my/next-three/app/components/Layout/RenderImg.tsx

import React, { useRef } from "react";
import SwatchWrapper from "./SwatchWrapper";
import Image from "next/image";
import { DataItem } from "@/app/data";

interface RenderImgProps {
  activeData: DataItem;
  swatchData: DataItem[];
  handleSwatchClick: (item: DataItem) => void;
  condition: boolean;
}

const imageMap: { [key: number]: string } = {
  1: "/blue.png",
  2: "/pngegg.png",
  3: "/yllw.webp",
};

function RenderImg({
  activeData,
  swatchData,
  handleSwatchClick,
  condition,
}: RenderImgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
    id="container"
    ref={containerRef}
    className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full flex items-center justify-center"
  >
    <div className="relative w-full h-full max-w-full max-h-full top-72 left-60">
      <Image
        src={imageMap[activeData.id]}
        alt={activeData.heading}
        // layout="fill"
        objectFit="contain"
        width={550}
        height={0}
        // className="w-full h-full"
      />
    </div>
    <SwatchWrapper
      activeData={activeData}
      swatchData={swatchData}
      handleSwatchClick={handleSwatchClick}
      condition={condition}
    />
    <div className="highlight w-2/5 h-1/2 bg-[#D7B172] absolute inset-x-40 top-0 -z-10 rounded-br-full rounded-bl-full md:inset-x-60 lg:inset-x-40"></div>
  </div>
  );
}

export default RenderImg;

import React from "react";
import SingleSwatchCircle from "../SingleSwatchCircle";
import { DataItem } from "@/app/data";

interface SwatchWrapperProps {
  activeData: DataItem;
  swatchData: DataItem[];
  handleSwatchClick: (item: DataItem) => void;
}

function SwatchWrapper({
  activeData,
  swatchData,
  handleSwatchClick,
}: SwatchWrapperProps) {
 
  const handleSwatchClicked = (item: DataItem) => {
    handleSwatchClick(item);
  };

  return (
    <div className="h-fit absolute z-20 w-full bottom-0 flex justify-center gap-8 mb-2  lg:w-fit lg:inset-y-[40%] lg:right-20 lg:flex-col">
      {swatchData.map((o) => (
        <SingleSwatchCircle 
           key={o.id} 
           item={o} 
           handleClick={handleSwatchClicked}
           activeID = {activeData.id}
        />
      ))}
    </div>
  );
}

export default SwatchWrapper;

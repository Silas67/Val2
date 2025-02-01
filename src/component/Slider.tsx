import React, { ReactNode } from "react";
import { useState, useEffect } from "react";

interface Props {
  children: ReactNode[];
  autoSlide: boolean;
  autoSlideInterval: number;
}

const Slider: React.FC<Props> = ({
  children: Nicknames,
  autoSlide,
  autoSlideInterval,
}) => {
  const [curr, setCurr] = useState(0);

  const next = () =>
    setCurr((curr) => (curr === Nicknames.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className=" relative ">
      <div
        className="flex flex-col transition-transform ease-in-out duration-1000 text-3xl mb-1"
        style={{ transform: `translateY(-${curr * 100}%)` }}
      >
        {Nicknames}
      </div>
    </div>
  );
};

export default Slider;

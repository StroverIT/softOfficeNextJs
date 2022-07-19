import { useState, useEffect, useRef } from "react";

const RangeSlider = ({
  initialMin,
  initialMax,
  min,
  max,
  step,
  priceGap,
  setFilters,
}) => {
  const progressRef = useRef(null);

  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);
  const handleMin = (e) => {
    if (maxValue - minValue >= priceGap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceGap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = minValue / max + "%";
    progressRef.current.style.right = step - maxValue / max + "%";
    console.log("promqna");
    setFilters((prevState) => ({
      ...prevState,
      prices: { min: minValue, max: maxValue },
    }));
  }, [minValue, maxValue]);
  useEffect(() => {
    setMinValue(initialMin);
    setMaxValue(initialMax);
  }, [initialMin, initialMax]);
  return (
    <div className="flex flex-col rounded-lg ">
      <div className="flex items-center justify-between mb-7 ">
        <div className="flex text-gray-darker">
          <div>{parseFloat(minValue).toFixed(2)}</div>
          <div className="pl-1">лв</div>
        </div>
        <div className="flex text-gray-darker">
          <div>{parseFloat(maxValue).toFixed(2)}</div>
          <div className="pl-1">лв</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative h-1 rounded-md slider bg-gray">
          <div
            className="absolute h-1 rounded progress bg-green "
            ref={progressRef}
          ></div>
        </div>

        <div className="relative range-input ">
          <input
            onChange={handleMin}
            type="range"
            min={min}
            step={step}
            max={max}
            value={minValue}
            className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none range-min -top-1"
          />

          <input
            onChange={handleMax}
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxValue}
            className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none range-max -top-1"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;

import { useEffect, useState } from "react";
import type { SliderProps } from "./Slider.types";

export default function Slider(props: SliderProps) {
  const [sliderValue, setSliderValue] = useState(() => {
    return Math.round(props.max / props.value);
  });

  useEffect(() => {
    setSliderValue(Math.round(props.max / props.value));
  }, [props.value, props.max]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Number(e.target.value);
    const newDelay = props.max / speed;
    setSliderValue(speed);
    props.onChange(newDelay);
  };

  return (
    <div>
      <h3>
        {props.label}: {sliderValue}×
      </h3>
      <input
        type="range"
        min={1}
        max={props.max}
        value={sliderValue}
        onChange={handleChange}
      />
    </div>
  );
}

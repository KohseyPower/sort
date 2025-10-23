import { useEffect, useState } from "react";
import type { CountSliderProps } from "./CountSlider.types";
import * as Styled from "../Slider.styled";

export default function CountSlider(props: CountSliderProps) {
  const [sliderValue, setSliderValue] = useState(props.value);

  useEffect(() => {
    setSliderValue(props.value);
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);
    setSliderValue(count);
    props.onChange(count);
  };

  const percent = ((sliderValue - props.min) / (props.max - props.min)) * 100;

  return (
    <Styled.SliderContainer>
      <h3>
        {props.label}: {sliderValue}
      </h3>
      <Styled.RangeInput
        type="range"
        disabled={props.disabled}
        min={props.min}
        max={props.max}
        value={sliderValue}
        onChange={handleChange}
        $percent={percent}
      />
    </Styled.SliderContainer>
  );
}

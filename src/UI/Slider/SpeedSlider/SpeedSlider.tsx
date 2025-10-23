import { useEffect, useState } from "react";
import type { SpeedSliderProps } from "./SpeedSlider.types";
import * as Styled from "../Slider.styled";

const minimum = 1;

export default function SpeedSlider(props: SpeedSliderProps) {
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

  const percent = ((sliderValue - minimum) / (props.max - minimum)) * 100;

  return (
    <Styled.SliderContainer>
      <h3>
        {props.label}: {sliderValue}x
      </h3>
      <Styled.RangeInput
        type="range"
        min={minimum}
        max={props.max}
        value={sliderValue}
        onChange={handleChange}
        $percent={percent}
      />
    </Styled.SliderContainer>
  );
}

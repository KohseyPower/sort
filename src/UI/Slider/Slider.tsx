import CountSlider from "./CountSlider/CountSlider";
import type { SliderProps } from "./Slider.types";
import SpeedSlider from "./SpeedSlider/SpeedSlider";

export default function Slider(props: SliderProps) {
  switch (props.type) {
    case "speedSlider":
      return <SpeedSlider {...props} />;
    case "countSlider":
      return <CountSlider {...props} />;
  }
}

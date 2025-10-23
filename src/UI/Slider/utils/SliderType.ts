type CommonSlider = {
  /*
   * Slider type
   */
  type: string;
  /*
   * Optional slider name
   */
  label?: string;
  /*
   *
   */
  value: number;
  /*
   * Disable slider
   */
  disabled?: boolean;
};

export type SpeedSlider = CommonSlider & {
  type: "speedSlider";
  /*
   * Maximal value in ms
   */
  max: number;
  /*
   * Callback called when the value change
   */
  onChange: (value: number) => void;
};

export type CountSlider = CommonSlider & {
  type: "countSlider";
  /**
   * Minimal value
   */
  min: number;
  /*
   * Maximal value
   */
  max: number;
  /*
   * Callback called when the value change
   */
  onChange: (value: number) => void;
};

export type SliderType = SpeedSlider | CountSlider;

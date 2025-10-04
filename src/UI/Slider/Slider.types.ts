export type SliderProps = {
  /*
   * Current value
   */
  value: number;
  /*
   * Maximal value in ms
   */
  max: number;
  /*
   * Callback called when the value change
   */
  onChange: (value: number) => void;
  /*
   * Optional slider name
   */
  label?: string;
};

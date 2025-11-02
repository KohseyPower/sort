import styled from "styled-components";

export const SliderContainer = styled.div`
  margin-inline-start: 15px;
  margin-inline-end: 15px;
  margin-top: 20px;
  min-width: 250px;
  margin-bottom: 20px;
`;

export const RangeInput = styled.input.attrs({ type: "range" })<{
  $percent: number;
}>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 10px;
  /* +1% hardcoded to compensate for the thumb width so the gradient visually reaches the center of the handle */
  background: linear-gradient(
    90deg,
    var(--main-color) 0%,
    var(--main-color-dark) calc(${(props) => props.$percent}%),
    white calc(${(props) => props.$percent}% + 1%),
    white 100%
  );
  border-radius: 5px;
  cursor: pointer;

  /* Thumb */
  /* Chrome */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--lighter-background);
    border: 1px solid var(--main-color-dark);
  }

  &::-webkit-slider-thumb:hover {
    background: var(--main-color);
    border-color: white;
  }

  &::-webkit-slider-thumb:active {
    transform: scale(1.3);
    background: var(--main-color);
  }

  /* Firefox */
  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--lighter-background);
    border: 1px solid var(--main-color-dark);
  }

  &::-moz-range-thumb:hover {
    background: var(--main-color);
    border-color: white;
  }

  &::-moz-range-thumb:active {
    transform: scale(1.3);
    background: var(--main-color);
  }
`;

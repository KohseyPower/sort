import styled from "styled-components";

export const Canvas = styled.div<{ $size: number; $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 1px solid #333;
`;

export const Bar = styled.div<{ $value: number; $max: number }>`
  align-self: end;
  height: ${({ $value, $max }) => Math.max(0.02, $value / $max) * 100}%;
  background: #4f46e5;
`;
